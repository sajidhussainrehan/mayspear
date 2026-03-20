# Email DNS Configuration for Mayspear.com

## REQUIRED DNS Records for Namecheap Private Email

Add these records in Namecheap → Domain List → Manage → Advanced DNS

### 1. MX Records (Mail Routing)
```
Type: MX Record
Host: @
Value: mx1.privateemail.com
Priority: 10

Type: MX Record
Host: @
Value: mx2.privateemail.com
Priority: 10
```

### 2. SPF Record (Sender Policy Framework)
```
Type: TXT Record
Host: @
Value: v=spf1 include:spf.privateemail.com ~all
```

### 3. DKIM Record (DomainKeys Identified Mail)
Get this from: Namecheap → Private Email → Manage → DKIM Settings
```
Type: TXT Record
Host: default._domainkey
Value: [Paste the DKIM key from Namecheap dashboard]
```

### 4. DMARC Record (Domain-based Message Authentication)
```
Type: TXT Record
Host: _dmarc
Value: v=DMARC1; p=none; rua=mailto:engagement@mayspear.com
```

---

## CHECKLIST FOR CLIENT REQUIREMENTS

- [ ] MX records pointing to mx1.privateemail.com and mx2.privateemail.com
- [ ] SPF record includes spf.privateemail.com
- [ ] DKIM fully configured and active (get from Private Email dashboard)
- [ ] DMARC policy configured with reporting
- [ ] DNS fully propagated (wait 5 min - 24 hours)
- [ ] Test email sent to Gmail (inbox, not spam)
- [ ] Test email sent to Outlook (inbox, not spam)
- [ ] mail-tester.com score 8+ (verify SPF, DKIM, DMARC)

---

## COMMON MISTAKES TO AVOID

❌ Using Gmail SMTP with custom domain
❌ Multiple/conflicting MX records
❌ Multiple SPF records (combine into one if needed)
❌ Wrong password (use mailbox password, not Namecheap login)
❌ Not waiting for DNS propagation

---

## PROPAGATION CHECK

Check if DNS is live:
```bash
nslookup -type=mx mayspear.com
nslookup -type=txt mayspear.com
```

Or use online tools:
- https://www.whatsmydns.net
- https://mxtoolbox.com/SuperTool.aspx
