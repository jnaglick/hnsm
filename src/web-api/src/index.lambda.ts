import { ALBEvent, Context, ALBResult } from "aws-lambda";

import { Application } from "./application";

const app = new Application();

export async function handler(
  event: ALBEvent,
  context: Context
): Promise<ALBResult> {
  return app.handler(event, context);
}
