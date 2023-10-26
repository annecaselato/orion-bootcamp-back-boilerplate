import nodemailer from 'nodemailer';

export class NodemailerService {
  private static transporter: nodemailer.Transporter;

  /**
   * Initializes the Nodemailer transport with the SMTP settings from MailTrap.
   */
  static init(): void {
    NodemailerService.transporter = nodemailer.createTransport({
      host: 'sandbox.smtp.mailtrap.io',
      port: 2525,
      auth: {
        user: 'b18597c503675e',
        pass: 'c0cce67a977c5d'
      }
    });
  }

  /**
   * Sends a password recovery email to the specified email address.
   * @param email - The email address to send the password recovery email to.
   * @returns A Promise that resolves when the email has been sent.
   */
  static async sendPasswordRecoveryEmail(email: string): Promise<void> {
    const mailOptions = {
      from: 'admin <245b14fdd3-31d9d3@inbox.mailtrap.io>',
      to: email,
      subject: 'Recuperação de Senha',
      html: `
        <html>
          <head>
            <title>Recuperação de senha</title>
          </head>
          <body>
            <h3>Olá viajante!</h3>
            <p>Recebemos sua solicitação de recuperação de senha. Para criar uma nova senha clique no botão abaixo:</p>
            <button>CADASTRAR NOVA SENHA</button>
            <p><b>Importante:</b> O Link é válido por 24 horas</p>
            <p>Após esse tempo, você deverá adicionar um novo, tá bem?!</p>
            <p> Caso não tenha sido você, por favor desconsidere esse email</p>
            <p> Se precisar de ajuda, entre em contato com a gente!</p>
            <p>EQUIPE ORION MARTE</p>
          </body>
        </html>
      `
    };

    await NodemailerService.transporter.sendMail(mailOptions);
  }
}
