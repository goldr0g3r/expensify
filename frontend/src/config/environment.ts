export interface IEnvironment {
  backendUrl: string;
}

const environment: IEnvironment = {
  backendUrl: process.env.REACT_APP_BACKEND_URL || "",
};

if (!environment.backendUrl) {
  console.error("BACKEND_URL is not set");
}

export default environment;
