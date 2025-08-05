# filename: main.py
from fastapi import FastAPI, Request
from pydantic import BaseModel
from transformers import GPT2Tokenizer, GPT2LMHeadModel
import torch

app = FastAPI()

# Load model and tokenizer
tokenizer = GPT2Tokenizer.from_pretrained("gpt2")
model = GPT2LMHeadModel.from_pretrained("gpt2")
model.eval()

class DescriptionRequest(BaseModel):
    description: str

@app.post("/generate")
async def generate_legal_document(data: DescriptionRequest):
    description = data.description
    if not description.strip():
        return {"result": "⚠️ Please enter a brief description."}

    prompt = f"This legal document is an agreement for the following matter: {description}. The terms and conditions are as follows:\n"

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
    return {"result": result}
