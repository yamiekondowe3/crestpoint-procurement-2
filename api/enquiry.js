export default function handler(req, res) {
    if (req.method !== 'POST') {
        return res.status(405).json({ success: false, message: 'Method not allowed' });
    }

    const { name, company, email, phone, product, quantity, message } = req.body;

    if (!name || !company || !email || !product) {
        return res.status(400).json({ success: false, message: 'Missing required fields' });
    }

    console.log('New enquiry submission:', { name, company, email, product });

    res.json({ success: true, message: 'Enquiry submitted successfully' });
}
