import nodemailer from 'nodemailer';

export class EmailSender {
  private transporter: nodemailer.Transporter;

  constructor() {
    this.transporter = nodemailer.createTransport({
      host: 'smtp-mail.outlook.com',
      port: 587,
      secure: false,
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASSWORD
      }
    });
  }

  public async sendConfirmationEmail(email: string): Promise<void> {
    // TODO: Chamar classe que valida o token
    const token = '123';
    try {
      await this.transporter.sendMail({
        from: 'MarvelPedia <marvelpediaorion@hotmail.com>',
        to: email,
        subject: 'MarvelPedia - Confirmação de cadastro',
        html: `<h1>Olá!</h1><p>Para confirmar seu cadastro, clique no link abaixo: <a href="http://localhost:4444/check?${token}">Confirmar cadastro</a></p>`,
        text: 'Olá, Para confirmar seu cadastro, clique no link abaixo:'
      });
      console.log('Email Enviado com sucesso.');
    } catch (err) {
      console.error('Erro ao enviar email:', err);
    }
  }
}

const emailSender = new EmailSender();
emailSender.sendConfirmationEmail('nickolasluan15@gmail.com');
