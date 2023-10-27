import nodemailer from 'nodemailer';
import Mail from 'nodemailer/lib/mailer';
import messageEmail from './messageEmail';

class NodemailerProvider {
  private readonly transporter: Mail;
  constructor(
    host: string,
    port: number,
    secure: boolean,
    user: string,
    pass: string
  ) {
    this.transporter = nodemailer.createTransport({
      host,
      port,
      secure,
      auth: {
        user,
        pass
      }
    });
  }

  async sendEmail(
    token: string,
    userEmail: string,
    userName: string = 'Jô Soares'
  ): Promise<void> {
    await this.transporter.sendMail({
      from: `Marte 101 <${process.env.MARTE_EMAIL}>`,
      to: userEmail,
      subject: 'Redefinição de Senha',
      html: new messageEmail().htmlText(token, userName)
    });
  }
}

export const outlookTransporter = new NodemailerProvider(
  process.env.HOST_SMTP,
  587,
  false,
  process.env.MARTE_EMAIL,
  process.env.MARTE_PASS
);
