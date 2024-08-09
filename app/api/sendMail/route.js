import nodemailer from 'nodemailer';
import { NextResponse } from 'next/server';

export async function POST(req) {
  try {
    const {type, receiver, receiver_name, user_message} = await req.json();

    console.log(type, receiver, receiver_name, user_message);

    const transporter = nodemailer.createTransport({
      service: 'gmail', 
      auth: {
        user: process.env.SMTP_EMAIL,
        pass: process.env.SMTP_PASSWORD,
      },
    });

    let header = '';
    let content = '';

    if (type === "Alert_Bug") {
      header = '!!! BUG FOUND !!!';
      content = `SIG have found a bug`;
    }
   
    else if (type === "Alert_Over_Suitable_Value") {
      header = '!!! OVER VALUE ALERT !!!';
      content = user_message;
    }

    else if (type === "Alert_Under_Suitable_Value") {
      header = '!!! UNDER VALUE ALERT !!!';
      content = user_message;
    }

    const mailOptions = {
      from: process.env.SMTP_EMAIL,
      to: process.env.SMTP_EMAIL, 
      subject: header,
      text: content,
    };

    const info = await transporter.sendMail(mailOptions);

    console.log('Message sent: %s', info.messageId);
    return NextResponse.json({ message: 'Email sent successfully' });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: 'Something went wrong, please try again later' }, { status: 500 });
  }
}
