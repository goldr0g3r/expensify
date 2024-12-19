export default interface IEnvironment {
  port: number;
  mongoURI: string;
  nodeEnv: string;

  userDatabase: string;
  expenseDatabase: string;
  categoryDatabase: string;

  accessTokenSecret: string;
  refreshTokenSecret: string;
  accessTokenExpiresIn: string;
  refreshTokenExpiresIn: string;
  cookieSecret: string;
}
