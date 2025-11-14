from rest_framework.views import exception_handler
import requests

def custom_exception_handler(exc, context):
    response = exception_handler(exc, context)
    if response is not None:
        user_lang = context['request'].query_params.get('lang', 'en')
        for key, messages in response.data.items():
            translated_msgs = []
            for msg in messages:
                translate = requests.post(
                    "http://127.0.0.1:8000/api/translate/",
                    json={"text": msg, "target_lang": user_lang}
                )
                if translate.status_code == 200:
                    translated_msgs.append(translate.json()['translated_text'])
                else:
                    translated_msgs.append(msg)
            response.data[key] = translated_msgs
    return response
