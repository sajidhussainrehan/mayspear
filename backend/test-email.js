/**
 * Email Deliverability Test Script
 * 
 * This script tests email sending to verify deliverability.
 * Run: node test-email.js <test-email-address>
 * 
 * Example:
 *   node test-email.js your-gmail@gmail.com
 *   node test-email.js your-outlook@outlook.com
 */

require('dotenv').config();
const nodemailer = require('nodemailer');

const testEmail = process.argv[2];

if (!testEmail) {
  console.error('❌ Usage: node test-email.js <test-email-address>');
  console.error('Example: node test-email.js test@gmail.com');
  process.exit(1);
}

// Check environment variables
const required = ['SMTP_HOST', 'SMTP_USER', 'SMTP_PASS'];
const missing = required.filter(key => !process.env[key]);

if (missing.length > 0) {
  console.error('❌ Missing required environment variables:', missing.join(', '));
  console.error('Please check your .env file');
  process.exit(1);
}

console.log('🔧 SMTP Configuration:');
console.log(`   Host: ${process.env.SMTP_HOST}`);
console.log(`   Port: ${process.env.SMTP_PORT || 587}`);
console.log(`   User: ${process.env.SMTP_USER}`);
console.log(`   Secure: ${process.env.SMTP_SECURE === 'true' ? 'Yes' : 'No (STARTTLS)'}`);
console.log('');

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: process.env.SMTP_PORT || 587,
  secure: process.env.SMTP_SECURE === 'true',
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS
  }
});

async function runTest() {
  console.log(`🚀 Sending test email to: ${testEmail}`);
  console.log('');

  try {
    // Verify connection
    console.log('⏳ Verifying SMTP connection...');
    await transporter.verify();
    console.log('✅ SMTP connection verified');
    console.log('');

    // Send test email
    console.log('⏳ Sending test email...');
    const info = await transporter.sendMail({
      from: `"Mayspear Deliverability Test" <${process.env.SMTP_USER}>`,
      to: testEmail,
      subject: 'Mayspear Email Deliverability Test',
      html: `
        <h2>Email Deliverability Test</h2>
        <p>If you received this email in your inbox (not spam), your email setup is working correctly.</p>
        <p><strong>Sent at:</strong> ${new Date().toLocaleString()}</p>
        <hr>
        <h3>Technical Details:</h3>
        <ul>
          <li><strong>SMTP Server:</strong> ${process.env.SMTP_HOST}</li>
          <li><strong>From:</strong> ${process.env.SMTP_USER}</li>
          <li><strong>Message ID:</strong> ${'PENDING'}</li>
        </ul>
        <p><em>This is a test email from Mayspear website backend.</em></p>
      `,
      text: `Email Deliverability Test

If you received this in your inbox (not spam), your email setup is working correctly.

Sent at: ${new Date().toLocaleString()}
SMTP Server: ${process.env.SMTP_HOST}
From: ${process.env.SMTP_USER}

This is a test email from Mayspear website backend.`
    });

    console.log('✅ Test email sent successfully!');
    console.log('');
    console.log('📧 Message Details:');
    console.log(`   Message ID: ${info.messageId}`);
    console.log(`   To: ${testEmail}`);
    console.log(`   From: ${process.env.SMTP_USER}`);
    console.log('');
    console.log('⚠️  IMPORTANT: Check these items:');
    console.log('   1. Email arrived in INBOX (not spam/junk)');
    console.log('   2. Sender shows correctly');
    console.log('   3. HTML formatting displays properly');
    console.log('   4. Run mail-tester.com for full analysis');
    console.log('');
    console.log('🔗 Next steps:');
    console.log('   - Test with Gmail: https://mail.google.com');
    console.log('   - Test with Outlook: https://outlook.live.com');
    console.log('   - Full deliverability check: https://www.mail-tester.com');

  } catch (error) {
    console.error('❌ Email test failed:', error.message);
    console.error('');
    console.error('Error Code:', error.code);
    
    if (error.code === 'EAUTH') {
      console.error('');
      console.error('💡 Authentication failed. Check:');
      console.error('   - SMTP_USER is correct (engagement@mayspear.com)');
      console.error('   - SMTP_PASS is the mailbox password (not Namecheap login)');
      console.error('   - If using Gmail, enable "Less secure apps" or use App Password');
    }
    
    if (error.code === 'ECONNECTION') {
      console.error('');
      console.error('💡 Connection failed. Check:');
      console.error('   - SMTP_HOST is correct (mail.privateemail.com for Namecheap)');
      console.error('   - SMTP_PORT is correct (587 for TLS)');
      console.error('   - Firewall is not blocking port 587');
    }

    process.exit(1);
  }
}

runTest();
