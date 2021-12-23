import * as dotenv from 'dotenv';
import * as path from 'path';

const ENV_LOCAL_PATH = path.resolve(__dirname, "../../../.env.local");

export interface Environment {
  STAGE: "prod" | "dev";
}

function isEnvironment(env: any): env is Environment {
  if (typeof env !== 'object') {
    return false;
  }

  if (!["prod", "dev"].includes(env.STAGE)) {
    return false;
  }

  return true;
}

function loadEnv(): Environment {
  const dotenvConfig = dotenv.config({
    path: ENV_LOCAL_PATH
  });

  if (dotenvConfig.error) {
    // console.error(dotenvConfig.error);
    throw dotenvConfig.error;
  }

  const env = dotenvConfig.parsed;

  if (!env) {
    // console.error('Failed to load env: empty');
    throw 'Failed to load env: empty';
  }

  if (!isEnvironment(env)) {
    // console.error('Failed to load env: typeguard returned false');
    throw 'Failed to load env: typeguard returned false';
  }

  return {
    STAGE: env.STAGE,
  };
}

let env: Environment | void;
export function getEnvironment(): Environment {
  return !!env ? env : env = loadEnv();
}
