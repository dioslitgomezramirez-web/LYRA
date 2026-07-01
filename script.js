const API_URL = "/chat";

async function sendMessage() {
    const inputField = document.getElementById("user-input");
    const message = inputField.value.trim();

    if (!message) return;

    addMessageToChat(message, "user-message");
    inputField.value = "";

    const loadingId = addMessageToChat("Escribiendo respuesta...", "bot-message");

    try {
        const response = await fetch(API_URL, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ message })
        });

        const data = await response.json();
        document.getElementById(loadingId)?.remove();

        if (!response.ok) {
            console.error("Respuesta no válida del servidor:", data);
            addMessageToChat(data.response || "Error interno del servidor.", "bot-message error");
            return;
        }

        const botText = data.response
            || data.candidates?.[0]?.content?.[0]?.text
            || data.candidates?.[0]?.content?.parts?.[0]?.text
            || "No se recibió respuesta del asistente.";

        addMessageToChat(botText, "bot-message");
    } catch (error) {
        document.getElementById(loadingId)?.remove();
        addMessageToChat("No pude conectarme al servidor. Verifica la conexión.", "bot-message error");
        console.error(error);
    }
}

function addMessageToChat(text, className) {
    const chatBox = document.getElementById("chat-box");
    const messageDiv = document.createElement("div");

    messageDiv.className = `message ${className}`;
    messageDiv.innerHTML = text.replace(/\n/g, "<br>");
    messageDiv.id = "msg-" + Date.now();

    chatBox.appendChild(messageDiv);
    chatBox.scrollTop = chatBox.scrollHeight;

    return messageDiv.id;
}

function handleKeyPress(event) {
    if (event.key === "Enter") {
        sendMessage();
    }
} 