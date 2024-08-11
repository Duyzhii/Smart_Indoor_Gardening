import nodemailer from 'nodemailer';
import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

export async function POST(req) {

  console.log('Request received:', req.body);

  try {
    const { type, receiver, receiver_name, user_message } = await req.json();

    console.log('Parsed request:', { type, receiver, receiver_name, user_message });

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

    console.log('Header and content:', { header, content });

    const templatePath = path.join(process.cwd(), 'public', 'new-email.html');
    const template = fs.readFileSync(templatePath, 'utf-8');
    
    console.log('Template before replacement:', template);

    const replacedTemplate = template
      .replace('{{header}}', header)
      .replace('{{message}}', content)
      .replace('{{user_name}}', receiver_name);

    console.log('Template after replacement:', replacedTemplate);

    const mailOptions = {
      from: process.env.SMTP_EMAIL,
      to: receiver || process.env.SMTP_EMAIL, // Use provided receiver or fallback to default
      subject: header,
      text: content,
      html: replacedTemplate,
    };

    const info = await transporter.sendMail(mailOptions);
    console.log('Message sent: %s', info.messageId);
    return NextResponse.json({ message: 'Email sent successfully' });
    
  } catch (error) {
    console.error('Error:', error);
    return NextResponse.json({ message: 'Something went wrong, please try again later' }, { status: 500 });
  }
}
