const BASE_URL =
  (process.env.DEV_STAGE === 'DEV' ? 'http://' : 'https://') +
  process.env.BASE_URL;
const verificationLink = BASE_URL + 'user/verify-email/';
const resetPasswordLink = BASE_URL + 'user/reset-password/';

const VerifyEmailTemplate = (email: string) => `
<html>
      <body style="font-family: Arial, sans-serif; padding: 20px;">
        <h2 style="color: #4CAF50;">Verify Your Email Address</h2>
        <p>Thank you for registering! Please verify your email address by clicking the link below:</p>
        <a href="${verificationLink}" 
           style="display: inline-block; padding: 10px 20px; background-color: #4CAF50; color: white; text-decoration: none; border-radius: 5px;">
           Verify Email
        </a>
        <p>If the button above does not work, copy and paste the following link into your browser:</p>
        <p><a href="${verificationLink}">${verificationLink}${email}</a></p>
        <p>Thank you!</p>
        <p>Best regards,<br/>Your Company Name</p>
      </body>
    </html>
`;

const ResetEMailTemplate = (token: string) => `
<html>
      <body style="font-family: Arial, sans-serif; padding: 20px;">
        <h2 style="color: #4CAF50;">Reset Your Password</h2>
        <p>Please reset your password by clicking the link below:</p>
        <a href="${resetPasswordLink}" 
           style="display: inline-block; padding: 10px 20px; background-color: #4CAF50; color: white; text-decoration: none; border-radius: 5px;">
           Reset Password
        </a>
        <p>If the button above does not work, copy and paste the following link into your browser:</p>
        <p><a href="${resetPasswordLink}">${resetPasswordLink}${token}</a></p>
        <p>Thank you!</p>
        <p>Best regards,<br/>Your Company Name</p>
      </body>
    </html>
`;

export default VerifyEmailTemplate;
