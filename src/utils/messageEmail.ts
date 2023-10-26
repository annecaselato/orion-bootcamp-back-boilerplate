export default class messageEmail {
  htmlText(userName: string): string {
    return `
    <h1>Olá ${userName}</h1>
    <br/>
    <p>Obrigado por se cadastrar na plataforma Marte 101! Para garantir a segurança da sua conta e manter você informado sobre as últimas atualizações, precisamos confirmar o seu endereço de e-mail.</p>
    <br/>
    <p>Clique no link abaixo para confirmar o seu e-mail:</p>
    <a href="linkemdesenvolvimento" target="_blank">link</a>
    <br/>
    <p>Se você não se cadastrou na plataforma, pode ignorar este e-mail. Caso contrário, clique no link acima para confirmar o seu e-mail e começar a explorar informações sobre a meteorologia em Marte.</p>
    <br/>
    <p>Agradecemos por fazer parte da nossa comunidade.</p>
    <br/>
    <h2>Atenciosamente,<br/>Equipe Marte 101</h2>`;
  }
}
