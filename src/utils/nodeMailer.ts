import nodemailer from 'nodemailer';
import Mail from 'nodemailer/lib/mailer';

const htmlMessage: string =
  '<p>Para redefinir a sua senha, clique no link abaixo. Caso você não tenha feito essa requisição, por favor ignorar este e-mail.</p>';
const textMessage: string =
  'Para redefinir a sua senha, clique no link abaixo. Caso você não tenha feito essa requisição, por favor ignorar este e-mail.';

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
    userEmail: string,
    userName: string = 'Jô Soares'
  ): Promise<void> {
    await this.transporter.sendMail({
      from: 'marteapi@outlook.com',
      to: userEmail,
      subject: 'Redefinição de Senha',
      html: `<h1>Olá, ${userEmail}.</h1>${htmlMessage}`,
      text: `Olá, ${userName}. ${textMessage}`
    });
  }
}

export const outlookTransporter = new NodemailerProvider(
  process.env.HOST_OUTLOOK,
  587,
  false,
  process.env.USER_OUTLOOK,
  process.env.EMAIL_PASS
);
