# Email Setup Guide for Opportunities Form

## Overview
Your Opportunities.dc.html form is now configured to send emails via a Vercel serverless function using Nodemailer and your Namecheap email account.

## Files Created/Modified
1. **api/submit-form.js** - Serverless function that handles form submissions and sends emails
2. **vercel.json** - Vercel configuration with API routes
3. **Opportunities.dc.html** - Updated form with proper field names and API integration
4. **package.json** - Dependencies including nodemailer

## Step 1: Get Your Namecheap Email Credentials

### If you haven't set up email on Namecheap:
1. Log into your Namecheap account
2. Go to **Domain List** → Select your domain → **Email List**
3. Click **Create Email Account**
4. Create an email address (e.g., `opportunities@yourdomain.com` or `info@yourdomain.com`)
5. Note down:
   - **Email address** (e.g., opportunities@yourdomain.com)
   - **Password** you set

### If you already have email set up:
- Use your existing email address and password

## Step 2: Configure Environment Variables in Vercel

You need to add these environment variables to your Vercel project:

### Required Variables:
```
SMTP_HOST=smtp.namecheap.com
SMTP_PORT=465
SMTP_USER=your-email@yourdomain.com
SMTP_PASS=your-email-password
RECIPIENT_EMAIL=your-email@yourdomain.com
```

### How to Add Environment Variables:

#### Option A: Using Vercel Dashboard (Recommended)
1. Go to https://vercel.com/your-project-name
2. Click **Settings** tab
3. Click **Environment Variables** in the left sidebar
4. Add each variable:
   - **Name**: `SMTP_HOST`
   - **Value**: `smtp.namecheap.com`
   - Click **Save**

   Repeat for:
   - `SMTP_PORT` → `465`
   - `SMTP_USER` → `your-email@yourdomain.com`
   - `SMTP_PASS` → `your-email-password`
   - `RECIPIENT_EMAIL` → `your-email@yourdomain.com` (or a different email where you want to receive submissions)

#### Option B: Using Vercel CLI
```bash
vercel env add SMTP_HOST
vercel env add SMTP_PORT
vercel env add SMTP_USER
vercel env add SMTP_PASS
vercel env add RECIPIENT_EMAIL
```

## Step 3: Deploy to Vercel

### If using Git:
```bash
git add .
git commit -m "Add email functionality to opportunities form"
git push origin main
```
Vercel will automatically deploy the changes.

### If using Vercel CLI:
```bash
vercel --prod
```

## Step 4: Test the Form

1. Visit your deployed Opportunities page (e.g., https://yourdomain.com/Opportunities.dc.html)
2. Fill out the form with test data
3. Submit the form
4. Check your email inbox for the submission

## Email Format

When a form is submitted, you'll receive a beautifully formatted HTML email containing:
- **Transaction Details**: Deal type, asset type, size, geography, structure, etc.
- **Contact Information**: Name, firm, email, counterparty type
- **Transaction Summary**: The summary text from the form

## Troubleshooting

### Email not sending?
1. **Check Vercel logs**: Go to your Vercel project → **Deployments** → Click on latest deployment → **Functions** → **api/submit-form** → **Logs**
2. **Verify environment variables**: Make sure all variables are set correctly in Vercel
3. **Check Namecheap email settings**: Ensure your email account is active and the password is correct
4. **SMTP port**: Namecheap uses port 465 (SSL) or 587 (TLS). The code is configured for 465.

### Common Issues:

**"Invalid login" error:**
- Double-check your email address and password
- Make sure you're using the full email address (e.g., `opportunities@yourdomain.com` not just `opportunities`)

**"Connection timeout" error:**
- Verify SMTP_HOST is `smtp.namecheap.com`
- Check that port 465 is not blocked

**Form submits but no email received:**
- Check spam/junk folder
- Verify RECIPIENT_EMAIL is set correctly
- Check Vercel function logs for errors

## Security Notes

- **Never commit** `.env` files with real credentials to Git
- Environment variables in Vercel are encrypted and secure
- The form includes basic validation but you may want to add:
  - reCAPTCHA to prevent spam
  - Rate limiting
  - Additional field validation

## Next Steps (Optional Enhancements)

1. **Add reCAPTCHA**: Prevent spam submissions
2. **Add email confirmation**: Send an acknowledgment email to the person who submitted
3. **Store submissions**: Save to a database (e.g., Vercel Postgres, Supabase)
4. **Add file uploads**: Allow attaching documents
5. **Webhook integration**: Send data to CRM or other tools

## Support

If you encounter issues:
1. Check Vercel function logs first
2. Verify all environment variables are set
3. Test with a simple form submission
4. Review the nodemailer documentation: https://nodemailer.com/

## Cost

- Vercel Hobby plan: FREE (includes 100GB bandwidth, 100 serverless function invocations per day)
- Namecheap email: Already included in your domain purchase or ~$0.99/month per mailbox
- **Total cost: $0/month** (assuming you're on Vercel Hobby plan)