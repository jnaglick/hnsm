import * as cdk from "@aws-cdk/core";
import * as path from "path";
import * as s3 from "@aws-cdk/aws-s3";
import * as cloudfront from "@aws-cdk/aws-cloudfront";
import { S3Origin } from "@aws-cdk/aws-cloudfront-origins";
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

    const bucket = new s3.Bucket(this, "Bucket", {
      accessControl: s3.BucketAccessControl.PRIVATE,
    });

    new s3Deployment.BucketDeployment(this, "BucketDeployment", {
      destinationBucket: bucket,
      sources: [s3Deployment.Source.asset(WEB_CLIENT_DIST)],
    });

    const originAccessIdentity = new cloudfront.OriginAccessIdentity(
      this,
      "OriginAccessIdentity"
    );
    bucket.grantRead(originAccessIdentity);

    new cloudfront.Distribution(this, "Distribution", {
      defaultRootObject: "index.html",
      defaultBehavior: {
        origin: new S3Origin(bucket, { originAccessIdentity }),
      },
    });
  }
}
