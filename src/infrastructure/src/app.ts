import * as cdk from "@aws-cdk/core";

import { WebApiStack, WebClientStack } from "./stacks";

export interface AppContext {
  STAGE: string;
}

export class App extends cdk.App {
  constructor(context: AppContext) {
    super({
      context,
    });

    new WebApiStack(this, "WebApiStack");
    new WebClientStack(this, "WebClientStack");
  }
}

function getContext<K extends keyof AppContext>(
  construct: cdk.Construct,
  k: K
): AppContext[K] {
  return construct.node.tryGetContext(k);
}

export function getStage(construct: cdk.Construct) {
  return getContext(construct, "STAGE");
}
