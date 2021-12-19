import * as cdk from "@aws-cdk/core";
import { SynthUtils } from "@aws-cdk/assert";

import { WebClientStack } from "./web-client.stack";

describe("WebClientStack", () => {
  it("should match snapshot", () => {
    // arrange
    const stack = new WebClientStack(
      new cdk.App({
        context: {
          stage: "test",
        },
      }),
      "WebClientStack"
    );

    // act
    const snapshot = SynthUtils.toCloudFormation(stack);

    // assert
    expect(snapshot).toMatchSnapshot();
  });
});
