// eslint-disable-next-line
const { getServerlessSdk } = require('../src/utils');
import { Instance } from '../src/typings';
import { warm } from '../src/warm';

describe('Warm command test', () => {
  const credentials = {
    tencent: {
      SecretId: process.env.TENCENT_SECRET_ID,
      SecretKey: process.env.TENCENT_SECRET_KEY,
    },
  };

  let instance: Instance;
  const instanceYaml = {
    app: 'expressWarmDemo',
    name: 'testExpressWarm',
    component: 'express',
    org: 'orgDemo',
    stage: 'dev',
    inputs: {
      region: 'ap-guangzhou',
      runtime: 'Nodejs10.15',
      functionName: 'expressTestFunc',
      apigatewayConf: {
        protocols: ['http', 'https'],
        environment: 'release',
      },
    },
  };

  const sdk = getServerlessSdk(instanceYaml.org);

  beforeAll(async () => {
    // deploy serverless application
    instance = await sdk.deploy(instanceYaml, credentials);
  });

  afterAll(async () => {
    // remove serverless application
    await sdk.remove(instanceYaml, credentials);
  });

  test(`should success warm up application ${instanceYaml.app}`, async () => {
    const res = await warm({
      type: 'app',
      name: instance.instanceName,
      app: instance.appName,
      stage: instance.stageName,
    });

    expect(res).toEqual(true);
  });

  test(`should success warm up function ${instanceYaml.inputs.functionName}`, async () => {
    const res = await warm({
      type: 'function',
      functionName: instanceYaml.inputs.functionName,
    });

    expect(res).toEqual(true);
  });
});
