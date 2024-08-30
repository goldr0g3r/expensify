export interface IEnvironment {
  backendUrl: string;
}

const environment: IEnvironment = {
  backendUrl: process.env.BACKEND_URL || "",
};

if (!environment.backendUrl) {
  throw new Error("BACKEND_URL is not set");
}

export default environment;
