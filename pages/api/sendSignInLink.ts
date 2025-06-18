import type { NextApiRequest, NextApiResponse } from 'next';
import { adminAuth } from '@/lib/firebaseAdmin';
import nodemailer from 'nodemailer';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') return res.status(405).end();

  const { email } = req.body;

  if (!email || typeof email !== 'string') {
    return res.status(400).json({ error: 'A valid email is required' });
  }

  try {
    const actionCodeSettings = {
      url: 'http://localhost:3000/auth', // ✅ Change this in production
      handleCodeInApp: true,
    };

    // 1. Generate secure sign-in link
    const link = await adminAuth.generateSignInWithEmailLink(email, actionCodeSettings);

    // 2. Create nodemailer transporter
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });

    // 3. Define the email content
    const mailOptions = {
      from: `"Do It " <${process.env.SMTP_USER}>`,
      to: email,
      subject: 'Sign In to DO IT',
      html: `
        <div style="font-family:sans-serif; max-width:600px; margin:auto;">
          <h2>Welcome to Do It🎉</h2>
          <p>Click the link below to sign in:</p>
          <a href="${link}" style="display:inline-block; padding:10px 20px; background-color:#6c63ff; color:#fff; text-decoration:none; border-radius:4px;">Sign in</a>
          <p style="margin-top:20px; font-size:12px;">If you didn't request this, you can safely ignore it.</p>
        </div>
      `,
    };

    // 4. Send the email
    await transporter.sendMail(mailOptions);

    return res.status(200).json({ success: true });
  } catch (err) {
    console.error('Error sending sign-in link:', err);
    return res.status(500).json({ error: 'Failed to send link. Please try again later.' });
  }
}
