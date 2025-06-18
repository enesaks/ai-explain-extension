document.addEventListener("mouseup", (e) => {
    const selectedText = window.getSelection().toString().trim();

    if (selectedText.length > 0) {
        const mouseX = e.pageX;
        const mouseY = e.pageY;
        showIconNearSelection(mouseX, mouseY, selectedText);
    }
});

function showIconNearSelection(x, y, selectedText) {
    removeExistingIcon();

    const icon = document.createElement("div");
    icon.textContent = "❓";
    icon.style.position = "absolute";
    icon.style.left = `${x + 10}px`;
    icon.style.top = `${y + 10}px`;
    icon.style.fontSize = "20px";
    icon.style.background = "#000";
    icon.style.color = "#fff";
    icon.style.border = "1px solid #ccc";
    icon.style.borderRadius = "50%";
    icon.style.width = "24px";
    icon.style.height = "24px";
    icon.style.display = "flex";
    icon.style.alignItems = "center";
    icon.style.justifyContent = "center";
    icon.style.cursor = "pointer";
    icon.style.zIndex = 9999;
    icon.style.boxShadow = "0 1px 4px rgba(0,0,0,0.3)";

    icon.addEventListener("mousedown", async (e) => {
        e.preventDefault();

        const { popup, contentBox, copyButton } = createPopup(x + 10, y + 40, "Loading...");

        setTimeout(() => {
            const clickListener = (event) => {
                if (!popup.contains(event.target) && event.target !== icon) {
                    popup.remove();
                    removeExistingIcon();
                    document.removeEventListener("mousedown", clickListener);
                }
            };
            document.addEventListener("mousedown", clickListener);
        }, 50);

        const explanation = await getExplanation(selectedText);
        contentBox.textContent = explanation;
        copyButton.style.display = "inline";

        copyButton.onclick = () => {
            navigator.clipboard.writeText(explanation);
            copyButton.textContent = "✅";
            setTimeout(() => copyButton.textContent = "📄", 1500);
        };
    });

    icon.id = "ai-explain-icon";
    document.body.appendChild(icon);

    setTimeout(() => {
        const dismissIcon = (event) => {
            const iconEl = document.getElementById("ai-explain-icon");
            if (iconEl && event.target !== iconEl) {
                iconEl.remove();
            }
            document.removeEventListener("mousedown", dismissIcon);
        };
        document.addEventListener("mousedown", dismissIcon, { once: true });
    }, 10);
}

function removeExistingIcon() {
    const existing = document.getElementById("ai-explain-icon");
    if (existing) existing.remove();
}

function createPopup(x, y, initialText) {
    const popup = document.createElement("div");
    popup.style.position = "absolute";
    popup.style.left = `${x}px`;
    popup.style.top = `${y}px`;
    popup.style.padding = "12px 16px 8px";
    popup.style.background = "#111";
    popup.style.color = "#fff";
    popup.style.border = "1px solid #333";
    popup.style.borderRadius = "12px";
    popup.style.boxShadow = "0 4px 12px rgba(0, 0, 0, 0.5)";
    popup.style.zIndex = 99999;
    popup.style.maxWidth = "320px";
    popup.style.fontFamily = `"Segoe UI", Roboto, Helvetica, Arial, sans-serif`;
    popup.style.fontSize = "15px";
    popup.style.lineHeight = "1.5";
    popup.style.wordWrap = "break-word";
    popup.style.opacity = "0";
    popup.style.transition = "opacity 0.3s ease";

    const contentBox = document.createElement("div");
    contentBox.className = "popup-content";
    contentBox.textContent = initialText;
    contentBox.style.maxHeight = "180px";
    contentBox.style.overflowY = "auto";
    contentBox.style.paddingRight = "4px";

    const copyButton = document.createElement("button");
    copyButton.textContent = "📄";
    copyButton.title = "Copy";
    copyButton.style.marginTop = "10px";
    copyButton.style.background = "transparent";
    copyButton.style.color = "#fff";
    copyButton.style.border = "none";
    copyButton.style.cursor = "pointer";
    copyButton.style.fontSize = "20px";
    copyButton.style.display = "none";

    const styleTag = document.createElement("style");
    styleTag.textContent = `
        .popup-content::-webkit-scrollbar {
            width: 6px;
        }
        .popup-content::-webkit-scrollbar-track {
            background: #222;
            border-radius: 8px;
        }
        .popup-content::-webkit-scrollbar-thumb {
            background-color: #555;
            border-radius: 8px;
        }
        .popup-content::-webkit-scrollbar-thumb:hover {
            background-color: #777;
        }
    `;
    document.head.appendChild(styleTag);

    popup.appendChild(contentBox);
    popup.appendChild(copyButton);
    document.body.appendChild(popup);

    setTimeout(() => {
        popup.style.opacity = "1";
    }, 10);

    return { popup, contentBox, copyButton };
}

async function getExplanation(text) {
    const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
        method: "POST",
        headers: {
            // ⛔ IMPORTANT: Insert your OpenRouter API key below
            // Example: Authorization: "Bearer sk-or-xxxxxxxxxxxxxxxx"
            Authorization: "Bearer YOUR_API_KEY_HERE",
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            model: "mistralai/mistral-7b-instruct",
            messages: [
                {
                    role: "user",
                    content: `Briefly explain this concept in a clear and simple way: ${text}`
                }
            ]
        })
    });

    const data = await response.json();
    return data?.choices?.[0]?.message?.content || "No response.";
}