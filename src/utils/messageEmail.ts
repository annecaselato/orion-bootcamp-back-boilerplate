export default class messageEmail {
  htmlText(token: string, userName: string): string {
    return `
    <p>Olá, ${userName}!</p>
    <p>Recebemos uma solicitação de redefinição de senha para a sua conta na Marte 101. Para criar uma nova senha, clique no link abaixo:</p>
    <a href="https://localhost:4200/new-password/${token}" target="_blank">link</a>
    <p>Se você não solicitou esta redefinição, por favor, ignore este e-mail. A sua senha atual permanecerá a mesma.</p>
    <p>Agradecemos por fazer parte da nossa comunidade.</p>
    <p>Atenciosamente,<br/>Equipe Marte 101</p>`;
  }
}
