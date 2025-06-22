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
import asyncio
from typing import Optional, Dict, Any

# Google Gemini AI for advanced translation
try:
    import google.generativeai as genai
    USE_GEMINI = True
    print("Gemini AI available for enhanced translation")
except ImportError:
    USE_GEMINI = False
    print("Gemini AI not available - install google-generativeai")

# Fallback translation libraries
try:
    from googletrans import Translator as GoogleTranslator
    USE_GOOGLE_TRANS = True
except ImportError:
    USE_GOOGLE_TRANS = False
    print("Google Translate fallback not available")

try:
    from translate import Translator
    USE_TRANSLATE_LIB = True
except ImportError:
    USE_TRANSLATE_LIB = False
    print("Translate library not available")

# Speech recognition
try:
    import speech_recognition as sr
    USE_SPEECH = True
    recognizer = sr.Recognizer()
    microphone = sr.Microphone()
except ImportError:
    USE_SPEECH = False
    print("Speech recognition not available")

# Initialize Flask app
app = Flask(__name__)
app.config['SECRET_KEY'] = 'flight-communication-secret-key'
socketio = SocketIO(app, cors_allowed_origins="*")

# Enhanced language support with regional variants
LANGUAGES = {
    'en': 'English',
    'en-US': 'English (US)',
    'en-GB': 'English (UK)',
    'es': 'Spanish',
    'es-ES': 'Spanish (Spain)',
    'es-MX': 'Spanish (Mexico)',
    'fr': 'French',
    'fr-FR': 'French (France)',
    'fr-CA': 'French (Canada)',
    'de': 'German',
    'it': 'Italian',
    'pt': 'Portuguese',
    'pt-BR': 'Portuguese (Brazil)',
    'ru': 'Russian',
    'ja': 'Japanese',
    'ko': 'Korean',
    'zh': 'Chinese',
    'zh-CN': 'Chinese (Simplified)',
    'zh-TW': 'Chinese (Traditional)',
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
    'ms': 'Malay',
    'tl': 'Filipino',
    'uk': 'Ukrainian',
    'cs': 'Czech',
    'hu': 'Hungarian',
    'ro': 'Romanian',
    'bg': 'Bulgarian',
    'hr': 'Croatian',
    'sk': 'Slovak',
    'sl': 'Slovenian',
    'et': 'Estonian',
    'lv': 'Latvian',
    'lt': 'Lithuanian'
}

# Advanced language detection patterns
LANGUAGE_PATTERNS = {
    'es': [r'[ñáéíóúü]', r'\b(el|la|los|las|un|una|de|en|con|por|para|que|es|son|está|están|muy|más|pero|como|cuando|donde|por qué|gracias|hola|adiós)\b'],
    'fr': [r'[àâäéèêëïîôöùûüÿç]', r'\b(le|la|les|un|une|de|du|des|en|dans|avec|pour|que|est|sont|très|plus|mais|comme|quand|où|pourquoi|merci|bonjour|au revoir)\b'],
    'de': [r'[äöüß]', r'\b(der|die|das|ein|eine|und|mit|für|ist|sind|haben|wird|sehr|mehr|aber|wie|wann|wo|warum|danke|hallo|auf wiedersehen)\b'],
    'it': [r'[àèéìíîòóù]', r'\b(il|la|lo|gli|le|un|una|di|in|con|per|che|è|sono|molto|più|ma|come|quando|dove|perché|grazie|ciao|arrivederci)\b'],
    'pt': [r'[ãâáàçéêíóôõú]', r'\b(o|a|os|as|um|uma|de|em|com|para|que|é|são|muito|mais|mas|como|quando|onde|por que|obrigado|olá|tchau)\b'],
    'ru': [r'[а-яё]', r'\b(и|в|на|с|по|от|для|что|это|как|когда|где|почему|спасибо|привет|до свидания)\b'],
    'ja': [r'[ひらがなカタカナ一-龯]', r'[あいうえおかきくけこさしすせそたちつてとなにぬねのはひふへほまみむめもやゆよらりるれろわをん]'],
    'ko': [r'[가-힣]', r'[ㄱ-ㅎㅏ-ㅣ]'],
    'zh': [r'[一-龯]', r'[的是在有不了人我他这个们中来上大为和国地到以说时要就出会可也你对生能而子那得于着下自之年过发后作里用道行所然家种事成方多经么去法学如都同现当没动面起看定天分还进好小部其些主样理心她本前开但因只从想实日军者意无力它与长把机十民第公此已工使情明性知全三又关点正业外将两高手告更做什美没还果过种发该也并次两高期间更做然家种事成方多经么去法学如都同现当没动面起看定天分还进好小部其些主样理心她本前开但因只从想实日军者意无力它与长把机十民第公此已工使情明性知全三又关点正业外将两高手告更做什美没还果]\b'],
    'ar': [r'[ا-ي]', r'\b(في|من|إلى|على|عن|مع|هذا|هذه|التي|الذي|ما|كيف|متى|أين|لماذا|شكرا|مرحبا|وداعا)\b'],
    'hi': [r'[अ-ह]', r'\b(में|से|को|का|की|के|है|हैं|था|थी|थे|यह|वह|क्या|कैसे|कब|कहाँ|क्यों|धन्यवाद|नमस्ते|अलविदा)\b'],
    'th': [r'[ก-๙]', r'\b(ใน|จาก|ไป|บน|เรื่อง|กับ|นี้|นั้น|อะไร|อย่างไร|เมื่อไหร่|ที่ไหน|ทำไม|ขอบคุณ|สวัสดี|ลาก่อน)\b'],
    'nl': [r'\b(de|het|een|van|in|met|voor|dat|is|zijn|hebben|wordt|zeer|meer|maar|zoals|wanneer|waar|waarom|dank je|hallo|tot ziens)\b'],
    'pl': [r'[ąćęłńóśźż]', r'\b(i|w|na|do|z|o|że|jest|są|ma|będzie|bardzo|więcej|ale|jak|kiedy|gdzie|dlaczego|dziękuję|cześć|do widzenia)\b'],
    'tr': [r'[çğıöşü]', r'\b(ve|bir|bu|için|ile|den|dan|dır|dir|dur|dur|çok|daha|ama|nasıl|ne zaman|nerede|neden|teşekkürler|merhaba|güle güle)\b']
}

class GeminiTranslator:
    """Advanced AI-powered translator using Google Gemini"""
    
    def __init__(self):
        self.model = None
        self.fallback_translator = None
        self.is_initialized = False
        
        # Initialize Gemini if available
        if USE_GEMINI:
            self._init_gemini()
        
        # Initialize fallback translators
        self._init_fallback()
    
    def _init_gemini(self):
        """Initialize Gemini AI model"""
        try:
            # Get API key from environment variable
            #api_key = os.getenv('AIzaSyBabZps8wcWFhyOrWEai4mcPyKzaNvGIoA')
            #AIzaSyDawieEIRKCDVVK9v-KvGa-13PRe4tXgyA
            api_key = os.getenv('GEMINI_API_KEY')
            if not api_key:
                print("Warning: GEMINI_API_KEY not set in environment variables")
                print("Please set it with: export GEMINI_API_KEY='your-api-key-here'")
                return
            
            genai.configure(api_key=api_key)
            
            # Use Gemini Pro model for text processing
            self.model = genai.GenerativeModel('gemini-2.5-pro')
            self.is_initialized = True
            print("Gemini AI translator initialized successfully")
            
        except Exception as e:
            print(f"Failed to initialize Gemini: {e}")
            self.model = None
            self.is_initialized = False
    
    def _init_fallback(self):
        """Initialize fallback translation methods"""
        if USE_GOOGLE_TRANS:
            try:
                self.fallback_translator = GoogleTranslator()
                print("Google Translate fallback initialized")
            except Exception as e:
                print(f"Google Translate fallback failed: {e}")

    def detect_language(self, text: str) -> str:
        """Enhanced language detection using AI and patterns"""
        if not text or not text.strip():
            return 'en'
        
        text_lower = text.lower().strip()
        
        # First try pattern-based detection
        pattern_result = self._pattern_detect(text_lower)
        
        # If Gemini is available, use it for verification
        if self.is_initialized and len(text_lower) > 10:
            try:
                gemini_result = self._gemini_detect(text)
                # Prefer Gemini result if confident
                if gemini_result and gemini_result != 'unknown':
                    return gemini_result
            except Exception as e:
                print(f"Gemini detection error: {e}")
        
        return pattern_result
    
    def _pattern_detect(self, text: str) -> str:
        """Pattern-based language detection"""
        scores = {'en': 1}  # Default baseline for English
        
        for lang, patterns in LANGUAGE_PATTERNS.items():
            score = 0
            for pattern in patterns:
                matches = len(re.findall(pattern, text, re.IGNORECASE | re.UNICODE))
                score += matches
            
            if score > 0:
                # Weight score by text length for better accuracy
                normalized_score = score / len(text.split()) if len(text.split()) > 0 else score
                scores[lang] = normalized_score
        
        detected = max(scores, key=scores.get)
        return detected if scores[detected] > 0.1 else 'en'
    
    def _gemini_detect(self, text: str) -> str:
        """Use Gemini AI for language detection"""
        try:
            prompt = f"""
            Detect the language of the following text and respond with only the ISO 639-1 language code (e.g., 'en', 'es', 'fr', 'de', etc.).
            If you're not confident, respond with 'unknown'.
            
            Text: "{text}"
            
            Language code:
            """
            
            response = self.model.generate_content(prompt)
            detected = response.text.strip().lower()
            
            # Validate the response
            if detected in LANGUAGES or detected.split('-')[0] in LANGUAGES:
                return detected.split('-')[0]  # Return base language code
            
            return 'unknown'
            
        except Exception as e:
            print(f"Gemini language detection error: {e}")
            return 'unknown'
    
    # Replace your translation priority in the translate_text method

    def translate_text(self, text: str, target_lang: str = 'en', source_lang: str = 'auto', context: str = 'general') -> Dict[str, Any]:
        """Translation with Google Translate as primary method"""
        if not text or not text.strip():
            return {
                'translated_text': '',
                'source_language': 'unknown',
                'confidence': 0.0,
                'method': 'none',
                'error': 'Empty text'
            }

        # Auto-detect source language if needed
        if source_lang == 'auto':
            source_lang = self.detect_language(text)
            print(f"DEBUG: Detected language: {source_lang} for text: '{text}'")

        # Skip translation if same language (but be less aggressive)
        if source_lang == target_lang and len(text) > 5:
            double_check = self._pattern_detect(text.lower())
            if double_check == target_lang:
                return {
                    'translated_text': text,
                    'source_language': source_lang,
                    'confidence': 1.0,
                    'method': 'no_translation_needed'
                }

        print(f"DEBUG: Attempting translation from {source_lang} to {target_lang}")

        # Try Google Translate FIRST (more reliable for simple phrases)
        if USE_GOOGLE_TRANS:
            try:
                print("DEBUG: Trying Google Translate...")
                result = self._google_translate_improved(text, source_lang, target_lang)
                if result['translated_text'] and result['translated_text'].strip():
                    print(f"DEBUG: Google Translate success: {result['translated_text']}")
                    return result
            except Exception as e:
                print(f"DEBUG: Google Translate error: {e}")

        # Only use Gemini for longer or less common phrases
        if self.is_initialized and self.model and len(text.strip()) > 10:
            try:
                print("DEBUG: Trying Gemini translation...")
                result = self._gemini_translate_improved(text, source_lang, target_lang, context)
                if result['translated_text'] and result['translated_text'].strip():
                    print(f"DEBUG: Gemini success: {result['translated_text']}")
                    return result
            except Exception as e:
                # 2. Handle the 429 Error Gracefully
                if "429" in str(e):
                    print("Gemini API quota exceeded. Falling back to basic translation.")
                    # Fallback to basic translation
                    return self._basic_translate(text, source_lang, target_lang)
                print(f"DEBUG: Gemini translation error: {e}")

        # Final fallback
        return self._basic_translate(text, source_lang, target_lang)

    def _google_translate_improved(self, text: str, source_lang: str, target_lang: str) -> Dict[str, Any]:
        """Improved Google Translate with better language mapping"""
        try:
            # Map language codes that Google Translate expects
            lang_mapping = {
                'zh': 'zh-cn',
                'zh-CN': 'zh-cn', 
                'zh-TW': 'zh-tw',
                'pt': 'pt',
                'pt-BR': 'pt'
            }
            
            src_lang = lang_mapping.get(source_lang, source_lang)
            dest_lang = lang_mapping.get(target_lang, target_lang)
            
            if self.fallback_translator:
                result = self.fallback_translator.translate(text, src=src_lang, dest=dest_lang)
                
                return {
                    'translated_text': result.text,
                    'source_language': result.src,
                    'confidence': 0.9,  # Google Translate is quite reliable
                    'method': 'google_translate'
                }
            else:
                # Create fresh translator if needed
                fresh_translator = GoogleTranslator()
                result = fresh_translator.translate(text, src=src_lang, dest=dest_lang)
                
                return {
                    'translated_text': result.text,
                    'source_language': result.src,
                    'confidence': 0.9,
                    'method': 'google_translate_fresh'
                }
                
        except Exception as e:
            print(f"Google Translate error: {e}")
            return {
                'translated_text': '',
                'source_language': source_lang,
                'confidence': 0.0,
                'method': 'google_translate',
                'error': str(e)
            }

    def _gemini_translate_improved(self, text: str, source_lang: str, target_lang: str, context: str) -> Dict[str, Any]:
        """Improved Gemini with much simpler, more direct prompts"""
        try:
            source_name = LANGUAGES.get(source_lang, source_lang)
            target_name = LANGUAGES.get(target_lang, target_lang)
            
            # Much simpler prompt - Gemini was getting confused with complex instructions
            prompt = f"""Translate this {source_name} text to {target_name}:

    "{text}"

    Only return the translation, nothing else."""
            
            print(f"DEBUG: Simple Gemini prompt: {prompt}")
            
            response = self.model.generate_content(prompt)
            translated = response.text.strip()
            
            # Clean up response
            if translated.startswith('"') and translated.endswith('"'):
                translated = translated[1:-1]
            
            # Remove any extra text after newlines
            if '\n' in translated:
                translated = translated.split('\n')[0].strip()
            
            return {
                'translated_text': translated,
                'source_language': source_lang,
                'confidence': 0.8,  # Lower confidence due to observed issues
                'method': 'gemini_simple'
            }
            
        except Exception as e:
            print(f"Gemini translation error: {e}")
            return {
                'translated_text': '',
                'source_language': source_lang,
                'confidence': 0.0,
                'method': 'gemini_simple',
                'error': str(e)
            }
        
    def _basic_translate(self, text: str, source_lang: str, target_lang: str) -> Dict[str, Any]:
        """Basic fallback translation"""
        # If all else fails, try the simple translate library
        if USE_TRANSLATE_LIB:
            try:
                translator = Translator(to_lang=target_lang)
                result = translator.translate(text)
                
                return {
                    'translated_text': result,
                    'source_language': source_lang,
                    'confidence': 0.6,
                    'method': 'basic_translate'
                }
            except Exception as e:
                print(f"Basic translate error: {e}")
        
        return {
            'translated_text': f"[Translation unavailable: {text}]",
            'source_language': source_lang,
            'confidence': 0.0,
            'method': 'none',
            'error': 'All translation methods failed'
        }

class EnhancedAudioProcessor:
    """Enhanced audio processing with better noise handling"""
    
    def __init__(self, translator):
        self.translator = translator
        self.is_recording = False
        self.target_language = 'en'
        self.context = 'aviation'
        self.sensitivity = 0.5
        
    def start_listening(self, target_lang='en', context='aviation', sensitivity=0.5):
        """Start enhanced audio listening"""
        if not USE_SPEECH:
            socketio.emit('error', {'message': 'Speech recognition not available'})
            return
            
        self.target_language = target_lang
        self.context = context
        self.sensitivity = sensitivity
        self.is_recording = True
        
        try:
            # Enhanced microphone setup
            with microphone as source:
                # Adjust for ambient noise with longer duration for better accuracy
                recognizer.adjust_for_ambient_noise(source, duration=2)
                
                # Configure recognizer settings
                recognizer.energy_threshold = 1000 if sensitivity > 0.5 else 2000
                recognizer.dynamic_energy_threshold = True
                recognizer.pause_threshold = 0.8
                recognizer.phrase_threshold = 0.3
                
            # Start listening thread
            threading.Thread(target=self._listen_continuously, daemon=True).start()
            
        except Exception as e:
            socketio.emit('error', {'message': f'Microphone setup error: {str(e)}'})
            
    def stop_listening(self):
        """Stop audio listening"""
        self.is_recording = False
        
    def _listen_continuously(self):
        """Enhanced continuous listening with better error handling"""
        consecutive_errors = 0
        max_errors = 5
        
        while self.is_recording and consecutive_errors < max_errors:
            try:
                with microphone as source:
                    # Listen with timeout and phrase limits
                    audio = recognizer.listen(
                        source, 
                        timeout=2, 
                        phrase_time_limit=10
                    )
                    
                # Process audio in separate thread
                threading.Thread(
                    target=self._process_audio, 
                    args=(audio,), 
                    daemon=True
                ).start()
                
                consecutive_errors = 0  # Reset error counter on success
                    
            except sr.WaitTimeoutError:
                # No audio detected, continue
                continue
            except Exception as e:
                consecutive_errors += 1
                print(f"Listening error ({consecutive_errors}/{max_errors}): {e}")
                time.sleep(0.5)
                
        if consecutive_errors >= max_errors:
            socketio.emit('error', {'message': 'Too many audio errors, stopping listener'})
            self.is_recording = False
                
    def _process_audio(self, audio):
        """Enhanced audio processing with better recognition"""
        try:
            # Try multiple recognition methods for better accuracy
            text = None
            
            # Primary: Google Speech Recognition
            try:
                text = recognizer.recognize_google(audio)
            except (sr.UnknownValueError, sr.RequestError):
                pass
            
            # Fallback: Try with language hint if we have context
            if not text and self.target_language != 'en':
                try:
                    text = recognizer.recognize_google(audio, language=self.target_language)
                except (sr.UnknownValueError, sr.RequestError):
                    pass
            
            if text and len(text.strip()) > 0:
                # Enhanced translation with context
                translation_result = self.translator.translate_text(
                    text, 
                    target_lang=self.target_language,
                    source_lang='auto',
                    context=self.context
                )
                
                # Prepare comprehensive result
                result = {
                    'original_text': text,
                    'translated_text': translation_result['translated_text'],
                    'source_language': translation_result['source_language'],
                    'target_language': self.target_language,
                    'timestamp': datetime.now().isoformat(),
                    'confidence': translation_result['confidence'],
                    'method': translation_result['method'],
                    'context': self.context
                }
                
                socketio.emit('speech_result', result)
                
        except sr.UnknownValueError:
            # No speech detected - this is normal, don't emit error
            pass
        except sr.RequestError as e:
            socketio.emit('error', {'message': f'Speech recognition service error: {str(e)}'})
        except Exception as e:
            print(f"Audio processing error: {e}")
            socketio.emit('error', {'message': f'Audio processing error: {str(e)}'})

# Initialize enhanced components
translator = GeminiTranslator()
audio_processor = EnhancedAudioProcessor(translator)

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
    """Get enhanced system status"""
    return jsonify({
        'speech_available': USE_SPEECH,
        'gemini_available': USE_GEMINI and translator.is_initialized,
        'google_translate_available': USE_GOOGLE_TRANS,
        'basic_translate_available': USE_TRANSLATE_LIB,
        'languages': list(LANGUAGES.keys()),
        'translation_methods': ['gemini_ai', 'google_translate', 'basic_translate']
    })

@socketio.on('connect')
def handle_connect():
    """Handle client connection"""
    print('Client connected')
    emit('status', {
        'message': 'Connected to enhanced flight communication system',
        'speech_available': USE_SPEECH,
        'gemini_available': USE_GEMINI and translator.is_initialized,
        'translation_methods': ['gemini_ai', 'google_translate', 'basic_translate']
    })

@socketio.on('disconnect')
def handle_disconnect():
    """Handle client disconnection"""
    print('Client disconnected')
    audio_processor.stop_listening()

@socketio.on('start_listening')
def handle_start_listening(data):
    """Start enhanced audio listening"""
    target_lang = data.get('language', 'en')
    context = data.get('context', 'aviation')
    sensitivity = data.get('sensitivity', 0.5)
    
    print(f'Starting enhanced listening: {target_lang} (context: {context})')
    
    audio_processor.start_listening(target_lang, context, sensitivity)
    emit('status', {
        'message': f'Enhanced listening started for {LANGUAGES.get(target_lang, target_lang)}',
        'listening': True,
        'context': context
    })

@socketio.on('stop_listening')
def handle_stop_listening():
    """Stop audio listening"""
    print('Stopping enhanced listening')
    audio_processor.stop_listening()
    emit('status', {
        'message': 'Enhanced listening stopped',
        'listening': False
    })

@socketio.on('translate_text')
def handle_translate(data):
    """Enhanced manual translation endpoint"""
    try:
        text = data.get('text', '').strip()
        if not text:
            emit('error', {'message': 'No text provided'})
            return
            
        target_lang = data.get('target_language', 'en')
        source_lang = data.get('source_language', 'auto')
        context = data.get('context', 'general')
        
        print(f"Enhanced translation: '{text}' from {source_lang} to {target_lang} (context: {context})")
        
        # Enhanced translation with context
        translation_result = translator.translate_text(
            text, 
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
            'context': context
        }
        
        emit('translation_result', result)
        print(f"Enhanced translation result: {result}")
        
    except Exception as e:
        error_msg = f'Enhanced translation error: {str(e)}'
        print(error_msg)
        emit('error', {'message': error_msg})


if __name__ == '__main__':
    import eventlet
    import eventlet.wsgi
    logging.basicConfig(level=logging.INFO)
    print("\n" + "="*50)
    print("Flight Communication App Starting...")
    print("="*50)
    print(f"Speech Recognition Available: {USE_SPEECH}")
    print(f"Translation Library Available: {USE_TRANSLATE_LIB}")
    print(f"Supported Languages: {len(LANGUAGES)}")
    print("="*50)
    try:
        socketio.run(app, debug=True, host='0.0.0.0', port=5000)
    except KeyboardInterrupt:
        print("\nShutting down...")
    except Exception as e:
        print(f"Error starting server: {e}")
        print("Try running with: python app.py")
# if __name__ == '__main__':
#     # Set up logging
#     logging.basicConfig(level=logging.INFO)
    
#     # Print enhanced system status
#     print("\n" + "="*60)
#     print("🚀 ENHANCED Flight Communication App Starting...")
#     print("="*60)
#     print(f"🎤 Speech Recognition: {'✅ Available' if USE_SPEECH else '❌ Not Available'}")
#     print(f"🤖 Gemini AI: {'✅ Available' if USE_GEMINI and translator.is_initialized else '❌ Not Available'}")
#     print(f"🌐 Google Translate: {'✅ Available' if USE_GOOGLE_TRANS else '❌ Not Available'}")
#     print(f"📝 Basic Translate: {'✅ Available' if USE_TRANSLATE_LIB else '❌ Not Available'}")
#     print(f"🌍 Languages Supported: {len(LANGUAGES)}")
#     print("="*60)
    
#     if USE_GEMINI and not translator.is_initialized:
#         print("⚠️  To enable Gemini AI translation:")
#         print("   1. Get API key from: https://makersuite.google.com/app/apikey")
#         print("   2. Set environment variable: export GEMINI_API_KEY='your-key-here'")
#         print("   3. Install: pip install google-generativeai")
#         print("="*60)
    
#     # Run the enhanced app
#     try:
#         socketio.run(app, debug=True, host='0.0.0.0', port=5000)
#     except KeyboardInterrupt:
#         print("\n🛑 Shutting down enhanced system...")
#     except Exception as e:
#         print(f"❌ Error starting enhanced server: {e}")
#         print("💡 Try running with: python enhanced_app.py")