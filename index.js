const { Client, LocalAuth } = require('whatsapp-web.js');
const fs = require('fs');

// Path where the session data will be stored
const SESSION_FILE_PATH = './session.json';

// Load the session data if it has been previously saved
let sessionData;
if (fs.existsSync(SESSION_FILE_PATH)) {
    sessionData = require(SESSION_FILE_PATH);
}

// Create a client with LocalAuth for session persistence
const client = new Client({
    authStrategy: new LocalAuth({
        sessionData: sessionData // Pass the loaded session data
    })
});

// Save session values to the file upon successful auth
client.on('authenticated', (session) => {
    sessionData = session;
    fs.writeFile(SESSION_FILE_PATH, JSON.stringify(session), (err) => {
        if (err) {
            console.error(err);
        }
    });
});

// Listen for the QR code and authenticate
client.on('qr', (qr) => {
    console.log('Scan this QR code with your phone:', qr);
});

// Listen for the client to be ready
client.on('ready', () => {
    console.log('Client is ready!');
});

// Initialize the client
client.initialize();
