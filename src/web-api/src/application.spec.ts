import { ALBEvent } from "aws-lambda";

import { Application } from "./application";

describe("Application", () => {
  it("should have root handler", async () => {
    // arrange
    const app = new Application();

    // act
    const result = await app.handler({ path: "/" } as ALBEvent);

    // assert
    expect(result).toStrictEqual({
      statusCode: 200,
      body: JSON.stringify({ counter: 1 }),
    });
  });
});
