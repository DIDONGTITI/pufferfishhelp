// Initialize Firebase
const firebaseConfig = {
    apiKey: "your-api-key",
    authDomain: "your-auth-domain",
    projectId: "your-project-id",
    storageBucket: "your-storage-bucket",
    messagingSenderId: "your-messaging-sender-id",
    appId: "your-app-id"
};
const app = firebase.initializeApp(firebaseConfig);
const db = firebase.firestore(app);
const messagesRef = db.collection("messages");

// Display messages in real-time
const messagesDiv = document.getElementById('messages');

function loadMessages() {
    messagesRef.orderBy("timestamp").onSnapshot(snapshot => {
        messagesDiv.innerHTML = ''; // Clear existing messages
        snapshot.forEach(doc => {
            const messageElement = document.createElement('p');
            messageElement.textContent = doc.data().text;
            messagesDiv.appendChild(messageElement);
        });
    });
}

// Send a message
function sendMessage() {
    const messageInput = document.getElementById('message');
    const message = messageInput.value;

    if (message) {
        messagesRef.add({
            text: message,
            timestamp: firebase.firestore.FieldValue.serverTimestamp()
        }).then(() => {
            messageInput.value = ''; // Clear input field
        });
    }
}

// Load messages on page load
loadMessages();
