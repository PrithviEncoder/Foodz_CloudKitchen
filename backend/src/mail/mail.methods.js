
import { sgMail, sender } from './mail.config.js'
import { CLOUD_KITCHEN_PASSWORD_RESET_TEMPLATE, PASSWORD_RESET_SUCCESS_TEMPLATE, VERIFICATION_EMAIL_TEMPLATE } from './mail.template.js';

export const sendVerificationMail = async (email, verificationToken) => {
  
    try {
        const response = await sgMail.send({
            from: sender,
            to: email,
            subject: "Verify Your Email",
            html: VERIFICATION_EMAIL_TEMPLATE.replace("{verificationCode}", verificationToken),
        
        })

    // Proper logging for SendGrid response
    console.log(`Verification code email successfully sent to ${email}: ${response[0].statusCode}`);
        
    } catch (error) {
        console.error(`Error sending Verification : ${error}`);   
    }
}

export const sendPasswordResetMail = async (email, resetURL) => {
    
    try {
        const response = await sgMail.send({
            from: sender,
            to: email,
            subject: "Reset Your Password",
            html:CLOUD_KITCHEN_PASSWORD_RESET_TEMPLATE.replace("{resetURL}", resetURL),
            category: "Password reset mail"
        })
        console.log(`Password Reset Mail Successfully Sent to ${email}: ${response[0].statusCode}`);

    } catch (error) {
        console.error("There is some error is sending password reset mail : ", error);
        
    }
}

export const sendPasswordResetSuccessMail = async (email) => {
    
    try {
        const response = await sgMail.send({
            from: sender,
            to: email,
            subject: "Password Reset Successfull",
            html: PASSWORD_RESET_SUCCESS_TEMPLATE,
            category: "Reset Password Mail"
        })
        console.log(`Password Reset Success email sent to ${email}: ${response[0].statusCode}`)

    } catch (error) {
        console.error("There is some error is sending Successfull password reset Mail: ", error)
    }
}
