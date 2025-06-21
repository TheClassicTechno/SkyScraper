from flask import Flask, render_template, request, jsonify
from flask_socketio import SocketIO, emit
import threading
import queue
import time
import json
import logging
from datetime import datetime
import os
import re

# Simple translation using the translate library
try:
    from translate import Translator
    USE_TRANSLATE_LIB = True
except ImportError:
    USE_TRANSLATE_LIB = False
    print("Translate library not available - manual translation only")

# Speech recognition (optional)
try:
    import speech_recognition as sr
    USE_SPEECH = True
    recognizer = sr.Recognizer()
    microphone = sr.Microphone()
except ImportError:
    USE_SPEECH = False
    print("Speech recognition not available - text-only mode")

# Initialize Flask app
app = Flask(__name__)
app.config['SECRET_KEY'] = 'flight-communication-secret-key'
socketio = SocketIO(app, cors_allowed_origins="*")

# Supported languages with their codes
LANGUAGES = {
    'en': 'English',
    'es': 'Spanish', 
    'fr': 'French',
    'de': 'German',
    'it': 'Italian',
    'pt': 'Portuguese',
    'ru': 'Russian',
    'ja': 'Japanese',
    'ko': 'Korean',
    'zh': 'Chinese',
    'ar': 'Arabic',
    'hi': 'Hindi',
    'th': 'Thai',
    'vi': 'Vietnamese',
    'nl': 'Dutch',
    'pl': 'Polish',
    'tr': 'Turkish'
}

# Simple language detection using basic patterns
LANGUAGE_PATTERNS = {
    'es': [r'[ñáéíóúü]', r'\b(el|la|los|las|un|una|de|en|con|por|para|que|es|son|está|están)\b'],
    'fr': [r'[àâäéèêëïîôöùûüÿç]', r'\b(le|la|les|un|une|de|du|des|en|dans|avec|pour|que|est|sont)\b'],
    'de': [r'[äöüß]', r'\b(der|die|das|ein|eine|und|mit|für|ist|sind|haben|wird)\b'],
    'it': [r'[àèéìíîòóù]', r'\b(il|la|lo|gli|le|un|una|di|in|con|per|che|è|sono)\b'],
    'pt': [r'[ãâáàçéêíóôõú]', r'\b(o|a|os|as|um|uma|de|em|com|para|que|é|são)\b'],
    'nl': [r'\b(de|het|een|van|in|met|voor|dat|is|zijn|hebben|wordt)\b'],
    'pl': [r'[ąćęłńóśźż]', r'\b(i|w|na|do|z|o|że|jest|są|ma|będzie)\b']
}

class SimpleTranslator:
    """Simple translation class with fallback options"""
    
    def __init__(self):
        self.translators = {}
        if USE_TRANSLATE_LIB:
            # Initialize translators for common language pairs
            try:
                self.translators['en'] = Translator(to_lang='en')
                self.translators['es'] = Translator(to_lang='es')
                self.translators['fr'] = Translator(to_lang='fr')
                self.translators['de'] = Translator(to_lang='de')
            except Exception as e:
                print(f"Error initializing translators: {e}")
    
    def detect_language(self, text):
        """Simple language detection based on patterns"""
        text_lower = text.lower()
        
        # Score each language
        scores = {'en': 0}  # Default to English
        
        for lang, patterns in LANGUAGE_PATTERNS.items():
            score = 0
            for pattern in patterns:
                matches = len(re.findall(pattern, text_lower, re.IGNORECASE))
                score += matches
            if score > 0:
                scores[lang] = score
        
        # Return language with highest score
        detected = max(scores, key=scores.get)
        return detected if scores[detected] > 0 else 'en'
    
    def translate_text(self, text, target_lang='en', source_lang='auto'):
        """Translate text with multiple fallback methods"""
        try:
            # Auto-detect source language if needed
            if source_lang == 'auto':
                source_lang = self.detect_language(text)
            
            # Skip translation if same language
            if source_lang == target_lang:
                return text
            
            # Try translate library first
            if USE_TRANSLATE_LIB and target_lang in self.translators:
                try:
                    result = self.translators[target_lang].translate(text)
                    return result
                except Exception as e:
                    print(f"Translate library error: {e}")
            
            # Fallback: Use a simple online translation API
            return self._fallback_translate(text, source_lang, target_lang)
            
        except Exception as e:
            print(f"Translation error: {e}")
            return f"[Translation Error: {text}]"
    
    def _fallback_translate(self, text, source_lang, target_lang):
        """Fallback translation using requests to free API"""
        try:
            import requests
            import urllib.parse
            
            # Use a free translation API (MyMemory)
            url = "https://api.mymemory.translated.net/get"
            params = {
                'q': text,
                'langpair': f"{source_lang}|{target_lang}"
            }
            
            response = requests.get(url, params=params, timeout=5)
            if response.status_code == 200:
                data = response.json()
                if data.get('responseStatus') == 200:
                    return data['responseData']['translatedText']
            
            return f"[Could not translate: {text}]"
            
        except Exception as e:
            print(f"Fallback translation error: {e}")
            return f"[Translation unavailable: {text}]"

# Initialize translator
translator = SimpleTranslator()

class AudioProcessor:
    """Audio processing class"""
    
    def __init__(self):
        self.is_recording = False
        self.target_language = 'en'
        
    def start_listening(self, target_lang='en'):
        """Start audio listening if available"""
        if not USE_SPEECH:
            socketio.emit('error', {'message': 'Speech recognition not available'})
            return
            
        self.target_language = target_lang
        self.is_recording = True
        
        try:
            # Adjust for ambient noise
            with microphone as source:
                recognizer.adjust_for_ambient_noise(source, duration=1)
                
            # Start listening thread
            threading.Thread(target=self._listen_continuously, daemon=True).start()
        except Exception as e:
            socketio.emit('error', {'message': f'Microphone error: {str(e)}'})
            
    def stop_listening(self):
        """Stop audio listening"""
        self.is_recording = False
        
    def _listen_continuously(self):
        """Continuous listening loop"""
        while self.is_recording:
            try:
                with microphone as source:
                    # Listen for audio with timeout
                    audio = recognizer.listen(source, timeout=1, phrase_time_limit=5)
                    
                # Process audio in separate thread
                threading.Thread(
                    target=self._process_audio, 
                    args=(audio,), 
                    daemon=True
                ).start()
                    
            except sr.WaitTimeoutError:
                # No audio detected, continue
                continue
            except Exception as e:
                print(f"Listening error: {e}")
                time.sleep(0.1)
                
    def _process_audio(self, audio):
        """Process audio and emit results"""
        try:
            # Speech to text using Google's free API
            text = recognizer.recognize_google(audio)
            
            if text:
                # Detect source language
                source_lang = translator.detect_language(text)
                
                # Translate if needed
                translated = translator.translate_text(
                    text, 
                    target_lang=self.target_language, 
                    source_lang=source_lang
                )
                
                # Emit results
                result = {
                    'original_text': text,
                    'translated_text': translated,
                    'source_language': source_lang,
                    'target_language': self.target_language,
                    'timestamp': datetime.now().isoformat(),
                    'confidence': 0.85
                }
                
                socketio.emit('speech_result', result)
                
        except sr.UnknownValueError:
            # No speech detected
            pass
        except sr.RequestError as e:
            socketio.emit('error', {'message': f'Speech recognition error: {str(e)}'})
        except Exception as e:
            print(f"Audio processing error: {e}")
            socketio.emit('error', {'message': str(e)})

# Initialize audio processor
audio_processor = AudioProcessor()

@app.route('/')
def index():
    """Main page"""
    return render_template('index.html', languages=LANGUAGES)

@app.route('/api/languages')
def get_languages():
    """Get supported languages"""
    return jsonify(LANGUAGES)

@app.route('/api/status')
def get_status():
    """Get system status"""
    return jsonify({
        'speech_available': USE_SPEECH,
        'translation_available': USE_TRANSLATE_LIB,
        'languages': list(LANGUAGES.keys())
    })

@socketio.on('connect')
def handle_connect():
    """Handle client connection"""
    print('Client connected')
    emit('status', {
        'message': 'Connected to flight communication system',
        'speech_available': USE_SPEECH,
        'translation_available': True
    })

@socketio.on('disconnect')
def handle_disconnect():
    """Handle client disconnection"""
    print('Client disconnected')
    audio_processor.stop_listening()

@socketio.on('start_listening')
def handle_start_listening(data):
    """Start audio listening"""
    target_lang = data.get('language', 'en')
    print(f'Starting to listen for language: {target_lang}')
    
    audio_processor.start_listening(target_lang)
    emit('status', {
        'message': f'Listening started for {LANGUAGES.get(target_lang, target_lang)}',
        'listening': True
    })

@socketio.on('stop_listening')
def handle_stop_listening():
    """Stop audio listening"""
    print('Stopping listening')
    audio_processor.stop_listening()
    emit('status', {
        'message': 'Listening stopped',
        'listening': False
    })

@socketio.on('translate_text')
def handle_translate(data):
    """Manual translation endpoint"""
    try:
        text = data.get('text', '').strip()
        if not text:
            emit('error', {'message': 'No text provided'})
            return
            
        target_lang = data.get('target_language', 'en')
        source_lang = data.get('source_language', 'auto')
        
        print(f"Translating: '{text}' from {source_lang} to {target_lang}")
        
        # Detect source language if auto
        if source_lang == 'auto':
            source_lang = translator.detect_language(text)
        
        # Translate text
        translated = translator.translate_text(
            text, 
            target_lang=target_lang, 
            source_lang=source_lang
        )
        
        result = {
            'original_text': text,
            'translated_text': translated,
            'source_language': source_lang,
            'target_language': target_lang,
            'timestamp': datetime.now().isoformat()
        }
        
        emit('translation_result', result)
        print(f"Translation result: {result}")
        
    except Exception as e:
        error_msg = f'Translation error: {str(e)}'
        print(error_msg)
        emit('error', {'message': error_msg})

if __name__ == '__main__':
    # Set up logging
    logging.basicConfig(level=logging.INFO)
    
    # Print system status
    print("\n" + "="*50)
    print("Flight Communication App Starting...")
    print("="*50)
    print(f"Speech Recognition Available: {USE_SPEECH}")
    print(f"Translation Library Available: {USE_TRANSLATE_LIB}")
    print(f"Supported Languages: {len(LANGUAGES)}")
    print("="*50)
    
    # Run the app
    try:
        socketio.run(app, debug=True, host='0.0.0.0', port=5000)
    except KeyboardInterrupt:
        print("\nShutting down...")
    except Exception as e:
        print(f"Error starting server: {e}")
        print("Try running with: python app.py")