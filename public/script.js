const chatContainer = document.getElementById("chatContainer");
const floatingChat = document.getElementById("floatingChat");
const messageInput = document.getElementById("messageInput");
const chatMessages = document.getElementById("chatMessages");


// Create one session ID for this browser conversation
const sessionId = "foodiehub-" + Date.now();


function openChat() {
    chatContainer.style.display = "flex";
    floatingChat.style.display = "none";

    messageInput.focus();
}


function closeChat() {
    chatContainer.style.display = "none";
    floatingChat.style.display = "block";
}


function addMessage(message, type) {

    const messageDiv = document.createElement("div");

    messageDiv.classList.add("message");

    if (type === "user") {
        messageDiv.classList.add("user-message");
    } else {
        messageDiv.classList.add("bot-message");
    }


    const label = document.createElement("div");

    label.classList.add("message-label");

    label.textContent =
        type === "user" ? "You" : "FoodieHub";


    const text = document.createElement("div");

    text.classList.add("message-text");

    text.textContent = message;


    messageDiv.appendChild(label);
    messageDiv.appendChild(text);

    chatMessages.appendChild(messageDiv);


    chatMessages.scrollTop = chatMessages.scrollHeight;
}


async function sendMessage() {

    const message = messageInput.value.trim();

    if (!message) {
        return;
    }


    // Display user's message
    addMessage(message, "user");

    messageInput.value = "";


    try {

        const response = await fetch("/chat", {

            method: "POST",

            headers: {
                "Content-Type": "application/json"
            },

            body: JSON.stringify({
                message: message,
                sessionId: sessionId
            })

        });


        const data = await response.json();


        // Display bot response
        addMessage(data.reply, "bot");


    } catch (error) {

        console.error(error);

        addMessage(
            "Sorry, I couldn't connect to FoodieHub right now.",
            "bot"
        );
    }
}


// Press Enter to send
messageInput.addEventListener("keydown", function(event) {

    if (event.key === "Enter") {
        sendMessage();
    }

});