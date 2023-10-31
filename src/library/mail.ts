import nodemailer from 'nodemailer';
import jwt from 'jsonwebtoken';
import { User } from '../entity/User';

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
        expiresIn: 7200
      }
    );
    try {
      await this.transporter.sendMail({
        from: 'MarvelPedia <marvelpediaorion@hotmail.com>',
        to: user.email,
        subject: 'MarvelPedia - Confirmação de cadastro',
        html: `<h1>Olá!</h1><p>Para confirmar seu cadastro, clique no link abaixo: <a href="http://localhost:4444/v1/check?token=${token}">Confirmar cadastro</a></p>`,
        text: 'Olá, Para confirmar seu cadastro, clique no link abaixo:'
      });
      console.log('Email Enviado com sucesso.');
    } catch (err) {
      console.error('Erro ao enviar email:', err);
    }
  }
}
