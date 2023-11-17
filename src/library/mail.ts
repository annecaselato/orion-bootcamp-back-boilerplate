import nodemailer from 'nodemailer';
import jwt from 'jsonwebtoken';
import { User } from '../entity/user';

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

  public async sendConfirmationEmail(user: User): Promise<void> {
    const token: string = jwt.sign(
      { email: user.email },
      process.env.JWT_SECRET_KEY,
      {
        algorithm: 'HS256',
        expiresIn: '72h'
      }
    );
    try {
      await this.transporter.sendMail({
        from: 'MarvelPedia <marvelpediaorion@hotmail.com>',
        to: user.email,
        subject: '[MarvelPedia] Confirme seu cadastro!',
        html: `<h2>Olá ${user.firstName}!</h2>
        <p>Agradecemos por se juntar à comunidade Marvel! Para confirmar seu cadastro, clique no link abaixo:</p><br>
        <h3><p><a href="http://localhost:4444/v1/check?token=${token}">Confirmar cadastro</a></p></h3><br>
        <p>Se você não solicitou este e-mail, por favor, ignore-o. Caso contrário, esperamos que aproveite a exploração do vasto universo da Marvel em nosso site.</p>
        <p>Em caso de dúvidas ou problemas, nossa equipe de suporte está à disposição para ajudar.</p>
        <p>Divirta-se!</p><br>
        <p>Atenciosamente,</p>
        <p>A Equipe MarvelPedia</p>
        `,
        text: 'Olá, Para confirmar seu cadastro, clique no link abaixo:'
      });
      console.log('Email Enviado com sucesso.');
    } catch (err) {
      console.error('Erro ao enviar email:', err);
    }
  }
}