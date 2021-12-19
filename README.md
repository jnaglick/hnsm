## HNSM
---

## Local development

Prereqs:

1. use nvm or the node thats in .nvmrc

To setup:

```
npm run bootstrap
```

To start in local dev mode:

```
npm run start:dev
```

NOTE: There's a know issue with this command where you can't see output from the scripts. Navigate to localhost:8080 or localhost:9000 ...

## Deployment

Prereqs:

1. Add a profile to ~/.aws/credentials named "hnsm" with an IAM access key pair (See https://docs.aws.amazon.com/IAM/latest/UserGuide/id_credentials_access-keys.html#Using_CreateAccessKey). This will be used for managing cloudformation resources.

2. Setup the cdk cli if you haven't already. See https://docs.aws.amazon.com/cdk/latest/guide/getting_started.html (TLDR: install aws-cdk as a global npm package, run `cdk bootstrap` with your account number and region)

3. (Optional for now) Be logged in to docker

To deploy:

1. Build the code with either `npm run build` or `npm run build:in-container` in a module directory with deployable code (eg src/web-api) or in the root dir to build everything.

2. In the infrastructure module:

    a. (optional) `npm run cdk:diff` to see the changeset

    b. `cdk:deploy:all` to deploy everything (there are also stack-specific scripts)

This will be automated and improved eventually!

## Issues

- shared deps (typescript, jest) are duplicated across every package, shouldn't they be shared? ((am i use lerna wrong?))
- lerna doesnt bind tty, so when running the top-level scripts that use `lerna run ...`, you cant see server output or do shell interaction with the inner npm scripts, which is really painful and makes cdk deploys requiring shell interaction impossible...
- inf specs fail if no dist/ on local fs. need way to inject/mock this
- inf spec snapshot is _always_ different for web-client, and (expectedly) different when web-api dist changes. same as above, need way to inject/mock this
- need something that unifies build+deploy steps

## TODO

- use tsconfig-paths (specifically in inf package because it doesnt use webpack)
- better use of extends in tsconfig. web-client one is mostly a copy+paste of base one
- unify how dependencies vs devDependencies are listed. (ofc this is just a formality because all deployed code is bundled, and ci/cd needs to build and test...)
