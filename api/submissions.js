export default function handler(req, res) {
    if (req.method !== 'GET') {
        return res.status(405).json({ success: false, message: 'Method not allowed' });
    }

    // Submissions are not persisted on Vercel (serverless = no memory between requests)
    // To save submissions, connect Google Sheets here later
    res.json({ success: true, submissions: [] });
}
