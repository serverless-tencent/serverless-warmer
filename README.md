# Serverless Warmer

Application Warmer for Serverless Framework.

- [@slsplus/warmer](#Serverless-Warmer)
  - [Installation](#installation)
  - [Usage](#usage)
    - [Warm up serverless application](#Warm-up-serverless-application)
    - [Warm up serverless cloud function](#Warm-up-serverless-cloud-function)

## Installation

```bash
$ npm i @slsplus/warm -g
```

## Usage

```bash
Usage: ywarm [options]

Warm up serverless application with customize variables

Options:
  -v, --version                       output the current version
  -n, --name [name]                   instance name, name config in serverless.yml
  -a, --app [app]                     app name, app config in serverless.yml
  -r, --region [region]               region of function (default: 'ap-guangzhou')
  -s, --stage [stage]                 app stage, stage config in serverless.yml (default: 'dev')
  -o, --org [org]                     app org name, org config in serverless.yml
  -f, --function-name [functionName]  cloud function name
  -h, --help                          display help for command

Example call:
  $ ywarm --help
```

### Warm up serverless application

```bash
$ ywarm --name=expressdemo --app=appname --stage=dev --org=myorg
```

### Warm up serverless cloud function

```bash
$ ywarm -f 'express_jyovx1a'
```

## License

MIT License

Copyright (c) 2021 Tencent Cloud, Inc.
