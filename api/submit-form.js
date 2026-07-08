const nodemailer = require('nodemailer');

export default async function handler(req, res) {
  // Only allow POST requests
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    const { dealType, assetType, transactionSize, geography, structureRequired, securityProfile, urgency, existingFinancing, counterpartyType, name, firm, email, transactionSummary } = req.body;

    // Validate required fields
    if (!name || !email || !firm || !transactionSummary) {
      return res.status(400).json({ message: 'Missing required fields' });
    }

    // Create transporter using Namecheap Private Email SMTP
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST || 'mail.privateemail.com',
      port: process.env.SMTP_PORT || 465,
      secure: true, // true for 465, false for other ports
      auth: {
        user: process.env.SMTP_USER, // Your Namecheap email address
        pass: process.env.SMTP_PASS, // Your Namecheap email password
      },
    });

    // Email content
    const mailOptions = {
      from: process.env.SMTP_USER, // Your Namecheap email
      to: process.env.RECIPIENT_EMAIL || process.env.SMTP_USER, // Where you want to receive submissions
      subject: `New Transaction Submission - ${dealType || 'Opportunity'}`,
      html: `
        <!DOCTYPE html>
        <html>
        <head>
          <style>
            body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
            .container { max-width: 800px; margin: 0 auto; padding: 20px; }
            .header { background: #B89B6A; color: white; padding: 20px; text-align: center; }
            .section { background: #f5f5f5; padding: 15px; margin: 15px 0; border-left: 4px solid #B89B6A; }
            .label { font-weight: bold; color: #6B5D3E; font-size: 12px; text-transform: uppercase; letter-spacing: 0.1em; }
            .value { margin-top: 5px; font-size: 14px; }
            .footer { text-align: center; padding: 20px; color: #666; font-size: 12px; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1>New Transaction Submission</h1>
              <p>Mayspear Global - Confidential Opportunity Review</p>
            </div>

            <div class="section">
              <div class="label">Transaction Details</div>
              <div class="value"><strong>Deal Type:</strong> ${dealType || 'Not specified'}</div>
              <div class="value"><strong>Asset Type:</strong> ${assetType || 'Not specified'}</div>
              <div class="value"><strong>Transaction Size:</strong> ${transactionSize || 'Not specified'}</div>
              <div class="value"><strong>Geography:</strong> ${geography || 'Not specified'}</div>
              <div class="value"><strong>Structure Required:</strong> ${structureRequired || 'Not specified'}</div>
              <div class="value"><strong>Security Profile:</strong> ${securityProfile || 'Not specified'}</div>
              <div class="value"><strong>Urgency:</strong> ${urgency || 'Not specified'}</div>
              <div class="value"><strong>Existing Financing:</strong> ${existingFinancing || 'Not specified'}</div>
            </div>

            <div class="section">
              <div class="label">Contact Information</div>
              <div class="value"><strong>Name:</strong> ${name}</div>
              <div class="value"><strong>Firm:</strong> ${firm}</div>
              <div class="value"><strong>Email:</strong> ${email}</div>
              <div class="value"><strong>Counterparty Type:</strong> ${counterpartyType || 'Not specified'}</div>
            </div>

            <div class="section">
              <div class="label">Transaction Summary</div>
              <div class="value">${transactionSummary.replace(/\n/g, '<br>')}</div>
            </div>

            <div class="footer">
              <p>This submission was received through the Mayspear Global Opportunities page.</p>
              <p>All material is treated as strictly confidential.</p>
            </div>
          </div>
        </body>
        </html>
      `,
    };

    // Send email
    await transporter.sendMail(mailOptions);

    return res.status(200).json({ message: 'Email sent successfully' });
  } catch (error) {
    console.error('Error sending email:', error);
    return res.status(500).json({ message: 'Error sending email', error: error.message });
  }
}