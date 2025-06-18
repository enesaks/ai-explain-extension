# AI Explain – Smart Text Explain Extension

AI Explain is a lightweight Chrome extension that allows you to highlight any text on any website and get a short AI-generated explanation with a single click.

---

## 📦 How It Works

1. Highlight any text in your browser.
2. A ❓ icon appears next to the selection.
3. Click it to open a popup window.
4. The popup fetches a response from an AI model via OpenRouter.
5. You can read and copy the explanation.

---

## 🤖 AI Model Used (Free)

This extension uses the **[DeepSeek V3-0324 (Free)](https://openrouter.ai/deepseek/deepseek-chat-v3-0324:free/api)** model via [OpenRouter](https://openrouter.ai).

- ✅ Free to use (no credit card required)
- 🧠 Provides helpful responses to short prompts
- 🌐 Works well for quick concept summaries

You can change the model to a **premium** option (e.g., GPT-4, Claude, Mixtral) by updating the `model` field in `content.js` to improve accuracy and tone.

---

## 🛠️ Customizing the Prompt

In the API request, the `messages` section determines how the AI responds:

```json
"messages": [
  { "role": "system", "content": "You are a helpful assistant." },
  { "role": "user", "content": "Briefly and clearly explain: [SELECTED TEXT]" }
]

## ⚙️ Tech Stack

- Vanilla JavaScript
- Chrome Manifest v3
- OpenRouter AI API
- No external libraries

## 🔐 Requirements

To run this extension, you need an OpenRouter API key.

1. Register at [https://openrouter.ai](https://openrouter.ai)
2. Create a free API key
3. Replace the placeholder in `content.js`:
```javascript
Authorization: "Bearer YOUR_API_KEY_HERE"
