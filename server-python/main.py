from flask import Flask, request, jsonify
from transformers import GPT2Tokenizer, GPT2LMHeadModel
import torch

app = Flask(__name__)

# Load model and tokenizer
tokenizer = GPT2Tokenizer.from_pretrained("gpt2")
model = GPT2LMHeadModel.from_pretrained("gpt2")
model.eval()

# / get method
@app.route("/", methods=["GET"])
def home():
    return jsonify({"message": "Welcome to the Legal Document Generator API. Use POST /generate with a JSON body containing 'description'."})

@app.route("/generate", methods=["POST"])
def generate_legal_document():
    data = request.get_json()
    description = data.get("description", "").strip()

    if not description:
        return jsonify({"result": "⚠️ Please enter a brief description."})

    prompt = f"{description}"
    input_ids = tokenizer.encode(prompt, return_tensors='pt')

    with torch.no_grad():
        output = model.generate(
            input_ids,
            max_length=400,
            temperature=0.8,
            top_k=50,
            top_p=0.95,
            num_return_sequences=1,
            no_repeat_ngram_size=3,
            early_stopping=True
        )

    result = tokenizer.decode(output[0], skip_special_tokens=True)
    return jsonify({"result": result})

if __name__ == "__main__":
    app.run(debug=True, port=8000)
