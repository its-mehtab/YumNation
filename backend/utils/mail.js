import nodemailer from "nodemailer";
import dotenv from "dotenv";
dotenv.config();

const transporter = nodemailer.createTransport({
  service: "gmail",
  port: 465,
  secure: true,
  auth: {
    user: process.env.EMAIL,
    pass: process.env.EPASS,
  },
});

export const sendOtpMail = async (to, otp) => {
  await transporter.sendMail({
    from: process.env.EMAIL,
    to,
    subject: "Reset Your Password - OTP",
    html: `
    <!DOCTYPE html>
    <html lang="en" style="margin:0; padding:0;">
      <head>
        <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Your OTP Code</title>
      </head>
      <body style="margin:0; padding:0; background-color:#f5f5f5;">
        <table width="100%" cellpadding="0" cellspacing="0" border="0" style="background-color:#f5f5f5; padding:24px 0;">
          <tr>
            <td align="center">
              <table width="100%" cellpadding="0" cellspacing="0" border="0" style="max-width:600px; width:100%; background-color:#ffffff; border-radius:8px; overflow:hidden; box-shadow:0 2px 6px rgba(15,23,42,0.08);">
                <tr>
                  <td align="left" style="padding:20px 24px; background-color:#0f172a;">
                    <span style="font-family:system-ui,-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif; font-size:18px; font-weight:600; color:#ffffff;">
                      YumNation
                    </span>
                  </td>
                </tr>

                <tr>
                  <td align="left" style="padding:24px 24px 8px 24px;">
                    <p style="margin:0 0 12px 0; font-family:system-ui,-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif; font-size:18px; line-height:1.4; color:#0f172a; font-weight:600;">
                      Your one-time password (OTP)
                    </p>
                    <p style="margin:0 0 12px 0; font-family:system-ui,-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif; font-size:14px; line-height:1.6; color:#4b5563;">
                      Use the code below to reset your password. Do not share this code with anyone.
                    </p>
                  </td>
                </tr>

                <tr>
                  <td align="center" style="padding:8px 24px 24px 24px;">
                    <div style="display:inline-block; padding:14px 24px; border-radius:8px; background-color:#111827; border:1px solid #111827;">
                      <span style="font-family:system-ui,-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif; font-size:24px; letter-spacing:6px; font-weight:700; color:#ffffff;">
                        ${otp}
                      </span>
                    </div>
                    <p style="margin:16px 0 0 0; font-family:system-ui,-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif; font-size:13px; line-height:1.6; color:#6b7280;">
                      This code will expire in 10 minutes.
                    </p>
                  </td>
                </tr>

                <tr>
                  <td align="left" style="padding:0 24px 20px 24px;">
                    <p style="margin:0 0 4px 0; font-family:system-ui,-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif; font-size:12px; line-height:1.6; color:#9ca3af;">
                      If you did not request this, you can safely ignore this email and your account will remain secure.
                    </p>
                  </td>
                </tr>

                <tr>
                  <td align="center" style="padding:12px 24px 18px 24px; border-top:1px solid #e5e7eb;">
                    <p style="margin:0; font-family:system-ui,-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif; font-size:11px; line-height:1.6; color:#9ca3af;">
                      © ${new Date().getFullYear()} YumNation. All rights reserved.
                    </p>
                  </td>
                </tr>

              </table>
            </td>
          </tr>
        </table>
      </body>
    </html>
        `,
  });
};
