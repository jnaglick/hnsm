import { SynthUtils } from "@aws-cdk/assert";

import { App } from "./app";

describe("App", () => {
  it("should create stacks", () => {
    // arrange
    const app = new App({
      STAGE: "test"
    });

    // act
    const snapshots = app.stacks.map((stack) => SynthUtils.toCloudFormation(stack));

    // assert
    expect(snapshots).toMatchSnapshot();
  });
});
