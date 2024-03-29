import * as apiGateway from "@aws-cdk/aws-apigateway";
import * as cdk from "@aws-cdk/core";
import * as lambda from "@aws-cdk/aws-lambda";
import * as path from "path";

// TODO tsconfig-paths with cdk
import { getStage } from "../app";

// TODO better solution
const WEB_API_DIST = path.resolve(__dirname, "../../../web-api/dist");

export interface WebApiStackOptions {
  lambdaCodeAssetPath: string;
}

export class WebApiStack extends cdk.Stack {
  constructor(scope: cdk.App, id: string) {
    super(scope, id, {
      stackName: `${getStage(scope)}-${id}`,
    });

    const handler = new lambda.Function(this, "Lambda", {
      runtime: lambda.Runtime.NODEJS_12_X,
      handler: "bundle.handler",
      code: lambda.Code.fromAsset(WEB_API_DIST),
    });

    const integration = new apiGateway.LambdaIntegration(handler, {
      requestTemplates: { "application/json": '{ "statusCode": "200" }' },
    });

    const api = new apiGateway.RestApi(this, "ApiGateway");

    api.root.addMethod("GET", integration);
  }
}
