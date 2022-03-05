## HNSM
---

## Local development

Prereqs:

1. Use nvm or the node thats in .nvmrc

2. Create .env.local from example and fill it out:

```
cp .env.local.example .env.local
```

3. Install deps in all packages:

```
npm run install:all
```

4. Finally, start all services in local dev mode:

```
npm run start:dev
```

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

- inf specs fail if no dist/ on local fs. need way to inject/mock this
- inf spec snapshot changes when code changes. same as above, need way to inject/mock this
- need something that unifies build+deploy steps

## TODO

- cant use lerna hoist because some package (i forget which) doesnt respect node_modules recursive lookup (wont fix?)
