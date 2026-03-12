# CrestPoint Solutions - Database Setup Guide

## Google Sheets Integration Setup

### 1. Create Google Cloud Project
1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select existing one
3. Enable the Google Sheets API

### 2. Create Service Account
1. Go to IAM & Admin > Service Accounts
2. Create a new service account
3. Download the JSON key file
4. Keep this file secure and private

### 3. Create Google Sheet
1. Create a new Google Sheet with these columns:
   - Timestamp
   - Name
   - Company
   - Email
   - Phone
   - Product
   - Quantity
   - Message
   - Type
   - Status

2. Share the sheet with your service account email:
   - Click "Share"
   - Add the service account email
   - Give "Editor" permissions

### 4. Set Up Environment Variables
Create a `.env` file in your project root:

```
GOOGLE_SHEET_ID=your_sheet_id_here
SERVICE_ACCOUNT_EMAIL=your_service_account_email
PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\n...\n-----END PRIVATE KEY-----\n"
```

### 5. Install Dependencies
```bash
npm install
```

### 6. Start the Server
```bash
npm start
```

## Alternative: Simple Setup Without Google Cloud

If you prefer a simpler setup, you can use Sheet.best or Zapier to connect your forms to Google Sheets without coding.

### Sheet.best Setup:
1. Go to [sheet.best](https://sheet.best/)
2. Connect your Google Sheet
3. Get the API endpoint
4. Update your forms to submit to that endpoint

## Features

With this database setup:
- All form submissions are stored in Google Sheets
- You can view and manage submissions in a spreadsheet
- Data is searchable and filterable
- No database maintenance required
- Automatic timestamps and status tracking

## Security Notes

- Never commit your `.env` file to version control
- Keep your service account key file secure
- Consider using environment variables in production
