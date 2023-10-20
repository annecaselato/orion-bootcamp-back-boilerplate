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

export class UserService {
  getAllUsers = () => {
    return DB;
  };
}

export const autenticacaoUser = (
  useremail: string,
  password: string
): db | undefined => {
  return DB.find(
    (user) => user.email === useremail && user.password === password
  );
};
