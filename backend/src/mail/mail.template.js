
export const CLOUD_KITCHEN_PASSWORD_RESET_TEMPLATE = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Reset Your Password - Cloud Kitchen</title>
</head>
<body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;">
  <div style="background: linear-gradient(to right, #FF5722, #FF7043); padding: 20px; text-align: center;">
    <h1 style="color: white; margin: 0;">Cloud Kitchen Password Reset</h1>
  </div>
  <div style="background-color: #f9f9f9; padding: 20px; border-radius: 0 0 5px 5px; box-shadow: 0 2px 5px rgba(0,0,0,0.1);">
    <p>Hello Foodie,</p>
    <p>We received a request to reset your password for your Cloud Kitchen account. If you didn't request this, please ignore this email.</p>
    <p>To reset your password, click the button below:</p>
    <div style="text-align: center; margin: 30px 0;">
      <a href="{resetURL}" style="background-color: #FF5722; color: white; padding: 12px 20px; text-decoration: none; border-radius: 5px; font-weight: bold;">Reset Password</a>
    </div>
    <p>This link will expire in 1 hour for security reasons.</p>
    <p>Craving something delicious? Visit us again soon!</p>
    <p>Bon Appétit!<br>The Cloud Kitchen Team</p>
  </div>
  <div style="text-align: center; margin-top: 20px; color: #888; font-size: 0.8em;">
    <p>This is an automated message, please do not reply to this email.</p>
  </div>
</body>
</html>
`;

export const PASSWORD_RESET_SUCCESS_TEMPLATE = `
<!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Password Reset Successful - Cloud Kitchen</title>
</head>

<body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px; background-color: #fffdf9;">
  <div style="background: linear-gradient(to right, #FF5722, #FF9800); padding: 20px; text-align: center; border-radius: 5px 5px 0 0;">
    <h1 style="color: white; margin: 0;">🍕 Password Reset Successful!</h1>
  </div>
  <div style="background-color: #f9f9f9; padding: 20px; border-radius: 0 0 5px 5px; box-shadow: 0 2px 5px rgba(0,0,0,0.1);">
    <p>Hello Foodie,</p>
    <p>Your password has been successfully reset. You can now log in and continue ordering your favorite dishes!</p>
    <div style="text-align: center; margin: 30px 0;">
      <div style="background-color: #FF5722; color: white; width: 50px; height: 50px; line-height: 50px; border-radius: 50%; display: inline-block; font-size: 30px;">
        ✓
      </div>
    </div>
    <p>If you didn't request this change, please contact our support team immediately.</p>
    <p>To keep your account secure, we recommend that you:</p>
    <ul>
      <li>Use a strong, unique password 🍕</li>
      <li>Enable two-factor authentication if available 🔒</li>
      <li>Avoid using the same password across multiple sites 🚫</li>
    </ul>
    <p>Thank you for choosing Cloud Kitchen! 🍔</p>
    <p>Happy ordering!<br>Your Cloud Kitchen Team</p>
  </div>
  <div style="text-align: center; margin-top: 20px; color: #888; font-size: 0.8em;">
    <p>This is an automated message, please do not reply to this email.</p>
  </div>
</body>

</html>
`;
