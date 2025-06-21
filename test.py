import google.generativeai as genai
from flask import Flask, request, jsonify
import google.generativeai as genai






genai.configure(api_key="AIzaSyBabZps8wcWFhyOrWEai4mcPyKzaNvGIoA")
model = genai.GenerativeModel("gemini-2.5-pro")
models = genai.list_models()
print(models)

app = Flask(__name__)

@app.route("/", methods=["GET"])
def index():
    return "✅ Gemini translation webhook server is running!"

@app.route("/webhook", methods=["POST"])
def handle_webhook():
    payload = request.json
    if payload["type"] == "transcript":
        original = payload["text"]
        prompt = f"Translate this to English:\n\n{original}"
        response = model.generate_content(prompt)
        translation = response.text.strip()
        print(f"Original: {original}")
        print(f"Translated: {translation}")
        return jsonify({"translation": translation})
    return jsonify({"message": "Not a transcript type."})

if __name__ == "__main__":
    app.run(port=5000)
