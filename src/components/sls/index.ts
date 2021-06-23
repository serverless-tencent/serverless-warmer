import { Capi } from '@tencent-sdk/capi';
import chalk from 'chalk';
import { Credential, Instance, GetInstanceRequest, WarmOptions } from '../../typings';
import { Faas } from '../faas';
import { TAPI } from '../../apis';

const { request } = TAPI;

class Sls {
  capi: Capi;
  constructor({ secretId, secretKey, token, region = 'ap-guangzhou' }: Credential) {
    this.capi = new Capi({
      SecretId: secretId,
      SecretKey: secretKey,
      Token: token,
      Region: region,
      ServiceType: 'sls',
      RequestClient: 'slsplus_instance',
      Version: '2020-02-05',
      debug: true,
    });
  }

  async getInstance({
    app,
    stage = 'dev',
    name,
    orgName,
  }: GetInstanceRequest): Promise<Instance | undefined> {
    try {
      const { Body } = await request(this.capi, {
        Action: 'GetInstance',
        Body: JSON.stringify({
          stageName: stage,
          appName: app,
          instanceName: name,
          orgName,
        }),
      });

      return JSON.parse(JSON.parse(Body).body).instance;
    } catch (e) {
      console.log(e.message);
      return undefined;
    }
  }

  async warmUp({ app = '', stage = 'dev', name = '', org='' }: WarmOptions): Promise<boolean> {
    // 1. get instance
    const faas = new Faas({
      secretId: this.capi.options.SecretId,
      secretKey: this.capi.options.SecretKey,
      token: this.capi.options.Token,
      region: this.capi.options.Region,
    });

    const instance = await this.getInstance({
      app,
      stage,
      name,
      orgName: org,
    });

    if (instance) {
      const functionName = instance?.state?.functionName as string;
      const qualifier = instance?.state?.lastVersion as string;
      const namespace = instance?.state?.namespace as string;

      // 2. invoke function for warming up
      return faas.warmUp({
        type: 'function',
        functionName,
        qualifier,
        namespace,
      });
    }
    console.log(
      chalk.yellow(`\n[Warning] App: ${app}, stage: ${stage}, instance: ${name} not exist`),
    );

    return false;
  }
}

export { Sls };
