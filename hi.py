from deep_translator import GoogleTranslator

# auto‐detect source, translate to English
translation = GoogleTranslator(source='auto', target='en').translate(
    "coucou comment allez vous"
)
print("Translated:", translation)
