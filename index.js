const fs = require('fs');
const { Client } = require('whatsapp-web.js');
const qrcode = require('qrcode-terminal');

const SESSION_FILE_PATH = './session.json';
let sessionData;

// Load the session data if it has been previously saved
if (fs.existsSync(SESSION_FILE_PATH)) {
    sessionData = require(SESSION_FILE_PATH);
}

const client = new Client({ 
    session: sessionData 
});

client.on('qr', qr => {
    qrcode.generate(qr, { small: true });
    console.log('Please scan the QR code with your phone.');
});

client.on('authenticated', (session) => {
    sessionData = session;
    fs.writeFile(SESSION_FILE_PATH, JSON.stringify(session), (err) => {
        if (err) {
            console.error(err);
        } else {
            console.log('Session data is saved successfully!');
        }
    });
});

client.initialize();
