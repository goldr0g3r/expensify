export interface IEnvironment {
  mongoURI: string;
  port: number;
  nodeEnv: string;

  // database names for an expense tracer
  userDB: string;
  categoryDB: string;
  transactionDB: string;

  // secret for jwt
  accessTokenSecret: string;
  refreshTokenSecret: string;
  refreshTokenLife: string;
  accessTokenLife: string;
}
