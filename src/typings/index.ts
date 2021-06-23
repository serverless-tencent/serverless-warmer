export * from './warm';
export * from './faas';

export interface AnyObject {
  [prodName: string]: any;
}

export interface Credential {
  secretId: string;
  secretKey: string;
  token?: string;
  region?: string;
}

