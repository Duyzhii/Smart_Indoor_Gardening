import nodemailer from 'nodemailer';
import { NextResponse } from 'next/server';

export async function POST(req) {

  console.log('Request received:', req.body);

  try {
    const { type, receiver, receiver_name, user_message } = await req.json();

    console.log('Request received:', { type, receiver, receiver_name, user_message });

    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.SMTP_EMAIL,
        pass: process.env.SMTP_PASSWORD,
      },
    });

    let header = '';
    let content = '';

    switch (type) {
      case "Alert_Bug":
        header = '!!! BUG FOUND !!!';
        content = `SIG has found a bug.`;
        break;
      case "Alert_Device_Status":
        header = '!!! OVER VALUE ALERT !!!';
        content = user_message;
        break;
      case "Alert_Under_Suitable_Value":
        header = '!!! UNDER VALUE ALERT !!!';
        content = user_message;
        break;
      default:
        throw new Error('Unknown alert type');
    }

    const mailOptions = {
      from: process.env.SMTP_EMAIL,
      to: receiver || process.env.SMTP_EMAIL, // Use provided receiver or fallback to default
      subject: header,
      text: content,
    };

    const info = await transporter.sendMail(mailOptions);
    console.log('Message sent: %s', info.messageId);
    return NextResponse.json({ message: 'Email sent successfully' });
    
  } catch (error) {
    console.error('Error:', error);
    return NextResponse.json({ message: 'Something went wrong, please try again later' }, { status: 500 });
  }
}
