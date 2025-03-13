from deep_translator import GoogleTranslator

def from_fr_to_en(french_words):
    translator = GoogleTranslator(source='fr', target='en')
    translations = {}

    for word in french_words:
        translations[word] = translator.translate(word)

    return translations