import { Resend } from "resend";
import dotenv from "dotenv";

dotenv.config();

export const resend = new Resend(process.env.RESEND_API_KEY);



// import sgMail from '@sendgrid/mail';
// import dotenv from 'dotenv'

// dotenv.config();

// sgMail.setApiKey(process.env.SENDGRID_API_KEY);

// export { sgMail };

// export const sender = {
//   email: "prithvichawda1@gmail.com",
//   name: "Cloud Kitchen",
// };
