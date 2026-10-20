import { Resend } from "resend";

const RESEND_API_KEY = process.env.RESEND_API_KEY;
const NOTIFICATION_EMAIL = process.env.NOTIFICATION_EMAIL || "axiorasoftwarelabs@gmail.com";
const FROM_EMAIL = process.env.RESEND_FROM_EMAIL || "Axiora Software Labs <onboarding@resend.dev>";

export const resend = RESEND_API_KEY ? new Resend(RESEND_API_KEY) : null;

interface InquiryPayload {
  name: string;
  email: string;
  company?: string;
  service: string;
  budget?: string;
  message: string;
}

export async function sendInquiryNotification(data: InquiryPayload) {
  if (!resend) {
    console.warn("Resend API key is not configured. Skipping email notification.");
    return { success: false, reason: "API key missing" };
  }

  const htmlContent = `
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="utf-8">
        <style>
          body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; background-color: #050811; color: #f1f5f9; padding: 24px; margin: 0; }
          .container { max-width: 600px; margin: 0 auto; background: #0c1424; border: 1px solid #1e293b; border-radius: 16px; overflow: hidden; box-shadow: 0 10px 30px rgba(0,0,0,0.5); }
          .header { background: linear-gradient(135deg, #0284c7, #06b6d4, #4f46e5); padding: 28px; text-align: center; }
          .header h1 { margin: 0; color: #ffffff; font-size: 22px; font-weight: 800; letter-spacing: -0.5px; }
          .header p { margin: 6px 0 0; color: #e0f2fe; font-size: 13px; }
          .content { padding: 32px; }
          .badge { display: inline-block; padding: 4px 12px; background: rgba(6, 182, 212, 0.15); border: 1px solid rgba(6, 182, 212, 0.4); border-radius: 9999px; color: #38bdf8; font-size: 11px; font-weight: 700; text-transform: uppercase; margin-bottom: 20px; }
          .field { margin-bottom: 18px; }
          .label { font-size: 11px; text-transform: uppercase; letter-spacing: 0.5px; color: #94a3b8; font-weight: 600; margin-bottom: 4px; }
          .value { font-size: 15px; color: #f8fafc; font-weight: 500; background: #070c16; padding: 10px 14px; border-radius: 8px; border: 1px solid #1e293b; }
          .message-box { background: #070c16; border-left: 3px solid #06b6d4; padding: 14px 16px; border-radius: 8px; color: #cbd5e1; font-size: 14px; line-height: 1.6; white-space: pre-wrap; }
          .footer { padding: 20px 32px; background: #070c16; border-top: 1px solid #1e293b; text-align: center; font-size: 12px; color: #64748b; }
          .footer a { color: #38bdf8; text-decoration: none; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>Axiora Software Labs</h1>
            <p>New Client Project Inquiry</p>
          </div>
          <div class="content">
            <span class="badge">Inquiry Alert</span>
            <div class="field">
              <div class="label">Client Name</div>
              <div class="value">${data.name}</div>
            </div>
            <div class="field">
              <div class="label">Email Address</div>
              <div class="value"><a href="mailto:${data.email}" style="color: #38bdf8;">${data.email}</a></div>
            </div>
            ${data.company ? `
            <div class="field">
              <div class="label">Company / Organization</div>
              <div class="value">${data.company}</div>
            </div>
            ` : ""}
            <div class="field">
              <div class="label">Requested Service</div>
              <div class="value">${data.service}</div>
            </div>
            <div class="field">
              <div class="label">Estimated Budget</div>
              <div class="value">${data.budget || "Not specified"}</div>
            </div>
            <div class="field">
              <div class="label">Project Scope & Message</div>
              <div class="message-box">${data.message}</div>
            </div>
          </div>
          <div class="footer">
            Axiora Software Labs Inc. &bull; Malibagh, Dhaka, Bangladesh<br/>
            Direct Lead Notification System
          </div>
        </div>
      </body>
    </html>
  `;

  try {
    const res = await resend.emails.send({
      from: FROM_EMAIL,
      to: [NOTIFICATION_EMAIL],
      replyTo: data.email,
      subject: `[New Lead] ${data.name} - ${data.service}`,
      html: htmlContent,
    });
    return { success: true, data: res };
  } catch (error: any) {
    console.error("Resend sendInquiryNotification error:", error);
    return { success: false, error: error?.message };
  }
}

interface CareerPayload {
  name: string;
  email: string;
  phone: string;
  role: string;
  portfolioUrl?: string;
  note?: string;
  resumeFileName?: string;
}

export async function sendCareerApplicationNotification(data: CareerPayload) {
  if (!resend) {
    console.warn("Resend API key is not configured. Skipping email notification.");
    return { success: false, reason: "API key missing" };
  }

  const htmlContent = `
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="utf-8">
        <style>
          body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; background-color: #050811; color: #f1f5f9; padding: 24px; margin: 0; }
          .container { max-width: 600px; margin: 0 auto; background: #0c1424; border: 1px solid #1e293b; border-radius: 16px; overflow: hidden; box-shadow: 0 10px 30px rgba(0,0,0,0.5); }
          .header { background: linear-gradient(135deg, #10b981, #06b6d4, #6366f1); padding: 28px; text-align: center; }
          .header h1 { margin: 0; color: #ffffff; font-size: 22px; font-weight: 800; letter-spacing: -0.5px; }
          .header p { margin: 6px 0 0; color: #e0f2fe; font-size: 13px; }
          .content { padding: 32px; }
          .badge { display: inline-block; padding: 4px 12px; background: rgba(16, 185, 129, 0.15); border: 1px solid rgba(16, 185, 129, 0.4); border-radius: 9999px; color: #34d399; font-size: 11px; font-weight: 700; text-transform: uppercase; margin-bottom: 20px; }
          .field { margin-bottom: 18px; }
          .label { font-size: 11px; text-transform: uppercase; letter-spacing: 0.5px; color: #94a3b8; font-weight: 600; margin-bottom: 4px; }
          .value { font-size: 15px; color: #f8fafc; font-weight: 500; background: #070c16; padding: 10px 14px; border-radius: 8px; border: 1px solid #1e293b; }
          .note-box { background: #070c16; border-left: 3px solid #10b981; padding: 14px 16px; border-radius: 8px; color: #cbd5e1; font-size: 14px; line-height: 1.6; white-space: pre-wrap; }
          .footer { padding: 20px 32px; background: #070c16; border-top: 1px solid #1e293b; text-align: center; font-size: 12px; color: #64748b; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>Axiora Software Labs</h1>
            <p>New Job Application Received</p>
          </div>
          <div class="content">
            <span class="badge">Candidate Application</span>
            <div class="field">
              <div class="label">Candidate Name</div>
              <div class="value">${data.name}</div>
            </div>
            <div class="field">
              <div class="label">Target Role</div>
              <div class="value">${data.role}</div>
            </div>
            <div class="field">
              <div class="label">Email Address</div>
              <div class="value"><a href="mailto:${data.email}" style="color: #38bdf8;">${data.email}</a></div>
            </div>
            <div class="field">
              <div class="label">Phone / WhatsApp</div>
              <div class="value"><a href="tel:${data.phone}" style="color: #38bdf8;">${data.phone}</a></div>
            </div>
            ${data.portfolioUrl ? `
            <div class="field">
              <div class="label">Portfolio / GitHub Profile</div>
              <div class="value"><a href="${data.portfolioUrl}" target="_blank" style="color: #38bdf8;">${data.portfolioUrl}</a></div>
            </div>
            ` : ""}
            ${data.resumeFileName ? `
            <div class="field">
              <div class="label">Resume / CV Attached</div>
              <div class="value">📄 ${data.resumeFileName} (Stored in Database)</div>
            </div>
            ` : ""}
            ${data.note ? `
            <div class="field">
              <div class="label">Candidate Note</div>
              <div class="note-box">${data.note}</div>
            </div>
            ` : ""}
          </div>
          <div class="footer">
            Axiora Software Labs &bull; Talent Acquisition Portal
          </div>
        </div>
      </body>
    </html>
  `;

  try {
    const res = await resend.emails.send({
      from: FROM_EMAIL,
      to: [NOTIFICATION_EMAIL],
      replyTo: data.email,
      subject: `[Job Application] ${data.name} - ${data.role}`,
      html: htmlContent,
    });
    return { success: true, data: res };
  } catch (error: any) {
    console.error("Resend sendCareerApplicationNotification error:", error);
    return { success: false, error: error?.message };
  }
}

export async function sendClientAutoReply(data: {
  name: string;
  email: string;
  service: string;
  company?: string;
}) {
  if (!resend) return { success: false, reason: "API key missing" };

  const htmlContent = `
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="utf-8">
        <style>
          body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; background-color: #050811; color: #f1f5f9; padding: 24px; margin: 0; }
          .container { max-width: 600px; margin: 0 auto; background: #0c1424; border: 1px solid #1e293b; border-radius: 16px; overflow: hidden; box-shadow: 0 10px 30px rgba(0,0,0,0.5); }
          .header { background: linear-gradient(135deg, #0284c7, #06b6d4, #4f46e5); padding: 32px 28px; text-align: center; }
          .header h1 { margin: 0; color: #ffffff; font-size: 24px; font-weight: 800; letter-spacing: -0.5px; }
          .header p { margin: 6px 0 0; color: #e0f2fe; font-size: 13px; }
          .content { padding: 32px; font-size: 14px; line-height: 1.7; color: #cbd5e1; }
          .greeting { font-size: 17px; font-weight: 700; color: #ffffff; margin-bottom: 16px; }
          .card { background: #070c16; border: 1px solid #1e293b; border-radius: 12px; padding: 18px 20px; margin: 20px 0; }
          .card-title { font-size: 11px; text-transform: uppercase; color: #38bdf8; font-weight: 700; letter-spacing: 0.5px; margin-bottom: 8px; }
          .card-text { font-size: 14px; color: #f8fafc; font-weight: 600; }
          .steps { margin: 20px 0; padding-left: 20px; }
          .steps li { margin-bottom: 8px; }
          .contact-box { background: rgba(6, 182, 212, 0.08); border: 1px solid rgba(6, 182, 212, 0.25); border-radius: 10px; padding: 14px 18px; margin-top: 24px; }
          .contact-box p { margin: 4px 0; font-size: 13px; color: #94a3b8; }
          .contact-box strong { color: #ffffff; }
          .footer { padding: 20px 32px; background: #070c16; border-top: 1px solid #1e293b; text-align: center; font-size: 12px; color: #64748b; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>Axiora Software Labs</h1>
            <p>Enterprise Engineering & AI Innovation Hub</p>
          </div>
          <div class="content">
            <div class="greeting">Dear ${data.name},</div>
            <p>
              Thank you for reaching out to <strong>Axiora Software Labs</strong>. We have successfully received your project inquiry and consultation request.
            </p>
            <div class="card">
              <div class="card-title">Requested Engagement Track</div>
              <div class="card-text">${data.service}</div>
            </div>
            <p>
              An <strong>Enterprise Solution Architect</strong> has been assigned to evaluate your requirements and scope. Here is what you can expect next:
            </p>
            <ol class="steps">
              <li><strong>Technical Assessment:</strong> Our senior engineering team is analyzing your specifications and technology alignment.</li>
              <li><strong>Direct Response (Within 24 Hours):</strong> We will contact you via email or phone with an initial architectural roadmap and discovery schedule.</li>
              <li><strong>Mutual NDA:</strong> All discussion and specifications remain strictly protected under standard enterprise confidentiality terms.</li>
            </ol>
            <div class="contact-box">
              <p><strong>Need Immediate Assistance?</strong></p>
              <p>Direct Phone / WhatsApp: <a href="tel:+8801346658678" style="color: #38bdf8; text-decoration: none;">01346658678</a></p>
              <p>Official Email: <a href="mailto:axiorasoftwarelabs@gmail.com" style="color: #38bdf8; text-decoration: none;">axiorasoftwarelabs@gmail.com</a></p>
              <p>Innovation Pod: Malibagh, Dhaka, Bangladesh</p>
            </div>
            <p style="margin-top: 24px; font-size: 13px; color: #94a3b8;">
              Best regards,<br/>
              <strong style="color: #ffffff;">Solution Architecture & Advisory Pod</strong><br/>
              Axiora Software Labs
            </p>
          </div>
          <div class="footer">
            &copy; ${new Date().getFullYear()} Axiora Software Labs Inc. All rights reserved.
          </div>
        </div>
      </body>
    </html>
  `;

  try {
    const res = await resend.emails.send({
      from: FROM_EMAIL,
      to: [data.email],
      replyTo: "axiorasoftwarelabs@gmail.com",
      subject: `Inquiry Received: Thank you for contacting Axiora Software Labs`,
      html: htmlContent,
    });
    return { success: true, data: res };
  } catch (error: any) {
    console.warn("Client auto-reply delivery note:", error?.message);
    return { success: false, error: error?.message };
  }
}

export async function sendCandidateAutoReply(data: {
  name: string;
  email: string;
  role: string;
}) {
  if (!resend) return { success: false, reason: "API key missing" };

  const htmlContent = `
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="utf-8">
        <style>
          body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; background-color: #050811; color: #f1f5f9; padding: 24px; margin: 0; }
          .container { max-width: 600px; margin: 0 auto; background: #0c1424; border: 1px solid #1e293b; border-radius: 16px; overflow: hidden; box-shadow: 0 10px 30px rgba(0,0,0,0.5); }
          .header { background: linear-gradient(135deg, #10b981, #06b6d4, #6366f1); padding: 32px 28px; text-align: center; }
          .header h1 { margin: 0; color: #ffffff; font-size: 24px; font-weight: 800; }
          .header p { margin: 6px 0 0; color: #e0f2fe; font-size: 13px; }
          .content { padding: 32px; font-size: 14px; line-height: 1.7; color: #cbd5e1; }
          .greeting { font-size: 17px; font-weight: 700; color: #ffffff; margin-bottom: 16px; }
          .card { background: #070c16; border: 1px solid #1e293b; border-radius: 12px; padding: 18px 20px; margin: 20px 0; }
          .card-title { font-size: 11px; text-transform: uppercase; color: #34d399; font-weight: 700; margin-bottom: 8px; }
          .card-text { font-size: 14px; color: #f8fafc; font-weight: 600; }
          .footer { padding: 20px 32px; background: #070c16; border-top: 1px solid #1e293b; text-align: center; font-size: 12px; color: #64748b; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>Axiora Software Labs</h1>
            <p>Talent Acquisition Pod</p>
          </div>
          <div class="content">
            <div class="greeting">Hi ${data.name},</div>
            <p>
              Thank you for applying to join <strong>Axiora Software Labs</strong>! We have successfully received your application and resume.
            </p>
            <div class="card">
              <div class="card-title">Applied Role</div>
              <div class="card-text">${data.role}</div>
            </div>
            <p>
              Our engineering committee thoroughly reviews every submission against our active pods and technical benchmarks. If your experience and problem-solving passion match an open opportunity, our talent acquisition team will reach out to schedule an introductory discussion.
            </p>
            <p style="margin-top: 24px; font-size: 13px; color: #94a3b8;">
              Best regards,<br/>
              <strong style="color: #ffffff;">Talent Acquisition & People Team</strong><br/>
              Axiora Software Labs &bull; Malibagh, Dhaka, Bangladesh
            </p>
          </div>
          <div class="footer">
            &copy; ${new Date().getFullYear()} Axiora Software Labs Inc.
          </div>
        </div>
      </body>
    </html>
  `;

  try {
    const res = await resend.emails.send({
      from: FROM_EMAIL,
      to: [data.email],
      replyTo: "axiorasoftwarelabs@gmail.com",
      subject: `Application Received: ${data.role} at Axiora Software Labs`,
      html: htmlContent,
    });
    return { success: true, data: res };
  } catch (error: any) {
    console.warn("Candidate auto-reply delivery note:", error?.message);
    return { success: false, error: error?.message };
  }
}
