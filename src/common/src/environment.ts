import * as dotenv from "dotenv";
import * as path from "path";

const ENV_LOCAL_PATH = path.resolve(__dirname, "../../../.env.local");

export enum DeploymentBehavior {
  "local",
  "testing",
  "prod",
}

export enum DeploymentStage {
  "dev",
  "preprod",
  "prod",
}

export enum AwsRegions {
  "us-east-1",
  "us-west-1",
}

export interface AwsEnv {
  AWS_ACCOUNT: string;
  AWS_REGION: AwsRegions; // TODO use type from @aws pkg
}

export interface ENV {
  STAGE: DeploymentStage;
  AWS_ENV: AwsEnv;
}

/* eslint-disable @typescript-eslint/no-explicit-any */
function isEnvironment(env: any): env is ENV {
  if (typeof env !== "object") {
    return false;
  }

  // TODO
  if (!["dev", "preprod", "prod"].includes(env.STAGE)) {
    return false;
  }

  if (!["us-east-1", "us-west-2"].includes(env.REGION)) {
    return false;
  }


  return true;
}

function loadEnv(): ENV {
  const dotenvConfig = dotenv.config({
    path: ENV_LOCAL_PATH,
  });

  if (dotenvConfig.error) {
    throw dotenvConfig.error;
  }

  const env = dotenvConfig.parsed;

  if (!env) {
    throw "Failed to load env: empty";
  }

  if (!isEnvironment(env)) {
    throw "Failed to load env: typeguard returned false";
  }

  return env;
}

let env: ENV | void;
export function getEnvironment(): ENV {
  return env ? env : (env = loadEnv());
}
