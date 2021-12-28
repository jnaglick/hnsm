import * as path from "path";
import * as cdk from "@aws-cdk/core";
import * as cloudfront from "@aws-cdk/aws-cloudfront";
import * as cloudfrontOrigins from "@aws-cdk/aws-cloudfront-origins";
import * as s3 from "@aws-cdk/aws-s3";
import * as s3Deployment from "@aws-cdk/aws-s3-deployment";

// TODO tsconfig-paths with cdk
import { getStage } from "../app";

// TODO better solution
const WEB_CLIENT_DIST = path.resolve(__dirname, "../../../web-client/dist");

export class WebClientStack extends cdk.Stack {
  constructor(scope: cdk.App, id: string) {
    super(scope, id, {
      stackName: `${getStage(scope)}-${id}`,
    });

    const webClientBucket = new s3.Bucket(this, "WebClientBucket", {
      accessControl: s3.BucketAccessControl.PRIVATE,
    });

    // dont use s3Deployment.Source.asset, just cp directly to webClientBucket
    new s3Deployment.BucketDeployment(this, "BucketDeployment", {
      destinationBucket: webClientBucket,
      sources: [s3Deployment.Source.asset(WEB_CLIENT_DIST)],
    });

    const originAccessIdentity = new cloudfront.OriginAccessIdentity(
      this,
      "OriginAccessIdentity"
    );
    webClientBucket.grantRead(originAccessIdentity);

    new cloudfront.Distribution(this, "WebClientDistribution", {
      defaultRootObject: "index.html",
      defaultBehavior: {
        origin: new cloudfrontOrigins.S3Origin(webClientBucket, {
          originAccessIdentity,
        }),
      },
    });
  }
}
