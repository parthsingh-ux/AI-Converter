import nodemailer from "nodemailer";
import dotenv from "dotenv";
import ExpressError from "./ExpressError.js";
dotenv.config();

const headerHTML = `
  <div style="background-color: #1a202c; padding: 20px; text-align: center; border-radius: 8px 8px 0 0;">
    <h1 style="color: #ffffff; margin: 0; font-size: 26px; font-family: Arial, sans-serif;">
      Revisions Checklist Portal
    </h1>
    <p style="color: #a0aec0; margin: 5px 0 0; font-size: 14px; ;">
      Summarized by Revisions Checklist Portal – Your Excel Insight Assistant
    </p>
  </div>
`;

const footerHTML = `
  <hr style="margin-top: 30px; border: none; border-top: 1px solid #e2e8f0;" />
  <p style="font-size: 12px; color: #718096; text-align: center; margin-top: 10px;">
    Copyright and Powered by Adaan Digital Solutions &copy; ${new Date().getFullYear()} All rights reserved.
  </p>
  <p style="font-size: 12px; color: #a0aec0; text-align: center;">
    You received this email because you signed up for Revisions Checklist Portal.
  </p>
`;

const transporter = nodemailer.createTransport({
  host: "smtp.zeptomail.in",
  port: 587,
  secure: false,
  auth: {
    user: process.env.ZEPTO_USER,
    pass: process.env.ZEPTO_PASS,
  },
});

export const sendVerificationEmail = async (name, email, token) => {
  const url = `${process.env.CLIENT_URL}/verify-email?token=${token}`;
  const formattedName = name.replace(/([A-Z])/g, " $1").trim();

  const mailOptions = {
    from: `"Revisions Checklist Portal Notifications" <noreply@adaandigital.in>`,
    to: email,
    subject: "Verify your email - Revisions Checklist Portal",
    html: `
      <html>
        <body style="font-family: Arial, sans-serif; background-color: #F4F4F4; padding: 20px;">
          <div style="max-width: 600px; margin: auto; background-color: #FFFFFF; padding: 0; border-radius: 8px; overflow: hidden;">
            ${headerHTML}
            <div style="padding: 20px;">
              <h2 style="text-align: center; color: #2D3748;">Welcome, ${formattedName}!</h2>
              <p style="font-size: 14px;">Thank you for signing up with Revisions Checklist Portal. To complete your registration, please verify your email by clicking the button below:</p>
              <div style="text-align: center; margin: 20px;">
                <a href="${url}" style="background-color: #3182ce; color: white; padding: 10px 20px; text-decoration: none; border-radius: 5px;">Verify Email</a>
              </div>
              <p style="font-size: 12px; color: #4A5568;">If you didn’t create this account, you can ignore this email.</p>
            </div>
            ${footerHTML}
          </div>
        </body>
      </html>
    `,
  };
  console.log(email, token);

  try {
    await transporter.sendMail(mailOptions);
    console.log("Verification email sent successfully to:", email);
  } catch (error) {
    console.error("Error sending verification email:", error);
    throw new ExpressError("Failed to send verification email", 500);
  }
};

export const sendPasswordEmail = async (name, email, password) => {
  const formattedName = name.replace(/([A-Z])/g, " $1").trim();

  const mailOptions = {
    from: `"Revisions Checklist Portal Notifications" <noreply@adaandigital.in>`,
    to: email,
    subject: "Your Revisions Checklist Portal Account Password",
    html: `
      <html>
        <body style="font-family: Arial, sans-serif; background-color: #F4F4F4; padding: 20px;">
          <div style="max-width: 600px; margin: auto; background-color: #FFFFFF; padding: 0; border-radius: 8px; overflow: hidden;">
            ${headerHTML}
            <div style="padding: 20px;">
              <h2 style="text-align: center; color: #2D3748;">Hi ${formattedName},</h2>
              <p>Your account has been successfully verified.</p>
              <p>Please use the following temporary password to log in:</p>
              <p style="font-size: 16px; color: #D9534F; text-align: center;"><strong>${password}</strong></p>
              <p>We recommend changing your password after logging in for security purposes.</p>
            </div>
            ${footerHTML}
          </div>
        </body>
      </html>
    `,
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log("Password email sent successfully to:", email);
  } catch (error) {
    console.error("Error sending password email:", error);
    throw new ExpressError("Failed to send password email", 500);
  }
};

export const sendResetPasswordEmail = async (
  email,
  resetUrl,
  name = "User"
) => {
  const formattedName = name.replace(/([A-Z])/g, " $1").trim();

  const mailOptions = {
    from: `"Revisions Checklist Portal Notifications" <noreply@adaandigital.in>`,
    to: email,
    subject: "Reset Your Password - Revisions Checklist Portal",
    html: `
      <html>
        <body style="font-family: Arial, sans-serif; background-color: #F4F4F4; padding: 20px;">
          <div style="max-width: 600px; margin: auto; background-color: #FFFFFF; padding: 0; border-radius: 8px; overflow: hidden;">
            ${headerHTML}
            <div style="padding: 20px;">
              <h2 style="text-align: center; color: #2D3748;">Hi ${formattedName},</h2>
              <p>We received a request to reset your password.</p>
              <p>Click the button below to set a new password. This link will expire in 1 hour:</p>
              <div style="text-align: center; margin: 20px;">
                <a href="${resetUrl}" style="background-color: #D9534F; color: white; padding: 10px 20px; text-decoration: none; border-radius: 5px;">Reset Password</a>
              </div>
              <p>If you did not request a password reset, you can ignore this email.</p>
            </div>
            ${footerHTML}
          </div>
        </body>
      </html>
    `,
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log("Password reset email sent successfully to:", email);
  } catch (error) {
    console.error("Error sending password reset email:", error);
    throw new ExpressError("Failed to send password reset email", 500);
  }
};

export const sendUserCredentialEmail = async (user, plainPassword) => {
  const mailOptions = {
    from: `"Revisions Checklist Portal" <noreply@adaandigital.in>`,
    to: user.email,
    subject: `Your Account Credentials`,
    html: `
      <html>
        <body style="font-family: Arial, sans-serif; background-color: #F9FAFB; padding: 20px;">
          <div style="max-width: 600px; margin: auto; background-color: #FFFFFF; border-radius: 8px; overflow: hidden;">
            ${headerHTML}
            <div style="padding: 20px;">
              <p style="font-size: 16px;">Hello <strong>${user.name}</strong>,</p>
              <p style="font-size: 14px;">Your account has been created successfully. Here are your login credentials:</p>
              
              <ul style="font-size: 14px; color: #2D3748; padding-left: 20px;">
                <li><strong>Email:</strong> ${user.email}</li>
                <li><strong>Password:</strong> ${plainPassword}</li>
              </ul>

              <p style="font-size: 14px;">Please change your password after your first login.</p>

              <div style="text-align: center; margin: 30px;">
                <a href="${process.env.CLIENT_URL}/signin" style="background-color: #3182CE; color: white; padding: 10px 20px; border-radius: 5px; text-decoration: none;">Login Now</a>
              </div>
            </div>
            ${footerHTML}
          </div>
        </body>
      </html>
    `,
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log(`Credentials email sent to ${user.email}`);
  } catch (error) {
    console.error("Failed to send credentials email:", error.message);
  }
};

export const sendUserPasswordResetEmail = async (user, plainPassword) => {
  const mailOptions = {
    from: `"Revisions Checklist Portal" <noreply@adaandigital.in>`,
    to: user.email,
    subject: `Your Password Has Been Reset`,
    html: `
      <html>
        <body style="font-family: Arial, sans-serif; background-color: #F9FAFB; padding: 20px;">
          <div style="max-width: 600px; margin: auto; background-color: #FFFFFF; border-radius: 8px; overflow: hidden;">
            ${headerHTML}
            <div style="padding: 20px;">
              <p style="font-size: 16px;">Hello <strong>${user.name}</strong>,</p>
              
              <p style="font-size: 14px; color: #2D3748;">
                This is to inform you that your account password has been reset by an administrator.
              </p>
              
              <p style="font-size: 14px; color: #2D3748;">
                Please use the following credentials to log in:
              </p>
              
              <ul style="font-size: 14px; color: #2D3748; padding-left: 20px;">
                <li><strong>Email:</strong> ${user.email}</li>
                <li><strong>New Password:</strong> ${plainPassword}</li>
              </ul>

              <p style="font-size: 14px; color: #2D3748;">
                For your security, please change your password immediately after logging in.
              </p>

              <div style="text-align: center; margin: 30px;">
                <a href="${process.env.CLIENT_URL}/signin" style="background-color: #3182CE; color: white; padding: 10px 20px; border-radius: 5px; text-decoration: none;">Login Now</a>
              </div>
            </div>
            ${footerHTML}
          </div>
        </body>
      </html>
    `,
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log(`Password reset email sent to ${user.email}`);
  } catch (error) {
    console.error("Failed to send password reset email:", error.message);
  }
};
