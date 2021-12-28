import { App } from "./app";

// TODO tsconfig-paths ...
import { getEnvironment } from "../../common/src";

const env = getEnvironment();

new App({
  STAGE: env.STAGE,
});
