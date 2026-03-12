const express = require('express');
const { GoogleSpreadsheet } = require('google-spreadsheet');
const path = require('path');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname))); // Serve static files from current directory

// Google Sheets configuration
const SHEET_ID = process.env.GOOGLE_SHEET_ID || 'YOUR_SHEET_ID_HERE';
const SERVICE_ACCOUNT_EMAIL = process.env.SERVICE_ACCOUNT_EMAIL || 'YOUR_SERVICE_ACCOUNT_EMAIL';
const PRIVATE_KEY = process.env.PRIVATE_KEY || 'YOUR_PRIVATE_KEY';

// Initialize Google Sheets
async function initSheet() {
    try {
        const doc = new GoogleSpreadsheet(SHEET_ID);
        
        await doc.useServiceAccountAuth({
            client_email: SERVICE_ACCOUNT_EMAIL,
            private_key: PRIVATE_KEY,
        });
        
        await doc.loadInfo();
        console.log('Loaded sheet:', doc.title);
        return doc;
    } catch (error) {
        console.error('Error initializing sheet:', error);
        throw error;
    }
}

// Routes
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

// Handle contact form submissions
app.post('/api/contact', async (req, res) => {
    try {
        const { name, email, message } = req.body;
        
        // Validate input
        if (!name || !email || !message) {
            return res.status(400).json({ 
                success: false, 
                message: 'Missing required fields' 
            });
        }
        
        // Save to Google Sheets
        const doc = await initSheet();
        const sheet = doc.sheetsByIndex[0]; // First sheet
        
        await sheet.addRow({
            Timestamp: new Date().toISOString(),
            Name: name,
            Email: email,
            Message: message,
            Type: 'Contact',
            Status: 'New'
        });
        
        res.json({ 
            success: true, 
            message: 'Contact form submitted successfully' 
        });
        
    } catch (error) {
        console.error('Error saving contact form:', error);
        res.status(500).json({ 
            success: false, 
            message: 'Error saving submission' 
        });
    }
});

// Handle enquiry form submissions
app.post('/api/enquiry', async (req, res) => {
    try {
        const { name, company, email, phone, product, quantity, message } = req.body;
        
        // Validate input
        if (!name || !company || !email || !product) {
            return res.status(400).json({ 
                success: false, 
                message: 'Missing required fields' 
            });
        }
        
        // Save to Google Sheets
        const doc = await initSheet();
        const sheet = doc.sheetsByIndex[0]; // First sheet
        
        await sheet.addRow({
            Timestamp: new Date().toISOString(),
            Name: name,
            Company: company,
            Email: email,
            Phone: phone || '',
            Product: product,
            Quantity: quantity || '',
            Message: message || '',
            Type: 'Enquiry',
            Status: 'New'
        });
        
        res.json({ 
            success: true, 
            message: 'Enquiry submitted successfully' 
        });
        
    } catch (error) {
        console.error('Error saving enquiry:', error);
        res.status(500).json({ 
            success: false, 
            message: 'Error saving submission' 
        });
    }
});

// Get all submissions (for admin dashboard)
app.get('/api/submissions', async (req, res) => {
    try {
        const doc = await initSheet();
        const sheet = doc.sheetsByIndex[0];
        const rows = await sheet.getRows();
        
        const submissions = rows.map(row => ({
            id: row.rowNumber,
            timestamp: row.Timestamp,
            name: row.Name,
            company: row.Company,
            email: row.Email,
            phone: row.Phone,
            product: row.Product,
            quantity: row.Quantity,
            message: row.Message,
            type: row.Type,
            status: row.Status
        }));
        
        res.json({ success: true, submissions });
        
    } catch (error) {
        console.error('Error fetching submissions:', error);
        res.status(500).json({ 
            success: false, 
            message: 'Error fetching submissions' 
        });
    }
});

// Start server
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
    console.log(`Open http://localhost:${PORT} to view your website`);
});
