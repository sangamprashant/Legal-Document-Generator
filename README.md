# 📄 AI Document Generator

This project is a **multi-service application** that takes case information and generates documents using an AI model hosted on a Python server. It consists of a **React frontend**, an **Express.js API layer**, and a **Python-based AI generation service**.

---

## 🚀 Architecture Overview

```plaintext
React Frontend ➝ Express API (/generate-doc)
    └── Express fetches case info (from DB or frontend)
    └── Prepares prompt
    └── Calls Python Server POST /generate
           └── Python generates and returns document text
    └── Express returns final content to frontend
```

---

## 🛠 Tech Stack

### **Frontend**

* React (Vite / CRA)
* Axios for API calls
* Tailwind CSS / Bootstrap (optional)

### **Backend API**

* Node.js + Express
* MongoDB (optional – for case info storage)
* REST API endpoints

### **AI Service**

* Python (Flask or FastAPI)
* Pre-trained AI Model (e.g., GPT-2 or custom fine-tuned)
* HuggingFace Transformers / PyTorch

---

## 📂 Project Structure

```
root/
│
├── frontend/        # React app
├── server/          # Express API
└── server-python/   # Python AI server
```

---

## ⚙️ Setup & Installation

### 1️⃣ Clone the Repository

```bash
git clone https://github.com/yourusername/ai-document-generator.git
cd ai-document-generator
```

### 2️⃣ Install Frontend Dependencies

```bash
cd frontend
npm install
```

### 3️⃣ Install Backend (Express) Dependencies

```bash
cd ../server
npm install
```

### 4️⃣ Install Python Server Dependencies

```bash
cd ../server-python
pip install -r requirements.txt
```

---

## ▶️ Running the Application

**Start Python AI Server**

```bash
cd server-python
python app.py
```

**Start Express API**

```bash
cd server
npm start
```

**Start React Frontend**

```bash
cd frontend
npm run dev
```

---

## 🔄 Workflow

1. **Frontend** sends `/generate-doc` request to **Express API**.
2. **Express** retrieves case info (either from DB or passed data).
3. API constructs an AI prompt and sends it to **Python Server**.
4. **Python Server** runs AI model, generates document text, and returns it.
5. **Express** sends the final generated document back to the **frontend** for display.

---

## 📌 Example API Flow

**Frontend ➝ Express**

```js
await axios.post('/generate-doc', { caseId: "123" });
```

**Express ➝ Python**

```python
POST /generate
{
  "prompt": "Case details: ..."
}
```

**Python ➝ Express ➝ Frontend**

```json
{
  "document": "Generated legal document text..."
}
```

---
