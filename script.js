async function sendMessage() {

    const inputField = document.getElementById("user-input");
    const message = inputField.value.trim();

    if (message === "") return;

    addMessageToChat(message, "user-message");

    inputField.value = "";

    const loadingId = addMessageToChat(
        "Escribiendo...",
        "bot-message"
    );

    try {

        const response = await fetch(
            "http://localhost:3000/chat",
            {
                method: "POST",

                headers: {
                    "Content-Type": "application/json"
                },

                body: JSON.stringify({
                    message: message
                })

            }
        );

        const data = await response.json();

        document.getElementById(loadingId).remove();

        addMessageToChat(
            data.response,
            "bot-message"
        );

    } catch (error) {

        document.getElementById(loadingId).remove();

        addMessageToChat(
            "No pude conectarme al servidor.",
            "bot-message"
        );

        console.error(error);

    }

}

function addMessageToChat(text, className) {

    const chatBox = document.getElementById("chat-box");

    const messageDiv = document.createElement("div");

    messageDiv.className = `message ${className}`;

    messageDiv.innerHTML = text.replace(/\n/g, "<br>");

    const uniqueId = "msg-" + Date.now();

    messageDiv.id = uniqueId;

    chatBox.appendChild(messageDiv);

    chatBox.scrollTop = chatBox.scrollHeight;

    return uniqueId;

}

function handleKeyPress(event) {

    if (event.key === "Enter") {

        sendMessage();

    }

}