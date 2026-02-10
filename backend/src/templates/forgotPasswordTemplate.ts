export function ForgotPassword(resetLink: string) {
  return `
  <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8" />
        <title>Reset Your Password</title>
    </head>
    <body style="margin:0; padding:0; background-color:#f4f4f7; font-family:Arial, sans-serif;">
        <table width="100%" cellpadding="0" cellspacing="0" style="background-color:#f4f4f7; padding:40px 0;">
        <tr>
            <td align="center">
            <table width="600" cellpadding="0" cellspacing="0" style="background-color:#ffffff; border-radius:8px; overflow:hidden; box-shadow:0 4px 12px rgba(0,0,0,0.1);">
                
                <!-- Header -->
                <tr>
                <td align="center" style="background-color:#6b46c1; color:#ffffff; padding:20px;">
                    <h1 style="margin:0; font-size:24px;">Password Reset Request</h1>
                </td>
                </tr>
                
                <!-- Content -->
                <tr>
                <td style="padding:30px; color:#333333; line-height:1.6;">
                    <p style="margin:0 0 15px;">Hello,</p>
                    <p style="margin:0 0 15px;">
                    We received a request to reset your password. Click the button below to set a new password:
                    </p>
                    
                    <p style="text-align:center; margin:30px 0;">
                    <a href="${resetLink}" 
                        style="display:inline-block; padding:12px 24px; background-color:#6b46c1; color:#ffffff; text-decoration:none; border-radius:6px; font-weight:bold;">
                        Reset Password
                    </a>
                    </p>
                    
                    <p style="margin:0 0 15px;">
                    If you didn’t request this, you can safely ignore this email. Your password will remain unchanged.
                    </p>
                    <p style="margin:0;">This link will expire in 30 minutes for your security.</p>
                </td>
                </tr>
                
                <!-- Footer -->
                <tr>
                <td align="center" style="padding:20px; font-size:12px; color:#888888;">
                    &copy; ${new Date().getFullYear()} Food Rescue Platform. All rights reserved.
                </td>
                </tr>
                
            </table>
            </td>
        </tr>
        </table>
    </body>
</html>
`;
}
