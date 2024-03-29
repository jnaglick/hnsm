import { ALBEvent, ALBResult, Context } from "aws-lambda";

export type LambdaProxyHandlerFunction = (
  event: ALBEvent,
  context?: Context
) => Promise<ALBResult>;

export class Application {
  public handler: LambdaProxyHandlerFunction = async (
    event: ALBEvent,
    context?: Context
  ): Promise<ALBResult> => {
    if (this.handlers[event.path]) {
      return this.handlers[event.path](event, context);
    }

    return new ALBResultBuilder().statusCode(400).build();
  };

  private state: {
    counter: number;
  } = {
    counter: 0,
  };

  private handlers: {
    [key: string]: LambdaProxyHandlerFunction;
  } = {};

  constructor() {
    this.addRootHandler();
  }

  private addRootHandler() {
    this.handlers["/"] = async (
      event: ALBEvent,
      context?: Context
    ): Promise<ALBResult> => {
      console.log("event", event);
      console.log("context", context);

      this.state.counter += 1;

      return new ALBResultBuilder().statusCode(200).body(this.state).build();
    };
  }
}

// fun pattern but this probably aint necessary

class Builder<T> {
  protected state: T;

  constructor(state: T) {
    this.state = state;
  }

  public build(): T {
    return this.state;
  }

  protected set<K extends keyof T>(key: K, value: T[K]) {
    this.state[key] = value;
    return this;
  }
}

class ALBResultBuilder extends Builder<ALBResult> {
  constructor() {
    super({
      statusCode: 500,
    });
  }

  public statusCode(statusCode: number): this {
    return this.set("statusCode", statusCode);
  }

  public body(body: object): this {
    return this.set("body", JSON.stringify(body));
  }
}
