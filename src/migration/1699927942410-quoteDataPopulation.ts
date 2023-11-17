import { MigrationInterface, QueryRunner } from 'typeorm';

const QUOTES = [
  {
    author: 'Margaret Hamilton',
    quote:
      'Se o código de segurança não estivesse lá, a nave inteira entraria em pane e talvez não fosse dessa vez que alguém teria pousado na lua.'
  },
  {
    author: 'Kurt Gödel',
    quote: 'Ou a matemática é grande demais para a mente humana ou a mente humana é mais do que uma máquina.'
  },
  {
    author: 'Carl Sagan',
    quote: 'O cosmos não apenas nos contempla, ele também nos contempla, é uma das razões pelas quais ele é tão fascinante.'
  },
  {
    author: 'Konstantin Tsiolkovsky',
    quote: 'A Terra é a berçaria da humanidade, mas ninguém pode viver na berçaria para sempre.'
  },
  {
    author: 'Yuri Gagarin',
    quote: 'A exploração do espaço vai continuar enquanto houver homens de imaginação e coragem.'
  },
  {
    author: 'Leo Burnett',
    quote: 'A curiosidade sobre a vida em todos os aspectos é o segredo dos grandes criativos.'
  },
  {
    author: 'Victor Hugo',
    quote: 'Para pequenos seres, pequenos planetas; para grandes almas, grandes mundos.'
  },
  {
    author: 'Stephen Hawking',
    quote: 'Não há limites para a imaginação humana. As descobertas espaciais ainda estão em sua infância.'
  },
  {
    author: 'Buzz Aldrin',
    quote: 'Tudo que temos é o aqui e o agora. Por que não explorar o desconhecido e ver o que está por vir?'
  },
  {
    author: 'Eleanor Roosevelt',
    quote: 'O futuro pertence a aqueles que acreditam na beleza de seus sonhos.'
  },
  {
    author: 'Arthur C. Clarke',
    quote: 'O espaço é grande o suficiente para todos. Não há necessidade de guerras.'
  },
  {
    author: 'Carl Sagan',
    quote:
      'O limite entre o espaço e a Terra é puramente arbitrário. E eu provavelmente sempre estarei interessado nesse planeta – é o meu favorito.'
  }
];

export class QuoteDataPopulation1699927942410 implements MigrationInterface {
  /**
   * up
   *
   * Executa as operações de inserção de dados na tabela "Quotes" durante a migração.
   *
   * @param queryRunner - O QueryRunner utilizado para executar as consultas no banco de dados.* @returns Uma Promise que é resolvida quando a operação é concluída.
   */
  public async up(queryRunner: QueryRunner): Promise<void> {
    for (const quoteData of QUOTES) {
      const newQuote = await queryRunner.manager.create('Quote', {
        author: quoteData.author,
        quote: quoteData.quote
      });

      await queryRunner.manager.save('Quote', newQuote);
    }
  }

  /**
   * down
   *
   * Executa as operações de exclusão de dados na tabela "Quotes" durante a reversão da migração.
   *
   * @param queryRunner - O QueryRunner utilizado para executar as consultas no banco de dados.
   */
  public async down(queryRunner: QueryRunner): Promise<void> {
    for (const quoteData of QUOTES) {
      await queryRunner.manager.delete('Quote', { author: quoteData.author, quote: quoteData.quote });
    }
  }
}
