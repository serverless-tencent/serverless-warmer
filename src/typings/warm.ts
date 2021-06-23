import { AnyObject } from '.';

export interface WarmOptions {
  name?: string; // the name configured in serverless.yml
  qualifier?: string; // scf version, default: '$LATEST'
  namespace?: string; // scf namespace, default: 'default'
  region?: string; // application deploy region
  stage?: string; // the stage configured in serverless.yml, default: 'dev'
  app?: string; // the app configured in serverless.yml
  org?: string; // the org name configured in serverless.yml
  functionName?: string; // scf function name
  type: string; // fixed value: 'app'
}

export interface GetInstanceRequest {
  stage: string;
  app: string;
  name: string;
  region?: string;
  appid?: string;
  orgName?: string;
}

export interface SrcObject {
  src?: string;
  dist?: string;
  hook?: string;
  exclude?: string[];
}

export interface SlsInputs {
  src?: string | SrcObject;
  [propName: string]: any;
}

export interface Instance {
  appName: string;
  appUid: string;
  componentName: string;
  componentVersion: string;
  deploymentError: string | null;
  deploymentErrorStack: string | null;
  description: string | null;
  instanceId: string;
  instanceName: string;
  instanceStatus: string;
  orgName: string;
  stageName: string;
  lastAction: string;
  inputs: SlsInputs;
  lastActionAt: number;
  lastDeployedAt: number;
  orgUid: number;
  createdAt: number;
  updatedAt: number;
  instanceMetrics: AnyObject;
  outputs: AnyObject;
  state: AnyObject;
}
