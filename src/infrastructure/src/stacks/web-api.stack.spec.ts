import * as cdk from "@aws-cdk/core";
import { SynthUtils } from "@aws-cdk/assert";

import { WebApiStack } from "./web-api.stack";

describe("WebApiStack", () => {
  it("should match snapshot", () => {
    // arrange
    const stack = new WebApiStack(
      new cdk.App({
        context: {
          stage: "test",
        },
      }),
      "WebApiStack"
    );

    // act
    const snapshot = SynthUtils.toCloudFormation(stack);

    // assert
    expect(snapshot).toMatchSnapshot();
  });
});
