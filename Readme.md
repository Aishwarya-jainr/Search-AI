# GenAI Terminal Assistant  
A lightweight AI assistant that runs **entirely from your terminal**.  
It uses **Google Gemini** for reasoning + conversation and **Tavily Search API** for real-time web results.

This lets you ask **current, factual, up-to-date questions**, and the assistant combines:
- LLM reasoning  
- Live web lookup  
- Clean terminal output  

---

## 🚀 Features
- ✅ Terminal-based AI chat  
- ✅ Real-time information using Tavily Search  
- ✅ Google Gemini for high-quality reasoning  
- ✅ Works with ANY query — news, facts, summaries, coding, etc.  
- ✅ Minimal dependencies  
- ✅ Clean, simple CLI workflow  

---

## 📦 Tech Stack
- **Node.js** (or Python — whatever you're using)  
- **Google Gemini API**  
- **Tavily Search API**  
- **dotenv** for env variables  

---

## 🔧 Installation

1. Clone the project:

```bash
git clone <your-repo-url>
cd <project-folder>

2. Install dependencies:

npm install

3. Create a .env file in the root:
GEMINI_API_KEY=your_api_key_here
TAVILY_API_KEY=your_api_key_here
You MUST have valid keys for both services.

## ▶️ How to Run

From the project root:
node index.js

You are all set -> ask anything and your output is ready 