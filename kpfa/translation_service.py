# translation_service.py
from deep_translator import GoogleTranslator

def translate_text(text, target_lang="en"):
    """
    Safely translate a given text to target_lang.
    Returns the original text if translation fails.
    """
    if not text or not target_lang or target_lang == "en":
        return text
    try:
        return GoogleTranslator(source="auto", target=target_lang).translate(text)
    except Exception:
        return text
