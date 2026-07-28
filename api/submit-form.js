const nodemailer = require('nodemailer');

function escapeHtml(str) {
  return String(str == null ? '' : str).replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
}

function wrapEmail(title, subtitle, sectionsHtml, footerText) {
  return `
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
          <h1>${escapeHtml(title)}</h1>
          <p>${escapeHtml(subtitle)}</p>
        </div>
        ${sectionsHtml}
        <div class="footer">
          <p>${escapeHtml(footerText)}</p>
          <p>All material is treated as strictly confidential.</p>
        </div>
      </div>
    </body>
    </html>
  `;
}

function section(label, rows) {
  return `<div class="section"><div class="label">${escapeHtml(label)}</div>${rows.map((r) => `<div class="value"><strong>${escapeHtml(r[0])}:</strong> ${escapeHtml(r[1] || 'Not specified')}</div>`).join('')}</div>`;
}

const FORM_TYPES = {
  opportunity: {
    required: ['name', 'email', 'firm', 'transactionSummary'],
    subject: (d) => `New Transaction Submission - ${d.dealType || 'Opportunity'}`,
    build: (d) => wrapEmail(
      'New Transaction Submission',
      'Mayspear Global - Confidential Opportunity Review',
      section('Transaction Details', [
        ['Deal Type', d.dealType], ['Asset Type', d.assetType], ['Transaction Size', d.transactionSize],
        ['Geography', d.geography], ['Structure Required', d.structureRequired], ['Security Profile', d.securityProfile],
        ['Urgency', d.urgency], ['Existing Financing', d.existingFinancing],
      ]) +
      section('Contact Information', [
        ['Name', d.name], ['Firm', d.firm], ['Email', d.email], ['Counterparty Type', d.counterpartyType],
      ]) +
      `<div class="section"><div class="label">Transaction Summary</div><div class="value">${escapeHtml(d.transactionSummary).replace(/\n/g, '<br>')}</div></div>`,
      'This submission was received through the Mayspear Global Opportunities page.'
    ),
  },
  contact: {
    required: ['name', 'email', 'organisation', 'situation'],
    subject: (d) => `New Contact Enquiry - ${d.requirement || 'General'}`,
    build: (d) => wrapEmail(
      'New Contact Enquiry',
      'Mayspear Global - Engage',
      section('Routing', [
        ['Requirement', d.requirement], ['Sector Desk', d.sectorDesk], ['Geography Desk', d.geographyDesk], ['Transaction Size', d.transactionSize],
      ]) +
      section('Contact Information', [
        ['Name', d.name], ['Organisation', d.organisation], ['Email', d.email], ['Role or Side', d.roleOrSide],
      ]) +
      `<div class="section"><div class="label">Situation, Counterparties and Timeline</div><div class="value">${escapeHtml(d.situation).replace(/\n/g, '<br>')}</div></div>`,
      'This submission was received through the Mayspear Global Contact page.'
    ),
  },
  deal: {
    required: ['dealEmail'],
    subject: () => 'New Capital Need Enquiry (quick form)',
    build: (d) => wrapEmail(
      'New Capital Need Enquiry',
      'Mayspear Global - Quick Enquiry (nav popup)',
      section('Contact', [['Email', d.dealEmail]]),
      'This submission was received through the "Have Capital Needs?" popup.'
    ),
  },
  salon: {
    required: ['salonEmail'],
    subject: () => 'New Mayspear Salon Request',
    build: (d) => wrapEmail(
      'New Mayspear Salon Request',
      'Mayspear Global - The Salon',
      section('Contact', [['Email', d.salonEmail]]),
      'This submission was received through the Mayspear Salon invitation request.'
    ),
  },
  originator: {
    required: ['originatorFirm', 'originatorEmail'],
    subject: (d) => `New Transaction Referral - ${d.originatorFirm}`,
    build: (d) => wrapEmail(
      'New Transaction Referral',
      'Mayspear Global - The Network',
      section('Contact', [['Firm', d.originatorFirm], ['Email', d.originatorEmail]]),
      'This submission was received through the "Refer a Transaction" popup.'
    ),
  },
};

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    const data = req.body || {};
    const formType = FORM_TYPES[data.formType] ? data.formType : 'opportunity';
    const form = FORM_TYPES[formType];

    const missing = form.required.filter((f) => !data[f]);
    if (missing.length) {
      return res.status(400).json({ message: 'Missing required fields' });
    }

    const smtpPort = Number(process.env.SMTP_PORT) || 465;
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST || 'mail.privateemail.com',
      port: smtpPort,
      secure: smtpPort === 465, // true for 465 (implicit TLS), false for 587 (STARTTLS)
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });

    await transporter.sendMail({
      from: process.env.SMTP_USER,
      to: process.env.RECIPIENT_EMAIL || process.env.SMTP_USER,
      subject: form.subject(data),
      html: form.build(data),
    });

    return res.status(200).json({ message: 'Email sent successfully' });
  } catch (error) {
    console.error('Error sending email:', error);
    return res.status(500).json({ message: 'Error sending email', error: error.message });
  }
}
