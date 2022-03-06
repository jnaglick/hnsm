import { getEnvironment } from "$common/environment";

import { App } from "./app";

const env = getEnvironment();

new App({
  STAGE: env.STAGE,
});
