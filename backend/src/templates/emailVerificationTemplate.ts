export function VerificationEmail(userName: string, userRole: string): string {
  let userMessage: string = "";
  switch (userRole) {
    case "donor":
      userMessage =
        "As a donor, you’ll be able to list surplus food and connect with recipients who need it most.";
      break;
    case "recipient":
      userMessage =
        "As a recipient, you’ll gain access to available donations in your area, helping reduce food insecurity.";
      break;
    default:
      userMessage =
        "As an admin, you’ll oversee platform activity, manage users, and ensure smooth operations.";
      break;
  }
  return `<!DOCTYPE html>
    <html>
    <head>
    <meta charset="UTF-8">
    <title>Welcome to Food Rescue</title>
    </head>
    <body style="margin:0; padding:0; background-color:#f4f7f9; font-family:Arial, sans-serif;">
        <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%">
            <tr>
            <td align="center" style="padding:40px 0;">
                <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="600" style="background:#ffffff; border-radius:8px; box-shadow:0 4px 12px rgba(0,0,0,0.1);">
                <!-- Header -->
                <tr>
                    <td align="center" style="background:#2d6a4f; padding:20px; color:#ffffff;">
                    <h1 style="margin:0; font-size:24px; font-weight:bold;">🎉 Welcome to Food Rescue!</h1>
                    </td>
                </tr>
                <!-- Content -->
                <tr>
                    <td style="padding:30px; color:#333333; line-height:1.6;">
                    <h2 style="color:#2d6a4f; margin-top:0; font-size:20px;">Your account has been created successfully</h2>
                    <p style="margin:0 0 15px;">Hi ${userName},</p>
                    <p style="margin:0 0 15px;">Thank you for joining <strong>Food Rescue</strong>. Together, we’re building a community that reduces food waste and helps those in need.</p>
                    <p style="margin:0 0 15px;">${userMessage}</p>
                    <p style="margin:0 0 20px;">You can now log in to your dashboard and start exploring.</p>
                    <p style="text-align:center;">
                        <a href="https://foodrescue.com/login" 
                        style="display:inline-block; padding:12px 24px; background:#2d6a4f; color:#ffffff; text-decoration:none; border-radius:4px; font-weight:bold;">
                        Verify Account
                        </a>
                    </p>
                    </td>
                </tr>
                <!-- Footer -->
                <tr>
                    <td align="center" style="padding:15px; background:#f4f7f9; font-size:12px; color:#777777;">
                    <p style="margin:0;">&copy; 2026 Food Rescue. All rights reserved.</p>
                    <p style="margin:0;">Questions? Email us at 
                        <a href="mailto:support@foodrescue.com" style="color:#2d6a4f; text-decoration:none;">support@foodrescue.com</a>
                    </p>
                    </td>
                </tr>
                </table>
            </td>
            </tr>
        </table>
    </body>
    </html>`;
}
