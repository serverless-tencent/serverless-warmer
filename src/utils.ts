// eslint-disable-next-line
const { ServerlessSDK } = require('@serverless/platform-client-china');

function getServerlessSdk(orgName: string | number) {
  const sdk = new ServerlessSDK({
    context: { orgName },
  });
  return sdk;
}

module.exports = { getServerlessSdk };
