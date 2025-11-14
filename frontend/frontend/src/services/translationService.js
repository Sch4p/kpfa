// src/services/translationService.js
//import axios from "axios";

//const API_URL = "http://127.0.0.1:8000/api/translate/";

//export async function translateText(text, targetLang) {
//if (!text || !targetLang) return text;
 // try {
   // const response = await axios.post(API_URL, {
   //   text: text,
   //   target_lang: targetLang,
   // });
   // return response.data.translated_text || text;
  //} catch (error) {
  //  console.error("Translation failed:", error);
  //  return text;
 // }
//}

// src/utils/translator.js
// Temporary translation stub for development (no API calls)

export async function translateText(text, targetLang = 'en') {
  // Simply return text unchanged
  if (!text) return '';
  return text;
}

export async function translateBatch(texts = [], targetLang = 'en') {
  // Return list of texts unchanged
  if (!Array.isArray(texts)) return [];
  return texts;
}

export default {
  translateText,
  translateBatch,
};



