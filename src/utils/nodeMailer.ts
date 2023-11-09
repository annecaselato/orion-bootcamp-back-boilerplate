import nodemailer from 'nodemailer';
import messageEmail from './messageEmail';

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

  async sendEmailWelcome(userEmail: string, userName: string): Promise<void> {
    await this.outlookTransporter.sendMail({
      from: `Marte 101 <${process.env.MARTE_EMAIL}>`,
      to: userEmail,
      subject: 'Bem-vindo à Marte 101',
      html: new messageEmail().htmlTextEmailWelcome(userName)
    });
  }

  async sendEmail(
    token: string,
    userEmail: string,
    userName: string
  ): Promise<void> {
    await this.outlookTransporter.sendMail({
      from: `Marte 101 <${process.env.MARTE_EMAIL}>`,
      to: userEmail,
      subject: 'Redefinição de Senha',
      html: new messageEmail().htmlText(token, userName)
    });
  }
}
