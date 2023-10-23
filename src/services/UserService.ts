interface db {
  name: string;
  email: string;
  password: string;
}

const DB: db[] = [
  {
    name: 'nome1',
    email: 'email1@teste.com',
    password: 'senha1'
  },
  {
    name: 'nome2',
    email: 'email2@teste.com',
    password: 'senha2'
  }
];

export const autenticacaoUser = (
  useremail: string,
  userpassword: string
): db | undefined => {
  return DB.find(
    (user) => user.email === useremail && user.password === userpassword
  );
};
