const express = require('express');
const path = require('path');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static('.')); // Serve static files

// In-memory storage for testing (replace with Google Sheets later)
let submissions = [];

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
        
        // Store in memory (for testing)
        const submission = {
            id: submissions.length + 1,
            timestamp: new Date().toISOString(),
            name,
            email,
            message,
            type: 'Contact',
            status: 'New'
        };
        
        submissions.push(submission);
        console.log('New contact submission:', submission);
        
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
        
        // Store in memory (for testing)
        const submission = {
            id: submissions.length + 1,
            timestamp: new Date().toISOString(),
            name,
            company,
            email,
            phone: phone || '',
            product,
            quantity: quantity || '',
            message: message || '',
            type: 'Enquiry',
            status: 'New'
        };
        
        submissions.push(submission);
        console.log('New enquiry submission:', submission);
        
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
    console.log(`Admin dashboard: http://localhost:${PORT}/admin.html`);
});
