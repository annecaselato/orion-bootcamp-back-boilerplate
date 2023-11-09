export class messageEmail {
  htmlTextEmailWelcome(userName: string): string {
    return `
      <p>Olá, ${userName}!</p>
      <p> Estamos emocionados em dar-lhe as boas-vindas à Marte 101, a sua porta de entrada para descobrir o misterioso Planeta Vermelho e seus segredos cósmicos!</p>
      <p> Seu cadastro foi um sucesso e agora você está pronto para explorar Marte como nunca antes. Clique no link abaixo para acessar a plataforma:</p>
      <a href="https://localhost:4444/users/login" target="_blank">Acessar Marte 101</a>
      <p>Aqui estão algumas das incríveis funcionalidades que você encontrará em nossa plataforma:</p>
      <ol>
          <li>Previsões meteorológicas em tempo real de Marte.</li>
          <li>Notícias espaciais e atualizações sobre as missões a Marte [em breve]</li>
          <li>Conteúdo educativo e informativo sobre o Planeta Vermelho [em breve]</li>
          <li>Uma comunidade de entusiastas da exploração espacial [em breve].</li>
      </ol>
      <p>Nós estamos aqui para ajudar e garantir que você tenha uma experiência incrível em Marte 101. Se tiver alguma dúvida ou precisar de assistência, nossa equipe de suporte está à disposição para ajudar.</p>
      <p>Prepare-se para embarcar em uma jornada emocionante de descoberta espacial! O Planeta Vermelho está esperando por você.</p>
      <p>Seja bem-vindo e aproveite sua estadia!</p>
      <p>Atenciosamente,</p>
      <p>Equipe Marte 101</p>
      `;
  }
}
