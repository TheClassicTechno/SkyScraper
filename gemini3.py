from flask import Flask, render_template, request, jsonify
from flask_socketio import SocketIO, emit
import threading
import time
import json
import logging
from datetime import datetime
import os
import sys
import requests
from urllib.parse import quote

print("Running with Python:", sys.executable)

# Alternative translation using free Google Translate API
class SimpleGoogleTranslator:
    """Simple Google Translate implementation using free web API"""
    
    def __init__(self):
        self.base_url = "https://translate.googleapis.com/translate_a/single"
        self.session = requests.Session()
        self.session.headers.update({
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
        })
    
    def detect(self, text):
        """Detect language of text"""
        try:
            if not text or not text.strip():
                return type('obj', (object,), {'lang': 'en', 'confidence': 0.0})
            
            params = {
                'client': 'gtx',
                'sl': 'auto',
                'tl': 'en',
                'dt': 't',
                'q': text[:500]  # Limit text length
            }
            
            response = self.session.get(self.base_url, params=params, timeout=10)
            if response.status_code == 200:
                result = response.json()
                detected_lang = result[2] if len(result) > 2 else 'en'
                return type('obj', (object,), {'lang': detected_lang, 'confidence': 0.85})
            else:
                return type('obj', (object,), {'lang': 'en', 'confidence': 0.5})
                
        except Exception as e:
            print(f"Language detection error: {e}")
            return type('obj', (object,), {'lang': 'en', 'confidence': 0.1})
    
    def translate(self, text, src='auto', dest='en'):
        """Translate text"""
        try:
            if not text or not text.strip():
                return type('obj', (object,), {'text': '', 'src': 'en'})
            
            # Skip if same language
            if src == dest:
                return type('obj', (object,), {'text': text, 'src': src})
            
            params = {
                'client': 'gtx',
                'sl': src,
                'tl': dest,
                'dt': 't',
                'q': text
            }
            
            response = self.session.get(self.base_url, params=params, timeout=15)
            if response.status_code == 200:
                result = response.json()
                if result and len(result) > 0 and result[0]:
                    translated_text = ''.join([item[0] for item in result[0] if item[0]])
                    detected_src = result[2] if len(result) > 2 else src
                    return type('obj', (object,), {'text': translated_text, 'src': detected_src})
            
            return type('obj', (object,), {'text': '', 'src': src})
                
        except Exception as e:
            print(f"Translation error: {e}")
            return type('obj', (object,), {'text': '', 'src': src})

# Initialize translation service
try:
    google_translator = SimpleGoogleTranslator()
    USE_GOOGLE_TRANS = True
    print("✅ Simple Google Translator initialized")
except Exception as e:
    USE_GOOGLE_TRANS = False
    print(f"❌ Translation service failed: {e}")

# Language detection function
def detect(text):
    """Detect language wrapper"""
    return google_translator.detect(text)

# Google Gemini AI for advanced translation and speech processing
try:
    import google.generativeai as genai
    USE_GEMINI = True
    print("✅ Gemini AI available for enhanced translation")
except ImportError:
    USE_GEMINI = False
    print("⚠️ Gemini AI not available - install with: pip install google-generativeai")

# Speech recognition - Google Speech-to-Text
try:
    import speech_recognition as sr
    USE_SPEECH = True
    recognizer = sr.Recognizer()
    microphone = sr.Microphone()
    print("✅ Google Speech recognition available")
except ImportError:
    USE_SPEECH = False
    print("⚠️ Speech recognition not available - install with: pip install SpeechRecognition")

# Initialize Flask app
app = Flask(__name__)
from flask_cors import CORS
CORS(app)
app.config['SECRET_KEY'] = 'flight-communication-streamlined-secret'
socketio = SocketIO(app, cors_allowed_origins="*")

# Comprehensive language support for aviation communication
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
    'zh': 'Chinese (Simplified)',
    'ar': 'Arabic',
    'hi': 'Hindi',
    'th': 'Thai',
    'vi': 'Vietnamese',
    'nl': 'Dutch',
    'pl': 'Polish',
    'tr': 'Turkish',
    'sv': 'Swedish',
    'no': 'Norwegian',
    'da': 'Danish',
    'fi': 'Finnish',
    'he': 'Hebrew',
    'id': 'Indonesian',
    'uk': 'Ukrainian',
    'cs': 'Czech',
    'hu': 'Hungarian',
    'ro': 'Romanian'
}

# Aviation-specific terminology for context-aware translation
AVIATION_CONTEXTS = {
    'atc': 'Air Traffic Control communication',
    'pilot': 'Pilot-to-pilot communication', 
    'ground': 'Ground operations',
    'emergency': 'Emergency procedures',
    'weather': 'Weather reporting',
    'navigation': 'Navigation instructions',
    'general': 'General aviation communication'
}

class StreamlinedTranslator:
    """Streamlined translator using Simple Google Translate and optional Gemini AI"""
    
    def __init__(self):
        self.google_translator = google_translator
        self.gemini_model = None
        self.is_gemini_ready = False
        
        # Initialize services
        if USE_GEMINI:
            self._init_gemini()
        print("✅ Streamlined Translator initialized")
    
    def _init_gemini(self):
        """Initialize Gemini AI with aviation-specific configuration"""
        try:
            api_key = os.getenv('GEMINI_API_KEY')
            if not api_key:
                print("⚠️  Warning: GEMINI_API_KEY not set in environment variables")
                print("   Set it with: export GEMINI_API_KEY='your-api-key'")
                return
            
            genai.configure(api_key=api_key)
            # Use the latest model for best accuracy
            self.gemini_model = genai.GenerativeModel('gemini-2.0-flash-exp')
            
            # Test the connection
            test_response = self.gemini_model.generate_content("Test connection")
            if test_response:
                self.is_gemini_ready = True
                print("✅ Gemini AI initialized and tested successfully")
            
        except Exception as e:
            print(f"❌ Gemini initialization failed: {e}")
            self.is_gemini_ready = False
    
    def detect_language(self, text: str) -> dict:
        """Detect language using Simple Google Translate"""
        try:
            if not text or not text.strip():
                return {'language': 'en', 'confidence': 0.0}
            
            # Use Simple Google Translate's detection
            detected = self.google_translator.detect(text)
            lang_code = detected.lang
            confidence = detected.confidence
            
            print(f"🔍 Language detected: {lang_code} (confidence: {confidence:.2f})")
            
            return {
                'language': lang_code,
                'confidence': confidence
            }
            
        except Exception as e:
            print(f"❌ Language detection failed: {e}")
            return {'language': 'en', 'confidence': 0.1}
    
    def translate_text(self, text: str, target_lang: str = 'en', 
                      source_lang: str = 'auto', context: str = 'general') -> dict:
        """Translate text using Simple Google Translate with optional Gemini enhancement"""
        
        if not text or not text.strip():
            return self._create_result('', text, 'unknown', target_lang, 0.0, 'empty_input')
        
        # Auto-detect source language
        if source_lang == 'auto':
            detection_result = self.detect_language(text)
            source_lang = detection_result['language']
        
        # Skip translation if same language
        if source_lang == target_lang:
            return self._create_result(text, text, source_lang, target_lang, 1.0, 'no_translation_needed')
        
        print(f"🔄 Translating: '{text}' [{source_lang} → {target_lang}] (context: {context})")
        
        # Strategy: Use Simple Google Translate first, then Gemini for aviation context enhancement
        google_result = self._translate_with_google(text, source_lang, target_lang)
        
        # Use Gemini for aviation contexts or if Google fails
        if (context in AVIATION_CONTEXTS and context != 'general' and self.is_gemini_ready) or google_result['confidence'] < 0.7:
            gemini_result = self._translate_with_gemini(text, source_lang, target_lang, context)
            
            # Use Gemini if it's better or for aviation contexts
            if gemini_result['confidence'] > google_result['confidence'] or context in AVIATION_CONTEXTS:
                return gemini_result
        
        return google_result
    
    def _translate_with_google(self, text: str, source_lang: str, target_lang: str) -> dict:
        """Translate using Simple Google Translate"""
        try:
            # Simple Google Translate
            translated = self.google_translator.translate(
                text, 
                src=source_lang if source_lang != 'auto' else 'auto',
                dest=target_lang
            )
            
            if translated and translated.text and translated.text.strip() != text.strip():
                print(f"✅ Google Translate: {translated.text}")
                return self._create_result(
                    translated.text, text, 
                    translated.src, target_lang, 
                    0.85, 'google_translate'
                )
            else:
                print("❌ Google Translate: No valid translation")
                return self._create_result('', text, source_lang, target_lang, 0.0, 'google_translate_failed')
                
        except Exception as e:
            print(f"❌ Google Translate error: {e}")
            return self._create_result('', text, source_lang, target_lang, 0.0, 'google_translate_error')
    
    def _translate_with_gemini(self, text: str, source_lang: str, target_lang: str, context: str) -> dict:
        """Translate using Gemini AI with aviation context awareness"""
        if not self.is_gemini_ready:
            return self._create_result('', text, source_lang, target_lang, 0.0, 'gemini_unavailable')
        
        try:
            source_name = LANGUAGES.get(source_lang, source_lang)
            target_name = LANGUAGES.get(target_lang, target_lang)
            context_desc = AVIATION_CONTEXTS.get(context, 'general communication')
            
            # Enhanced prompt for aviation accuracy
            prompt = f"""You are a professional aviation translator. Translate this {source_name} text to {target_name}.

Context: {context_desc}

Important guidelines:
- Maintain aviation terminology accuracy
- Preserve critical safety information
- Use standard aviation phraseology when applicable
- Keep technical terms precise
- Return only the translation, no explanations

Text to translate: "{text}"

Translation:"""
            
            response = self.gemini_model.generate_content(prompt)
            translated_text = response.text.strip()
            
            # Clean up response
            if translated_text.startswith('"') and translated_text.endswith('"'):
                translated_text = translated_text[1:-1]
            
            if translated_text and translated_text != text:
                print(f"✅ Gemini AI: {translated_text}")
                confidence = 0.95 if context in AVIATION_CONTEXTS else 0.90
                return self._create_result(translated_text, text, source_lang, target_lang, confidence, 'gemini_ai')
            else:
                return self._create_result('', text, source_lang, target_lang, 0.0, 'gemini_no_result')
                
        except Exception as e:
            if "429" in str(e) or "quota" in str(e).lower():
                print("⚠️ Gemini API quota exceeded")
            else:
                print(f"❌ Gemini translation error: {e}")
            return self._create_result('', text, source_lang, target_lang, 0.0, 'gemini_error')
    
    def _create_result(self, translated: str, original: str, source_lang: str, 
                      target_lang: str, confidence: float, method: str) -> dict:
        """Create standardized translation result"""
        return {
            'translated_text': translated,
            'original_text': original,
            'source_language': source_lang,
            'target_language': target_lang,
            'confidence': confidence,
            'method': method,
            'timestamp': datetime.now().isoformat()
        }

class EnhancedAudioProcessor:
    """Enhanced audio processor using Google Speech-to-Text"""
    
    def __init__(self, translator):
        self.translator = translator
        self.is_recording = False
        self.target_language = 'en'
        self.context = 'general'
        self.sensitivity = 0.5
        
        # Configure recognizer for aviation audio
        if USE_SPEECH:
            recognizer.energy_threshold = 1500  # Higher threshold for cockpit noise
            recognizer.dynamic_energy_threshold = True
            recognizer.pause_threshold = 0.8
            recognizer.phrase_threshold = 0.3
            recognizer.non_speaking_duration = 0.5
    
    def start_listening(self, target_lang='en', context='general', sensitivity=0.5):
        """Start Google Speech-to-Text listening"""
        if not USE_SPEECH:
            socketio.emit('error', {'message': 'Speech recognition not available'})
            return
            
        self.target_language = target_lang
        self.context = context
        self.sensitivity = sensitivity
        self.is_recording = True
        
        try:
            # Enhanced microphone calibration
            with microphone as source:
                print("🎙️ Calibrating microphone...")
                recognizer.adjust_for_ambient_noise(source, duration=2)
                
                # Adjust sensitivity
                base_threshold = recognizer.energy_threshold
                if sensitivity > 0.7:
                    recognizer.energy_threshold = base_threshold * 0.7
                elif sensitivity < 0.3:
                    recognizer.energy_threshold = base_threshold * 1.5
                
                print(f"🔧 Audio threshold set to: {recognizer.energy_threshold}")
                
            # Start listening thread
            threading.Thread(target=self._listen_loop, daemon=True).start()
            print(f"✅ Google Speech listening started for {LANGUAGES.get(target_lang, target_lang)}")
            
        except Exception as e:
            error_msg = f'Microphone setup error: {str(e)}'
            print(f"❌ {error_msg}")
            socketio.emit('error', {'message': error_msg})
    
    def stop_listening(self):
        """Stop audio listening"""
        self.is_recording = False
        print("🛑 Listening stopped")
        
    def _listen_loop(self):
        """Main listening loop using Google Speech-to-Text"""
        consecutive_errors = 0
        max_errors = 3
        
        while self.is_recording and consecutive_errors < max_errors:
            try:
                with microphone as source:
                    # Listen with optimized timeouts
                    audio = recognizer.listen(
                        source, 
                        timeout=1.5,
                        phrase_time_limit=15
                    )
                    
                # Process audio
                threading.Thread(
                    target=self._process_audio, 
                    args=(audio,), 
                    daemon=True
                ).start()
                
                consecutive_errors = 0
                    
            except sr.WaitTimeoutError:
                continue
            except Exception as e:
                consecutive_errors += 1
                print(f"❌ Listening error ({consecutive_errors}/{max_errors}): {e}")
                
                if consecutive_errors >= max_errors:
                    socketio.emit('error', {
                        'message': f'Audio system error'
                    })
                    break
                    
                time.sleep(1)
                
        self.is_recording = False
                
    def _process_audio(self, audio):
        """Process audio using Google Speech-to-Text"""
        try:
            recognized_text = None
            
            # Try Google Speech-to-Text with different language settings
            recognition_attempts = [
                ('Auto-detect', None),
                ('English', 'en-US'),
                ('Target Language', self.target_language)
            ]
            
            for attempt_name, lang_code in recognition_attempts:
                try:
                    if lang_code:
                        recognized_text = recognizer.recognize_google(audio, language=lang_code)
                    else:
                        recognized_text = recognizer.recognize_google(audio)
                    
                    if recognized_text and len(recognized_text.strip()) > 0:
                        print(f"🎙️ Google Speech recognized ({attempt_name}): '{recognized_text}'")
                        break
                        
                except (sr.UnknownValueError, sr.RequestError):
                    continue
            
            if not recognized_text or len(recognized_text.strip()) == 0:
                print("🔇 No clear speech detected")
                return
                
            # Translate using our streamlined translator
            print(f"🔄 Processing: '{recognized_text}' (context: {self.context})")
            
            translation_result = self.translator.translate_text(
                text=recognized_text,
                target_lang=self.target_language,
                source_lang='auto',
                context=self.context
            )
            
            # Prepare result
            result = {
                'original_text': recognized_text,
                'translated_text': translation_result['translated_text'],
                'source_language': translation_result['source_language'],
                'target_language': self.target_language,
                'timestamp': datetime.now().isoformat(),
                'confidence': translation_result['confidence'],
                'method': translation_result['method'],
                'context': self.context,
                'audio_quality': 'good' if translation_result['confidence'] > 0.8 else 'fair'
            }
            
            # Emit results
            socketio.emit('speech_recognized', result)
            socketio.emit('translation_result', result)
            
            print(f"✅ Audio processed successfully: {result['translated_text']}")
                
        except sr.UnknownValueError:
            print("🔇 Speech not clear enough")
        except sr.RequestError as e:
            error_msg = f'Google Speech service error: {str(e)}'
            print(f"❌ {error_msg}")
            socketio.emit('error', {'message': error_msg})
        except Exception as e:
            error_msg = f'Audio processing error: {str(e)}'
            print(f"❌ {error_msg}")
            socketio.emit('error', {'message': error_msg})

# Initialize components
translator = StreamlinedTranslator()
if USE_SPEECH:
    audio_processor = EnhancedAudioProcessor(translator)

# Flask Routes
@app.route('/')
def index():
    return jsonify({"status": "API running"})
# @app.route('/')
# def index():
#     """Main application page"""
#     return render_template('index.html', languages=LANGUAGES, contexts=AVIATION_CONTEXTS)

@app.route('/api/languages')
def get_languages():
    """Get supported languages"""
    return jsonify(LANGUAGES)

@app.route('/api/contexts')
def get_contexts():
    """Get aviation contexts"""
    return jsonify(AVIATION_CONTEXTS)

@app.route('/api/translate_text', methods=['POST'])
def api_translate_text():
    data = request.get_json()
    text = data.get('text', '')
    source_lang = data.get('source_language', 'auto')
    target_lang = data.get('target_language', 'en')
    context = data.get('context', 'general')
    result = translator.translate_text(text, target_lang, source_lang, context)
    return jsonify(result)

@app.route('/api/status')
def get_status():
    """Get system status"""
    return jsonify({
        'speech_available': USE_SPEECH,
        'gemini_available': translator.is_gemini_ready,
        'google_translate_available': USE_GOOGLE_TRANS,
        'supported_languages': len(LANGUAGES),
        'translation_methods': ['simple_google_translate'] + (['gemini_ai'] if translator.is_gemini_ready else []),
        'aviation_contexts': list(AVIATION_CONTEXTS.keys()),
        'system_ready': USE_GOOGLE_TRANS
    })

# SocketIO Event Handlers
@socketio.on('connect')
def handle_connect():
    """Handle client connection"""
    print('🛬 Client connected')
    emit('status', {
        'message': 'Connected to streamlined flight communication system',
        'speech_available': USE_SPEECH,
        'gemini_available': translator.is_gemini_ready,
        'google_translate_available': USE_GOOGLE_TRANS,
        'system_ready': USE_GOOGLE_TRANS,
        'supported_languages': len(LANGUAGES)
    })

@socketio.on('disconnect')
def handle_disconnect():
    """Handle client disconnection"""
    print('🛫 Client disconnected')
    if USE_SPEECH:
        audio_processor.stop_listening()

@socketio.on('start_listening')
def handle_start_listening(data):
    """Start audio listening"""
    if not USE_SPEECH:
        emit('error', {'message': 'Speech recognition not available'})
        return
        
    target_lang = data.get('language', 'en')
    context = data.get('context', 'general')
    sensitivity = data.get('sensitivity', 0.5)
    
    print(f'🎙️ Starting listening: {LANGUAGES.get(target_lang)} (context: {AVIATION_CONTEXTS.get(context)})')
    
    audio_processor.start_listening(target_lang, context, sensitivity)
    emit('status', {
        'message': f'Listening for {LANGUAGES.get(target_lang, target_lang)}',
        'listening': True,
        'context': context,
        'sensitivity': sensitivity
    })

@socketio.on('stop_listening')
def handle_stop_listening():
    """Stop audio listening"""
    if not USE_SPEECH:
        return
        
    print('🛑 Stopping listening')
    audio_processor.stop_listening()
    emit('status', {
        'message': 'Listening stopped',
        'listening': False
    })

@socketio.on('translate_text')
def handle_translate(data):
    """Manual text translation"""
    try:
        text = data.get('text', '').strip()
        if not text:
            emit('error', {'message': 'No text provided'})
            return
            
        target_lang = data.get('target_language', 'en')
        source_lang = data.get('source_language', 'auto')
        context = data.get('context', 'general')
        
        print(f"🔄 Manual translation: '{text}' [{source_lang} → {target_lang}] (context: {context})")
        
        translation_result = translator.translate_text(
            text=text,
            target_lang=target_lang,
            source_lang=source_lang,
            context=context
        )
        
        result = {
            'original_text': text,
            'translated_text': translation_result['translated_text'],
            'source_language': translation_result['source_language'],
            'target_language': target_lang,
            'timestamp': datetime.now().isoformat(),
            'confidence': translation_result['confidence'],
            'method': translation_result['method'],
            'context': context,
            'manual_translation': True
        }
        
        emit('translation_result', result)
        print(f"✅ Manual translation completed: {result['translated_text']}")
        
    except Exception as e:
        error_msg = f'Translation error: {str(e)}'
        print(f"❌ {error_msg}")
        emit('error', {'message': error_msg})

@socketio.on('test_translation')
def handle_test_translation(data):
    """Test translation system"""
    test_phrases = [
        "Cleared for takeoff runway 27",
        "Request immediate landing clearance",
        "Emergency fuel situation",
        "Weather conditions deteriorating"
    ]
    
    target_lang = data.get('language', 'es')
    results = []
    
    for phrase in test_phrases:
        result = translator.translate_text(phrase, target_lang, 'en', 'atc')
        results.append({
            'original': phrase,
            'translated': result['translated_text'],
            'confidence': result['confidence'],
            'method': result['method']
        })
    
    emit('test_results', {'results': results, 'target_language': target_lang})

if __name__ == '__main__':
    print("\n" + "="*70)
    print("🛩️  STREAMLINED FLIGHT COMMUNICATION SYSTEM")
    print("="*70)
    print(f"🎙️  Google Speech-to-Text: {'✅ Ready' if USE_SPEECH else '⚠️ Not Available'}")
    print(f"🔄 Google Translate: {'✅ Ready' if USE_GOOGLE_TRANS else '❌ Not Available'}")
    print(f"🤖 Gemini AI: {'✅ Ready' if translator.is_gemini_ready else '⚠️ Not Ready'}")
    print(f"🗣️  Supported Languages: {len(LANGUAGES)}")
    print(f"✈️  Aviation Contexts: {len(AVIATION_CONTEXTS)}")
    print(f"⚡ System Status: {'🟢 READY' if USE_GOOGLE_TRANS else '🔴 INCOMPLETE'}")
    print("="*70)
    
    if not USE_GOOGLE_TRANS:
        print("⚠️  CRITICAL: Translation service failed!")
        print("   Check your internet connection")
        sys.exit(1)
    
    if not USE_SPEECH:
        print("⚠️  WARNING: Speech recognition not available")
        print("   Install with: pip install SpeechRecognition")
        print("   Text translation will still work")
    
    if not translator.is_gemini_ready:
        print("⚠️  INFO: Gemini AI not available - using Google Translate only")
        print("   For enhanced aviation translations, set GEMINI_API_KEY")
    
    try:
        print(f"\n🚀 Starting server on http://localhost:5000")
        socketio.run(app, debug=False, host='0.0.0.0', port=5000)
    except KeyboardInterrupt:
        print("\n🛑 Flight communication system shutting down...")
        print("✈️  Safe travels!")