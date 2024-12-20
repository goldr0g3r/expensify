export interface ILoginRequest {
  username: string;
  email?: string;
  password: string;
}

export interface ILoginWithEmailRequest {
  email: string;
  password: string;
}
