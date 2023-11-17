import nodemailer from 'nodemailer';

/**
 * Sends emails for users
 */
export class NodemailerService {
  private static transporter: nodemailer.Transporter;

  /**
   * init
   *
   * Initializes the Nodemailer transport with the SMTP settings from MailTrap.
   */
  public static init(): void {
    NodemailerService.transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.GMAIL_APP_USER,
        pass: process.env.GMAIL_APP_PASSWORD
      }
    });
  }

  /**
   * sendPasswordRecoveryEmail
   *
   * Sends a password recovery email to the specified email address.
   *
   * @param email - The email address to send the password recovery email to.
   */
  public static async sendPasswordRecoveryEmail(email: string): Promise<void> {
    const mailOptions = {
      from: 'admin',
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