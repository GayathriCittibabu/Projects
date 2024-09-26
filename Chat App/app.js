const vionaSelectorBtn = document.querySelector('#viona-selector');
const girikSelectorBtn = document.querySelector('#girik-selector');
const chatHeader = document.querySelector('.chat-header');
const chatMessages = document.querySelector('.chat-messages');
const chatInputForm = document.querySelector('.chat-input-form');
const chatInput = document.querySelector('.chat-input');
const clearChatButton = document.querySelector('.clear-chat-button');

// Initialize messages from localStorage or as an empty array
const messages = JSON.parse(localStorage.getItem('messages')) || [];

// Function to create a chat message element
const createChatMessageElement = (message) => `
    <div class="message ${message.sender === 'Viona' ? 'blue-bg' : 'gray-bg'}">
        <div class="message-sender">${message.sender}</div>
        <div class="message-text">${message.text}</div>
        <div class="message-timestamp">${message.timestamp}</div>
    </div>
`;

// Load and display messages on page load
window.onload = () => {
    messages.forEach((message) => {
        chatMessages.innerHTML += createChatMessageElement(message);
    });
};

// Set default message sender
let messageSender = 'Viona';

// Function to update the message sender
const updateMessageSender = (name) => {
    messageSender = name;
    chatHeader.innerHTML = `${messageSender} chatting...`;
    chatInput.placeholder = `Type here, ${messageSender}`;
    
    if (name === 'Viona') {
        vionaSelectorBtn.classList.add('active-person');
        girikSelectorBtn.classList.remove('active-person');
    } else if (name === 'Girik') {
        girikSelectorBtn.classList.add('active-person');
        vionaSelectorBtn.classList.remove('active-person');
    }
    chatInput.focus();
};

// Event listeners for selector buttons
vionaSelectorBtn.onclick = () => updateMessageSender('Viona');
girikSelectorBtn.onclick = () => updateMessageSender('Girik');

// Function to handle sending messages
const sendMessage = (e) => {
    e.preventDefault();

    const timestamp = new Date().toLocaleString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true });
    const message = {
        sender: messageSender,
        text: chatInput.value,
        timestamp,
    };

    messages.push(message); // Add the new message to the messages array
    localStorage.setItem('messages', JSON.stringify(messages)); // Update localStorage
    chatMessages.innerHTML += createChatMessageElement(message); // Display the new message

    chatInputForm.reset(); // Clear the input field
    chatMessages.scrollTop = chatMessages.scrollHeight; // Scroll to the bottom of the chat
};

// Event listener for sending messages
chatInputForm.addEventListener('submit', sendMessage);

// Event listener for clearing chat
clearChatButton.addEventListener('click', () => {
    localStorage.removeItem('messages'); // Remove specific item, not everything
    chatMessages.innerHTML = ''; // Clear the chat display
});
