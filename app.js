// app.js
const express = require('express');
const bodyParser = require('body-parser');
const QRCode = require('qrcode');

const app = express();
const PORT = process.env.PORT || 3000;

// Set EJS as the templating engine
app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

// Render the main page
app.get('/', (req, res) => {
    res.render('index', { qrCode: null });
});

// Handle form submission to generate QR code
app.post('/generate', (req, res) => {
    const text = req.body.text;
    QRCode.toDataURL(text, (err, url) => {
        if (err) {
            return res.send("Error occurred while generating QR code.");
        }
        res.render('index', { qrCode: url });
    });
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});