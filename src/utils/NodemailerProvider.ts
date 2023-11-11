import nodemailer from 'nodemailer';
import Handlebars from 'handlebars';
import fs from 'fs';

export class NodemailerProvider {
  outlookTransporter = nodemailer.createTransport({
    host: process.env.HOST_SMTP,
    port: 587,
    secure: false,
    auth: {
      user: process.env.MARTE_EMAIL,
      pass: process.env.MARTE_PASS
    }
  });

  async sendEmail(
    to: string,
    subject: string,
    variables: object,
    path: string
  ): Promise<void> {
    const templateFileContent = fs.readFileSync(path).toString('utf-8');
    const mailTemplateParse = Handlebars.compile(templateFileContent);
    const html = mailTemplateParse(variables);

    await this.outlookTransporter.sendMail({
      to,
      subject,
      html: html,
      from: `Marte 101 <${process.env.MARTE_EMAIL}>`
    });
  }
}
