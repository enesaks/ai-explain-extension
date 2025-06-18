# AI Explain – Smart Text Highlighter Extension

AI Explain is a lightweight Chrome extension that allows you to highlight any text on any website and get a short AI-generated explanation with a single click.

## ✨ Features

- ⚡ Select any text on the web
- ❓ A floating icon appears next to the selection
- 💬 Click the icon to get an instant explanation via AI
- 📄 Copy the response with one click
- 🧠 Powered by Mistral 7B via OpenRouter API
- 🌙 Clean dark theme & modern scrollbars
- 🚫 Automatically disappears when clicking outside

## 📦 How It Works

1. Highlight any text in your browser.
2. A ❓ icon appears next to the selection.
3. Click it to open a popup window.
4. The popup fetches a response from an AI model via OpenRouter.
5. You can read and copy the explanation.

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