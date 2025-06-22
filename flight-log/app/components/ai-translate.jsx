import React, { useState, useRef, useEffect } from 'react';
import { Mic, MicOff, X, Volume2, Languages, Loader2, ChevronDown, Check } from 'lucide-react';

export const SpeechTranslator = ({ isOpen, onClose }) => {
  const [isListening, setIsListening] = useState(false);
  const [originalText, setOriginalText] = useState('');
  const [translatedText, setTranslatedText] = useState('');
  const [targetLanguage, setTargetLanguage] = useState('es');
  const [elevenLabsApiKey, setElevenLabsApiKey] = useState(process.env.NEXT_PUBLIC_ELEVENLABS_API_KEY || '');
  const [isTranslating, setIsTranslating] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [error, setError] = useState('');
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const recognitionRef = useRef(null);
  const audioRef = useRef(null);
  const dropdownRef = useRef(null);

  const languages = [
    { code: 'en', name: 'English', flag: '🇺🇸' },
    { code: 'es', name: 'Spanish', flag: '🇪🇸' },
    { code: 'fr', name: 'French', flag: '🇫🇷' },
    { code: 'de', name: 'German', flag: '🇩🇪' },
    { code: 'it', name: 'Italian', flag: '🇮🇹' },
    { code: 'pt', name: 'Portuguese', flag: '🇵🇹' },
    { code: 'ru', name: 'Russian', flag: '🇷🇺' },
    { code: 'ja', name: 'Japanese', flag: '🇯🇵' },
    { code: 'ko', name: 'Korean', flag: '🇰🇷' },
    { code: 'zh', name: 'Chinese', flag: '🇨🇳' },
    { code: 'ar', name: 'Arabic', flag: '🇸🇦' },
    { code: 'hi', name: 'Hindi', flag: '🇮🇳' }
  ];

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  useEffect(() => {
    if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
      const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
      recognitionRef.current = new SpeechRecognition();
      recognitionRef.current.continuous = false;
      recognitionRef.current.interimResults = false;
      recognitionRef.current.lang = 'en-US';

      recognitionRef.current.onresult = (event) => {
        const transcript = event.results[0][0].transcript;
        setOriginalText(transcript);
        translateText(transcript);
      };

      recognitionRef.current.onend = () => {
        setIsListening(false);
      };

      recognitionRef.current.onerror = (event) => {
        console.error('Speech recognition error:', event.error);
        setError('Speech recognition error: ' + event.error);
        setIsListening(false);
      };

      recognitionRef.current.onstart = () => {
        console.log('Speech recognition started');
        setError('');
      };
    } else {
      setError('Speech recognition is not supported in this browser. Please use Chrome, Edge, or Safari.');
    }
  }, []);

  const translateText = async (text, targetLang = targetLanguage) => {
    if (!text.trim()) return;

    setIsTranslating(true);
    setError('');

    try {
      console.log('Translating text:', text, 'to language:', targetLang);

      const response = await fetch(`https://api.mymemory.translated.net/get?q=${encodeURIComponent(text)}&langpair=en|${targetLang}`);
      const data = await response.json();

      console.log('Translation response:', data);

      if (data.responseStatus === 200) {
        setTranslatedText(data.responseData.translatedText);
      } else {
        console.error('Translation failed:', data);
        setError(`Translation failed: ${data.responseDetails || 'Unknown error'}`);
      }
    } catch (err) {
      console.error('Translation error:', err);
      setError('Translation error: ' + err.message);
    } finally {
      setIsTranslating(false);
    }
  };

  const handleLanguageSelect = (languageCode) => {
    setTargetLanguage(languageCode);
    setIsDropdownOpen(false);
    
    // Re-translate if we have original text, using the new language code
    if (originalText) {
      translateText(originalText, languageCode);
    }
  };

  const startListening = () => {
    if (!('webkitSpeechRecognition' in window || 'SpeechRecognition' in window)) {
      setError('Speech recognition is not supported in this browser. Please use Chrome, Edge, or Safari.');
      return;
    }

    if (recognitionRef.current && !isListening) {
      setError('');
      setIsListening(true);
      try {
        recognitionRef.current.start();
      } catch (error) {
        console.error('Error starting speech recognition:', error);
        setError('Failed to start speech recognition. Please try again.');
        setIsListening(false);
      }
    }
  };

  const stopListening = () => {
    if (recognitionRef.current && isListening) {
      recognitionRef.current.stop();
      setIsListening(false);
    }
  };

  const speakTranslation = async () => {
    if (!translatedText) {
      setError('No translated text to speak');
      return;
    }

    if (!elevenLabsApiKey) {
      setError('ElevenLabs API key not found. Please set NEXT_PUBLIC_ELEVENLABS_API_KEY environment variable.');
      return;
    }

    setIsSpeaking(true);
    setError('');

    try {
      const response = await fetch('https://api.elevenlabs.io/v1/text-to-speech/21m00Tcm4TlvDq8ikWAM', {
        method: 'POST',
        headers: {
          'Accept': 'audio/mpeg',
          'Content-Type': 'application/json',
          'xi-api-key': elevenLabsApiKey
        },
        body: JSON.stringify({
          text: translatedText,
          model_id: 'eleven_monolingual_v1',
          voice_settings: {
            stability: 0.5,
            similarity_boost: 0.5
          }
        })
      });

      if (!response.ok) {
        throw new Error('ElevenLabs API error');
      }

      const audioBlob = await response.blob();
      const audioUrl = URL.createObjectURL(audioBlob);

      if (audioRef.current) {
        audioRef.current.src = audioUrl;
        audioRef.current.play();
      }
    } catch (err) {
      setError('Speech synthesis error: ' + err.message);
    } finally {
      setIsSpeaking(false);
    }
  };

  const resetTexts = () => {
    setOriginalText('');
    setTranslatedText('');
    setError('');
  };

  const getSelectedLanguage = () => {
    return languages.find(lang => lang.code === targetLanguage);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 p-4 pointer-events-none">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md p-6 relative pointer-events-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-2">
            <Languages className="w-6 h-6 text-blue-600" />
            <h2 className="text-xl font-bold text-gray-800">Speech Translator</h2>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
          >
            <X className="w-5 h-5 text-gray-500" />
          </button>
        </div>

        {/* Browser Support Check */}
        {!('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) && (
          <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg">
            <p className="text-red-600 text-sm">Speech recognition not supported in this browser</p>
          </div>
        )}

        {/* Custom Language Selection */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Target Language
          </label>
          <div className="relative" ref={dropdownRef}>
            <button
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white text-left flex items-center justify-between hover:bg-gray-50 transition-colors"
            >
              <div className="flex items-center space-x-2">
                <span className="text-lg">{getSelectedLanguage()?.flag}</span>
                <span className="text-gray-800">{getSelectedLanguage()?.name}</span>
              </div>
              <ChevronDown className={`w-4 h-4 text-gray-500 transition-transform ${isDropdownOpen ? 'rotate-180' : ''}`} />
            </button>
            
            {isDropdownOpen && (
              <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-gray-300 rounded-lg shadow-lg z-10 max-h-60 overflow-y-auto">
                {languages.map((lang) => (
                  <button
                    key={lang.code}
                    onClick={() => handleLanguageSelect(lang.code)}
                    className="w-full px-3 py-2 text-left hover:bg-blue-50 flex items-center justify-between transition-colors"
                  >
                    <div className="flex items-center space-x-2">
                      <span className="text-lg">{lang.flag}</span>
                      <span className="text-gray-800">{lang.name}</span>
                    </div>
                    {targetLanguage === lang.code && (
                      <Check className="w-4 h-4 text-blue-600" />
                    )}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Recording Button */}
        <div className="flex justify-center mb-4">
          <button
            onClick={isListening ? stopListening : startListening}
            disabled={!('webkitSpeechRecognition' in window || 'SpeechRecognition' in window)}
            className={`p-4 rounded-full transition-all duration-200 ${isListening
                ? 'bg-red-500 hover:bg-red-600 animate-pulse'
                : !('webkitSpeechRecognition' in window || 'SpeechRecognition' in window)
                  ? 'bg-gray-400 cursor-not-allowed'
                  : 'bg-blue-500 hover:bg-blue-600'
              } text-white shadow-lg hover:shadow-xl transform hover:scale-105`}
          >
            {isListening ? (
              <MicOff className="w-8 h-8" />
            ) : (
              <Mic className="w-8 h-8" />
            )}
          </button>
        </div>

        {/* Status Text */}
        <div className="text-center mb-4">
          {isListening && (
            <p className="text-blue-600 font-medium">Listening...</p>
          )}
          {isTranslating && (
            <div className="flex items-center justify-center space-x-2">
              <Loader2 className="w-4 h-4 animate-spin" />
              <p className="text-gray-600">Translating...</p>
            </div>
          )}
        </div>

        {/* Text Display */}
        {originalText && (
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Original Text
            </label>
            <div className="p-3 bg-blue-50 border border-blue-200 rounded-lg">
              <p className="text-gray-800">{originalText}</p>
            </div>
          </div>
        )}

        {translatedText && (
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Translated Text
            </label>
            <div className="p-3 bg-green-50 border border-green-200 rounded-lg">
              <p className="text-gray-800">{translatedText}</p>
            </div>
          </div>
        )}

        {/* Action Buttons */}
        <div className="flex space-x-2 mb-4">
          <button
            onClick={speakTranslation}
            disabled={!translatedText || isSpeaking}
            className="flex-1 flex items-center justify-center space-x-2 px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors"
          >
            {isSpeaking ? (
              <Loader2 className="w-4 h-4 animate-spin" />
            ) : (
              <Volume2 className="w-4 h-4" />
            )}
            <span>{isSpeaking ? 'Speaking...' : 'Speak'}</span>
          </button>

          <button
            onClick={resetTexts}
            className="px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors"
          >
            Clear
          </button>
        </div>

        {/* Error Display */}
        {error && (
          <div className="p-3 bg-red-50 border border-red-200 rounded-lg">
            <p className="text-red-700 text-sm">{error}</p>
          </div>
        )}

        {/* Instructions */}
        <div className="text-xs text-gray-500 text-center">
          Click the microphone to start recording your speech
        </div>

        {/* Hidden Audio Element */}
        <audio ref={audioRef} style={{ display: 'none' }} />
      </div>
    </div>
  );
};

export default SpeechTranslator;