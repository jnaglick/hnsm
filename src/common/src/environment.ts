import * as dotenv from "dotenv";
import * as path from "path";

const ENV_LOCAL_PATH = path.resolve(__dirname, "../../../.env.local");

enum Stages {
  "dev",
  "preprod",
  "prod",
}

enum Regions {
  "us-east-1",
  "us-west-1",
}

export interface ENV {
  STAGE: Stages;
  REGION: Regions;
}

/* eslint-disable @typescript-eslint/no-explicit-any */
function isEnvironment(env: any): env is ENV {
  if (typeof env !== "object") {
    return false;
  }

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
