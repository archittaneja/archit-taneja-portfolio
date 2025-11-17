# Contact Form Setup Guide

Your portfolio currently uses a `mailto:` link which works immediately but opens the user's email client. Here's how to upgrade to a proper form submission:

## Option 1: Resend + Vercel (Recommended)

### Step 1: Get Resend API Key
1. Go to [resend.com](https://resend.com)
2. Sign up (free tier: 100 emails/day)
3. Verify your domain `archittaneja.com` (or use their test domain)
4. Get your API key from the dashboard

### Step 2: Add API Key to Vercel
1. Go to your Vercel project dashboard
2. Settings → Environment Variables
3. Add: `RESEND_API_KEY` = `your_api_key_here`
4. Redeploy

### Step 3: Create API Route
File: `src/app/api/contact/route.ts`

```typescript
import { Resend } from 'resend';
import { NextResponse } from 'next/server';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: Request) {
  try {
    const { name, email, message } = await request.json();

    const data = await resend.emails.send({
      from: 'Portfolio Contact <onboarding@resend.dev>', // Use your verified domain
      to: 'archit@archittaneja.com',
      replyTo: email,
      subject: `Portfolio Contact from ${name}`,
      html: `
        <h2>New Contact Form Submission</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Message:</strong></p>
        <p>${message}</p>
      `,
    });

    return NextResponse.json({ success: true, data });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to send email' }, { status: 500 });
  }
}
```

### Step 4: Update Contact Form
Replace the current contact section in `src/app/page.tsx` with a form that submits to `/api/contact`

---

## Option 2: Cloudflare Workers

### Step 1: Create Worker
1. Go to Cloudflare Dashboard → Workers & Pages
2. Create a new Worker
3. Add this code:

```javascript
export default {
  async fetch(request) {
    if (request.method === 'POST') {
      const formData = await request.json();
      
      // Send email using Cloudflare Email Routing
      // Or integrate with external SMTP
      
      return new Response(JSON.stringify({ success: true }), {
        headers: { 'Content-Type': 'application/json' }
      });
    }
    return new Response('Method not allowed', { status: 405 });
  }
}
```

### Step 2: Update Form
Point form action to your Worker URL

---

## Option 3: Keep Current mailto: Solution

**Pros:**
- Works immediately
- No setup required
- No costs
- Privacy-friendly

**Cons:**
- Opens email client (not seamless)
- Depends on user having email configured

This is what's currently implemented and works fine for most portfolio sites!

---

## My Recommendation

For a portfolio site with low traffic:
1. **Start with mailto:** (current) - Works now, no setup
2. **Upgrade to Resend later** - When you want a better UX

The Resend package is already installed, so you're ready to implement it whenever you want!
