import * as cdk from "@aws-cdk/core";

import { WebApiStack, WebClientStack } from "./stacks";

export interface AppContext {
  STAGE: string;
}

export class App extends cdk.App {
  public readonly stacks: cdk.Stack[] = [];

  constructor(context: AppContext) {
    super({
      context,
    });

    this.addStack(new WebApiStack(this, "WebApiStack"));

    this.addStack(new WebClientStack(this, "WebClientStack"));
  }

  private addStack(stack: cdk.Stack) {
    this.stacks.push(stack);
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
