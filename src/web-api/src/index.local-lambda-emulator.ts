import { ALBEvent } from "aws-lambda";
import { createServer, IncomingMessage, ServerResponse } from "http";
import { parse } from "url";

import { Application } from "./application";

const app = new Application();

createServer((req: IncomingMessage, res: ServerResponse) => {
  (async (req, res) => {
    // -> map req to event
    const { pathname: path /* query */ } = parse(req.url as string, true);

    const event: Partial<ALBEvent> = {
      path: path ?? "",
      httpMethod: req.method ?? "GET",
      body: "TODO",
      // TODO headers
      // TODO query params (queryStringParameters: query)
    };

    // -> invoke handler
    const handlerResponse = await app.handler(event as ALBEvent);

    // <- map handlerResponse to res
    res.statusCode = handlerResponse.statusCode;

    if (handlerResponse.body) {
      res.write(handlerResponse.body);
    }

    // TODO headers

    // <- finish
    res.end();
  })(req, res);
}).listen(8080);

console.log("apigw lambda proxy mock server 🟢 listening on 8080");
