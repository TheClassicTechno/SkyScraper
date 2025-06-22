# from flask import Flask, render_template, request, jsonify
# from flask_socketio import SocketIO, emit
# import threading
# import queue
# import time
# import json
# import logging
# from datetime import datetime
# import os
# import re
# import asyncio
# from typing import Optional, Dict, Any
# import sys
# from deep_translator import GoogleTranslator as DeepGoogleTranslator


# from deep_translator import GoogleTranslator as DeepGoogleTranslator
# # from deep_translator import detect
# print("Running with Python:", sys.executable)

# # Google Gemini AI for advanced translation
# try:
#     import google.generativeai as genai
#     USE_GEMINI = True
#     print("Gemini AI available for enhanced translation")
# except ImportError:
#     USE_GEMINI = False
#     print("Gemini AI not available - install google-generativeai")

# # Multiple translation libraries for better reliability
# try:
#     from googletrans import Translator as GoogleTranslator
#     USE_GOOGLE_TRANS = True
#     print("Google Translate library available")
# except ImportError:
#     USE_GOOGLE_TRANS = False
#     print("Google Translate fallback not available - install googletrans==4.0.0-rc1")

# try:
#     from deep_translator import GoogleTranslator as DeepGoogleTranslator
#     from deep_translator import detect
#     USE_DEEP_TRANSLATOR = True
#     print("Deep Translator library available")
# except ImportError:
#     USE_DEEP_TRANSLATOR = False
#     print("Deep Translator not available - install deep-translator")

# try:
#     from translate import Translator
#     USE_TRANSLATE_LIB = True
#     print("Basic translate library available")
# except ImportError:
#     USE_TRANSLATE_LIB = False
#     print("Basic translate library not available")

# # Speech recognition
# try:
#     import speech_recognition as sr
#     USE_SPEECH = True
#     recognizer = sr.Recognizer()
#     microphone = sr.Microphone()
#     print("Speech recognition available")
# except ImportError:
#     USE_SPEECH = False
#     print("Speech recognition not available")

# # Initialize Flask app
# app = Flask(__name__)
# app.config['SECRET_KEY'] = 'flight-communication-secret-key'
# socketio = SocketIO(app, cors_allowed_origins="*")

# # Enhanced language support with regional variants
# LANGUAGES = {
#     'en': 'English',
#     'en-US': 'English (US)',
#     'en-GB': 'English (UK)',
#     'es': 'Spanish',
#     'es-ES': 'Spanish (Spain)',
#     'es-MX': 'Spanish (Mexico)',
#     'fr': 'French',
#     'fr-FR': 'French (France)',
#     'fr-CA': 'French (Canada)',
#     'de': 'German',
#     'it': 'Italian',
#     'pt': 'Portuguese',
#     'pt-BR': 'Portuguese (Brazil)',
#     'ru': 'Russian',
#     'ja': 'Japanese',
#     'ko': 'Korean',
#     'zh': 'Chinese',
#     'zh_cn': 'Chinese (Simplified)',
#     'zh_tw': 'Chinese (Traditional)',
#     'ar': 'Arabic',
#     'hi': 'Hindi',
#     'th': 'Thai',
#     'vi': 'Vietnamese',
#     'nl': 'Dutch',
#     'pl': 'Polish',
#     'tr': 'Turkish',
#     'sv': 'Swedish',
#     'no': 'Norwegian',
#     'da': 'Danish',
#     'fi': 'Finnish',
#     'he': 'Hebrew',
#     'id': 'Indonesian',
#     'ms': 'Malay',
#     'tl': 'Filipino',
#     'uk': 'Ukrainian',
#     'cs': 'Czech',
#     'hu': 'Hungarian',
#     'ro': 'Romanian',
#     'bg': 'Bulgarian',
#     'hr': 'Croatian',
#     'sk': 'Slovak',
#     'sl': 'Slovenian',
#     'et': 'Estonian',
#     'lv': 'Latvian',
#     'lt': 'Lithuanian'
# }

# # Language code mapping for different libraries
# LANG_CODE_MAPPING = {
#     'zh': 'zh_cn',
#     'zh-CN': 'zh_cn', 
#     'zh-TW': 'zh_tw',
#     'pt': 'pt',
#     'pt-BR': 'pt'
# }

# # Advanced language detection patterns
# LANGUAGE_PATTERNS = {
#     'es': [r'[ñáéíóúü]', r'\b(el|la|los|las|un|una|de|en|con|por|para|que|es|son|está|están|muy|más|pero|como|cuando|donde|por qué|gracias|hola|adiós|cómo|qué)\b'],
#     'fr': [r'[àâäéèêëïîôöùûüÿç]', r'\b(le|la|les|un|une|de|du|des|en|dans|avec|pour|que|est|sont|très|plus|mais|comme|quand|où|pourquoi|merci|bonjour|au revoir|comment|ça va)\b'],
#     'de': [r'[äöüß]', r'\b(der|die|das|ein|eine|und|mit|für|ist|sind|haben|wird|sehr|mehr|aber|wie|wann|wo|warum|danke|hallo|auf wiedersehen|wie geht)\b'],
#     'it': [r'[àèéìíîòóù]', r'\b(il|la|lo|gli|le|un|una|di|in|con|per|che|è|sono|molto|più|ma|come|quando|dove|perché|grazie|ciao|arrivederci|come stai|sta)\b'],
#     'pt': [r'[ãâáàçéêíóôõú]', r'\b(o|a|os|as|um|uma|de|em|com|para|que|é|são|muito|mais|mas|como|quando|onde|por que|obrigado|olá|tchau|como está|vai)\b'],
#     'ru': [r'[а-яё]', r'\b(и|в|на|с|по|от|для|что|это|как|когда|где|почему|спасибо|привет|до свидания|как дела)\b'],
#     'ja': [r'[ひらがなカタカナ一-龯]', r'[あいうえおかきくけこさしすせそたちつてとなにぬねのはひふへほまみむめもやゆよらりるれろわをん]'],
#     'ko': [r'[가-힣]', r'[ㄱ-ㅎㅏ-ㅣ]'],
#     'zh': [r'[一-龯]', r'[你好吗怎么样什么时候哪里为什么谢谢再见]'],
#     'ar': [r'[ا-ي]', r'\b(في|من|إلى|على|عن|مع|هذا|هذه|التي|الذي|ما|كيف|متى|أين|لماذا|شكرا|مرحبا|وداعا|كيف حالك)\b'],
#     'hi': [r'[अ-ह]', r'\b(में|से|को|का|की|के|है|हैं|था|थी|थे|यह|वह|क्या|कैसे|कब|कहाँ|क्यों|धन्यवाद|नमस्ते|अलविदा|कैसे हैं)\b'],
#     'th': [r'[ก-๙]', r'\b(ใน|จาก|ไป|บน|เรื่อง|กับ|นี้|นั้น|อะไร|อย่างไร|เมื่อไหร่|ที่ไหน|ทำไม|ขอบคุณ|สวัสดี|ลาก่อน|สบายดี)\b'],
#     'nl': [r'\b(de|het|een|van|in|met|voor|dat|is|zijn|hebben|wordt|zeer|meer|maar|zoals|wanneer|waar|waarom|dank je|hallo|tot ziens|hoe gaat)\b'],
#     'pl': [r'[ąćęłńóśźż]', r'\b(i|w|na|do|z|o|że|jest|są|ma|będzie|bardzo|więcej|ale|jak|kiedy|gdzie|dlaczego|dziękuję|cześć|do widzenia|jak się)\b'],
#     'tr': [r'[çğıöşü]', r'\b(ve|bir|bu|için|ile|den|dan|dır|dir|dur|dur|çok|daha|ama|nasıl|ne zaman|nerede|neden|teşekkürler|merhaba|güle güle|nasılsın)\b']
# }

# class EnhancedTranslator:
#     """Multi-library translator with better reliability"""
    
#     def __init__(self):
#         self.gemini_model = None
#         self.google_translator = None
#         self.deep_translator = None
#         self.is_gemini_initialized = False
        
#         # Initialize all available translation services
#         self._init_gemini()
#         self._init_google_trans()
#         self._init_deep_translator()
    
#     def _init_gemini(self):
#         """Initialize Gemini AI model"""
#         if not USE_GEMINI:
#             return
            
#         try:
#             api_key = os.getenv('GEMINI_API_KEY')
#             if not api_key:
#                 print("Warning: GEMINI_API_KEY not set in environment variables")
#                 return
            
#             genai.configure(api_key=api_key)
#             self.gemini_model = genai.GenerativeModel('gemini-2.5-pro')
#             self.is_gemini_initialized = True
#             print("✅ Gemini AI translator initialized successfully")
            
#         except Exception as e:
#             print(f"❌ Failed to initialize Gemini: {e}")
#             self.is_gemini_initialized = False
    
#     def _init_google_trans(self):
#         """Initialize Google Translate library"""
#         if not USE_GOOGLE_TRANS:
#             return
            
#         try:
#             self.google_translator = GoogleTranslator()
#             print("✅ Google Translate library initialized")
#         except Exception as e:
#             print(f"❌ Google Translate initialization failed: {e}")
#             self.google_translator = None
    
#     def _init_deep_translator(self):
#         """Initialize Deep Translator library"""
#         if not USE_DEEP_TRANSLATOR:
#             return
            
#         try:
#             # Test deep translator
#             test_translator = DeepGoogleTranslator(source='en', target='es')
#             test_result = test_translator.translate('hello')
#             print("✅ Deep Translator initialized successfully")
#         except Exception as e:
#             print(f"❌ Deep Translator initialization failed: {e}")

#     def detect_language(self, text: str) -> str:
#         """Enhanced language detection with multiple methods"""
#         if not text or not text.strip():
#             return 'en'
        
#         text_clean = text.lower().strip()
        
#         # # Method 1: Deep Translator detection (most reliable)
#         # if USE_DEEP_TRANSLATOR:
#         #     try:
#         #         detected = detect(text)
#         #         if detected and detected in LANGUAGES:
#         #             print(f"Deep Translator detected: {detected}")
#         #             return detected
#         #     except Exception as e:
#         #         print(f"Deep Translator detection failed: {e}")
        
#         # Method 2: Pattern-based detection
#         pattern_result = self._pattern_detect(text_clean)
#         if pattern_result != 'en':
#             print(f"Pattern detection: {pattern_result}")
#             return pattern_result
        
#         # Method 3: Google Translate detection
#         if self.google_translator:
#             try:
#                 result = self.google_translator.detect(text)
#                 detected = result.lang
#                 if detected and detected in LANGUAGES:
#                     print(f"Google Translate detected: {detected}")
#                     return detected
#             except Exception as e:
#                 print(f"Google Translate detection failed: {e}")
        
#         print(f"Defaulting to English for: {text}")
#         return 'en'
    
#     def _pattern_detect(self, text: str) -> str:
#         """Enhanced pattern-based detection"""
#         scores = {'en': 0.1}  # Small baseline for English
        
#         for lang, patterns in LANGUAGE_PATTERNS.items():
#             score = 0
#             for pattern in patterns:
#                 matches = len(re.findall(pattern, text, re.IGNORECASE | re.UNICODE))
#                 score += matches
            
#             if score > 0:
#                 # Normalize by text length
#                 word_count = len(text.split())
#                 normalized_score = score / max(word_count, 1)
#                 scores[lang] = normalized_score
        
#         detected = max(scores, key=scores.get)
#         return detected if scores[detected] > 0.2 else 'en'

#     def translate_text(self, text: str, target_lang: str = 'en', source_lang: str = 'auto', context: str = 'general') -> Dict[str, Any]:
#         """Multi-method translation with fallbacks"""
#         if not text or not text.strip():
#             return self._empty_result('Empty text provided')

#         # Auto-detect source language
#         if source_lang == 'auto':
#             source_lang = self.detect_language(text)
#             print(f"🔍 Detected language: {source_lang} for text: '{text}'")

#         # Skip translation if same language (with better detection)
#         if source_lang == target_lang:
#             return self._same_language_result(text, source_lang)

#         print(f"🔄 Translating from {source_lang} to {target_lang}: '{text}'")

#         # Translation attempts in order of reliability
        
#         # Method 1: Deep Translator (most reliable)
#         if USE_DEEP_TRANSLATOR:
#             result = self._try_deep_translator(text, source_lang, target_lang)
#             if result['translated_text']:
#                 return result
        
#         # Method 2: Google Translate Library
#         if self.google_translator:
#             result = self._try_google_translate(text, source_lang, target_lang)
#             if result['translated_text']:
#                 return result
        
#         # Method 3: Gemini AI (for complex cases)
#         if self.is_gemini_initialized:
#             result = self._try_gemini_translate(text, source_lang, target_lang, context)
#             if result['translated_text']:
#                 return result
        
#         # Method 4: Basic translate library
#         if USE_TRANSLATE_LIB:
#             result = self._try_basic_translate(text, source_lang, target_lang)
#             if result['translated_text']:
#                 return result
        
#         return self._failed_result(text, source_lang, target_lang)

#     def _try_deep_translator(self, text: str, source_lang: str, target_lang: str) -> Dict[str, Any]:
#         """Try Deep Translator"""
#         try:
#             # Map language codes
#             src_code = LANG_CODE_MAPPING.get(source_lang, source_lang)
#             tgt_code = LANG_CODE_MAPPING.get(target_lang, target_lang)
            
#             translator = DeepGoogleTranslator(source=src_code, target=tgt_code)
#             translated = translator.translate(text)
            
#             if translated and translated.strip() != text.strip():
#                 print(f"✅ Deep Translator success: {translated}")
#                 return {
#                     'translated_text': translated,
#                     'source_language': source_lang,
#                     'confidence': 0.95,
#                     'method': 'deep_translator'
#                 }
                
#         except Exception as e:
#             print(f"❌ Deep Translator failed: {e}")
        
#         return {'translated_text': ''}

#     def _try_google_translate(self, text: str, source_lang: str, target_lang: str) -> Dict[str, Any]:
#         """Try Google Translate library"""
#         try:
#             # Create fresh translator for reliability
#             translator = GoogleTranslator()
            
#             result = translator.translate(text, src=source_lang, dest=target_lang)
            
#             if result and result.text and result.text.strip() != text.strip():
#                 print(f"✅ Google Translate success: {result.text}")
#                 return {
#                     'translated_text': result.text,
#                     'source_language': result.src,
#                     'confidence': 0.90,
#                     'method': 'google_translate'
#                 }
                
#         except Exception as e:
#             print(f"❌ Google Translate failed: {e}")
        
#         return {'translated_text': ''}

#     def _try_gemini_translate(self, text: str, source_lang: str, target_lang: str, context: str) -> Dict[str, Any]:
#         """Try Gemini AI translation"""
#         try:
#             source_name = LANGUAGES.get(source_lang, source_lang)
#             target_name = LANGUAGES.get(target_lang, target_lang)
            
#             prompt = f"""Translate this {source_name} text to {target_name}:

# "{text}"

# Return only the translation, no explanations."""
            
#             response = self.gemini_model.generate_content(prompt)
#             translated = response.text.strip()
            
#             # Clean response
#             if translated.startswith('"') and translated.endswith('"'):
#                 translated = translated[1:-1]
            
#             if translated and translated != text:
#                 print(f"✅ Gemini success: {translated}")
#                 return {
#                     'translated_text': translated,
#                     'source_language': source_lang,
#                     'confidence': 0.85,
#                     'method': 'gemini_ai'
#                 }
                
#         except Exception as e:
#             if "429" in str(e):
#                 print("⚠️ Gemini API quota exceeded")
#             else:
#                 print(f"❌ Gemini translation failed: {e}")
        
#         return {'translated_text': ''}

#     def _try_basic_translate(self, text: str, source_lang: str, target_lang: str) -> Dict[str, Any]:
#         """Try basic translate library"""
#         try:
#             translator = Translator(to_lang=target_lang)
#             result = translator.translate(text)
            
#             if result and result.strip() != text.strip():
#                 print(f"✅ Basic translate success: {result}")
#                 return {
#                     'translated_text': result,
#                     'source_language': source_lang,
#                     'confidence': 0.70,
#                     'method': 'basic_translate'
#                 }
                
#         except Exception as e:
#             print(f"❌ Basic translate failed: {e}")
        
#         return {'translated_text': ''}

#     def _empty_result(self, error_msg: str) -> Dict[str, Any]:
#         """Return empty result"""
#         return {
#             'translated_text': '',
#             'source_language': 'unknown',
#             'confidence': 0.0,
#             'method': 'none',
#             'error': error_msg
#         }

#     def _same_language_result(self, text: str, lang: str) -> Dict[str, Any]:
#         """Return same language result"""
#         return {
#             'translated_text': text,
#             'source_language': lang,
#             'confidence': 1.0,
#             'method': 'no_translation_needed'
#         }

#     def _failed_result(self, text: str, source_lang: str, target_lang: str) -> Dict[str, Any]:
#         """Return failed translation result"""
#         return {
#             'translated_text': f"[Translation failed: {text}]",
#             'source_language': source_lang,
#             'confidence': 0.0,
#             'method': 'failed',
#             'error': 'All translation methods failed'
#         }

# class EnhancedAudioProcessor:
#     """Enhanced audio processing with better noise handling"""
    
#     def __init__(self, translator):
#         self.translator = translator
#         self.is_recording = False
#         self.target_language = 'en'
#         self.context = 'aviation'
#         self.sensitivity = 0.5
        
#     def start_listening(self, target_lang='en', context='aviation', sensitivity=0.5):
#         """Start enhanced audio listening"""
#         if not USE_SPEECH:
#             socketio.emit('error', {'message': 'Speech recognition not available'})
#             return
            
#         self.target_language = target_lang
#         self.context = context
#         self.sensitivity = sensitivity
#         self.is_recording = True
        
#         try:
#             # Enhanced microphone setup
#             with microphone as source:
#                 # Adjust for ambient noise with longer duration for better accuracy
#                 recognizer.adjust_for_ambient_noise(source, duration=2)
                
#                 # Configure recognizer settings
#                 recognizer.energy_threshold = 1000 if sensitivity > 0.5 else 2000
#                 recognizer.dynamic_energy_threshold = True
#                 recognizer.pause_threshold = 0.8
#                 recognizer.phrase_threshold = 0.3
                
#             # Start listening thread
#             threading.Thread(target=self._listen_continuously, daemon=True).start()
            
#         except Exception as e:
#             socketio.emit('error', {'message': f'Microphone setup error: {str(e)}'})
            
#     def stop_listening(self):
#         """Stop audio listening"""
#         self.is_recording = False
        
#     def _listen_continuously(self):
#         """Enhanced continuous listening with better error handling"""
#         consecutive_errors = 0
#         max_errors = 5
        
#         while self.is_recording and consecutive_errors < max_errors:
#             try:
#                 with microphone as source:
#                     # Listen with timeout and phrase limits
#                     audio = recognizer.listen(
#                         source, 
#                         timeout=2, 
#                         phrase_time_limit=10
#                     )
                    
#                 # Process audio in separate thread
#                 threading.Thread(
#                     target=self._process_audio, 
#                     args=(audio,), 
#                     daemon=True
#                 ).start()
                
#                 consecutive_errors = 0  # Reset error counter on success
                    
#             except sr.WaitTimeoutError:
#                 # No audio detected, continue
#                 continue
#             except Exception as e:
#                 consecutive_errors += 1
#                 print(f"Listening error ({consecutive_errors}/{max_errors}): {e}")
#                 time.sleep(0.5)
                
#         if consecutive_errors >= max_errors:
#             socketio.emit('error', {'message': 'Too many audio errors, stopping listener'})
#             self.is_recording = False
                
#     def _process_audio(self, audio):
#         """Enhanced audio processing with better recognition"""
#         try:
#             text = None
            
#             # Primary: Google Speech Recognition
#             try:
#                 text = recognizer.recognize_google(audio)
#                 print(f"🎙️ Recognized speech: '{text}'")
#             except (sr.UnknownValueError, sr.RequestError) as e:
#                 print(f"Primary recognition failed: {e}")
#                 pass
            
#             # Fallback: Try with language hint
#             if not text and self.target_language != 'en':
#                 try:
#                     text = recognizer.recognize_google(audio, language=self.target_language)
#                     print(f"🎙️ Recognized with language hint: '{text}'")
#                 except (sr.UnknownValueError, sr.RequestError):
#                     pass
            
#             if text and len(text.strip()) > 0:
#                 print(f"🔄 Processing recognized text: '{text}'")
                
#                 # Enhanced translation
#                 translation_result = self.translator.translate_text(
#                     text, 
#                     target_lang=self.target_language,
#                     source_lang='auto',
#                     context=self.context
#                 )
                
#                 # Prepare result
#                 result = {
#                     'original_text': text,
#                     'translated_text': translation_result['translated_text'],
#                     'source_language': translation_result['source_language'],
#                     'target_language': self.target_language,
#                     'timestamp': datetime.now().isoformat(),
#                     'confidence': translation_result['confidence'],
#                     'method': translation_result['method'],
#                     'context': self.context
#                 }
                
#                 print(f"📤 Emitting result: {result}")
                
#                 # Emit results
#                 socketio.emit('speech_recognized', result)
#                 socketio.emit('translation_result', result)
                
#             else:
#                 print("No speech detected")
                
#         except sr.UnknownValueError:
#             print("No speech detected in audio")
#             pass
#         except sr.RequestError as e:
#             print(f"Speech recognition service error: {e}")
#             socketio.emit('error', {'message': f'Speech recognition service error: {str(e)}'})
#         except Exception as e:
#             print(f"Audio processing error: {e}")
#             socketio.emit('error', {'message': f'Audio processing error: {str(e)}'})

# # Initialize enhanced components
# translator = EnhancedTranslator()
# audio_processor = EnhancedAudioProcessor(translator)

# @app.route('/')
# def index():
#     """Main page"""
#     return render_template('index.html', languages=LANGUAGES)

# @app.route('/api/languages')
# def get_languages():
#     """Get supported languages"""
#     return jsonify(LANGUAGES)

# @app.route('/api/status')
# def get_status():
#     """Get enhanced system status"""
#     return jsonify({
#         'speech_available': USE_SPEECH,
#         'gemini_available': USE_GEMINI and translator.is_gemini_initialized,
#         'google_translate_available': USE_GOOGLE_TRANS,
#         'deep_translator_available': USE_DEEP_TRANSLATOR,
#         'basic_translate_available': USE_TRANSLATE_LIB,
#         'languages': list(LANGUAGES.keys()),
#         'translation_methods': ['deep_translator', 'google_translate', 'gemini_ai', 'basic_translate']
#     })

# @socketio.on('connect')
# def handle_connect():
#     """Handle client connection"""
#     print('👤 Client connected')
#     emit('status', {
#         'message': 'Connected to enhanced flight communication system',
#         'speech_available': USE_SPEECH,
#         'gemini_available': USE_GEMINI and translator.is_gemini_initialized,
#         'deep_translator_available': USE_DEEP_TRANSLATOR,
#         'google_translate_available': USE_GOOGLE_TRANS,
#         'translation_methods': ['deep_translator', 'google_translate', 'gemini_ai', 'basic_translate']
#     })

# @socketio.on('disconnect')
# def handle_disconnect():
#     """Handle client disconnection"""
#     print('👤 Client disconnected')
#     audio_processor.stop_listening()

# @socketio.on('start_listening')
# def handle_start_listening(data):
#     """Start enhanced audio listening"""
#     target_lang = data.get('language', 'en')
#     context = data.get('context', 'aviation')
#     sensitivity = data.get('sensitivity', 0.5)
    
#     print(f'🎙️ Starting enhanced listening: {target_lang} (context: {context})')
    
#     audio_processor.start_listening(target_lang, context, sensitivity)
#     emit('status', {
#         'message': f'Enhanced listening started for {LANGUAGES.get(target_lang, target_lang)}',
#         'listening': True,
#         'context': context
#     })

# @socketio.on('stop_listening')
# def handle_stop_listening():
#     """Stop audio listening"""
#     print('🛑 Stopping enhanced listening')
#     audio_processor.stop_listening()
#     emit('status', {
#         'message': 'Enhanced listening stopped',
#         'listening': False
#     })

# @socketio.on('translate_text')
# def handle_translate(data):
#     """Enhanced manual translation endpoint"""
#     try:
#         text = data.get('text', '').strip()
#         if not text:
#             emit('error', {'message': 'No text provided'})
#             return
            
#         target_lang = data.get('target_language', 'en')
#         source_lang = data.get('source_language', 'auto')
#         context = data.get('context', 'general')
        
#         print(f"🔄 Enhanced translation: '{text}' from {source_lang} to {target_lang} (context: {context})")
        
#         # Enhanced translation
#         translation_result = translator.translate_text(
#             text, 
#             target_lang=target_lang, 
#             source_lang=source_lang,
#             context=context
#         )
        
#         result = {
#             'original_text': text,
#             'translated_text': translation_result['translated_text'],
#             'source_language': translation_result['source_language'],
#             'target_language': target_lang,
#             'timestamp': datetime.now().isoformat(),
#             'confidence': translation_result['confidence'],
#             'method': translation_result['method'],
#             'context': context
#         }
        
#         emit('translation_result', result)
#         print(f"✅ Enhanced translation result: {result}")
        
#     except Exception as e:
#         error_msg = f'Enhanced translation error: {str(e)}'
#         print(f"❌ {error_msg}")
#         emit('error', {'message': error_msg})

# if __name__ == '__main__':
#     print("\n" + "="*60)
#     print("🛩️  FLIGHT COMMUNICATION APP STARTING")
#     print("="*60)
#     print(f"🎙️  Speech Recognition: {'✅ Available' if USE_SPEECH else '❌ Not Available'}")
#     print(f"🌐 Google Translate: {'✅ Available' if USE_GOOGLE_TRANS else '❌ Not Available'}")
#     print(f"🔄 Deep Translator: {'✅ Available' if USE_DEEP_TRANSLATOR else '❌ Not Available'}")
#     print(f"🤖 Gemini AI: {'✅ Available' if USE_GEMINI else '❌ Not Available'}")
#     print(f"📚 Basic Translate: {'✅ Available' if USE_TRANSLATE_LIB else '❌ Not Available'}")
#     print(f"🗣️  Supported Languages: {len(LANGUAGES)}")
#     print("="*60)
    
#     if not any([USE_GOOGLE_TRANS, USE_DEEP_TRANSLATOR, USE_GEMINI, USE_TRANSLATE_LIB]):
#         print("⚠️  WARNING: No translation libraries available!")
#         print("   Install with: pip install googletrans==4.0.0-rc1 deep-translator")
    
#     try:
#         socketio.run(app, debug=True, host='0.0.0.0', port=5000)
#     except KeyboardInterrupt:
#         print("\n🛑 Shutting down...")
   