import { App } from "./app";

import { getEnvironment } from "$common/environment";

const env = getEnvironment();

new App({
  STAGE: env.STAGE,
});
