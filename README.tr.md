🌍 Language: [English](README.md) | [Türkçe](README.tr.md)
# AI Explain – Akıllı Metin Açıklama Eklentisi

AI Explain, herhangi bir web sitesinde metin seçerek tek tıklamayla yapay zekâ tarafından oluşturulmuş kısa bir açıklama almanızı sağlayan hafif bir Chrome uzantısıdır.

---
![Görsel](https://github.com/user-attachments/assets/6f538ff5-7dcd-40d6-b5a6-d4d5ef3dd6f3)

## 📦 Nasıl Çalışır?

1. Tarayıcınızda herhangi bir metni seçin.
2. Seçilen metnin yanında ❓ simgesi belirir.
3. Bu simgeye tıklayın, küçük bir pencere açılır.
4. Açılan pencere, OpenRouter üzerinden bir yapay zekâ modelinden yanıt alır.
5. Açıklamayı okuyabilir ve tek tıkla kopyalayabilirsiniz.

---

## 🤖 Kullanılan Yapay Zekâ Modeli (Ücretsiz)

Bu uzantı, [OpenRouter](https://openrouter.ai) aracılığıyla **[DeepSeek V3-0324 (Free)](https://openrouter.ai/deepseek/deepseek-chat-v3-0324:free/api)** modelini kullanmaktadır.

- ✅ Ücretsizdir (kredi kartı gerekmez)
- 🧠 Kısa ve anlamlı yanıtlar üretir
- 🌐 Kavramların hızlı açıklanmasında başarılıdır

İsterseniz `content.js` içindeki `model` alanını değiştirerek **GPT-4, Claude, Mixtral** gibi ücretli ve daha güçlü modelleri kullanabilirsiniz.

---

## 🛠️ Promt'u Özelleştirme

Yapay zekâya gönderilen istekte `messages` bölümü, cevabın nasıl olacağını belirler:

```json
"messages": [
  { "role": "system", "content": "You are a helpful assistant." },
  { "role": "user", "content": "Briefly and clearly explain: [SELECTED TEXT]" }
]
```
Bu kısmı kendi kullanımınıza göre teknik, eğlenceli veya uzun açıklamalı şekilde değiştirebilirsiniz.

---

## ⚙️ Teknolojiler

- Vanilla JavaScript
- Chrome Manifest v3
- OpenRouter AI API
- Harici kütüphane kullanılmaz


---


## 🔐 Gereksinimler

Bu uzantıyı çalıştırmak için bir OpenRouter API anahtarına ihtiyacınız vardır:

1.  https://openrouter.ai adresine kaydolun
2.	Ücretsiz bir API anahtarı oluşturun
3.	content.js dosyasında şu satırı değiştirin:
```javascript
Authorization: "Bearer YOUR_API_KEY_HERE"
```
