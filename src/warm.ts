import { program } from 'commander';
import ora from 'ora';
import chalk from 'chalk';
import assert from 'assert';
import { Sls } from './components/sls';
import { Faas } from './components/faas';
import { Credential, WarmOptions } from './typings';

const getCredential = (): Credential | null => {
  const { TENCENT_SECRET_ID, TENCENT_SECRET_KEY, TENCENT_TOKEN } = process.env;
  if (TENCENT_SECRET_ID && TENCENT_SECRET_KEY) {
    return {
      secretId: TENCENT_SECRET_ID,
      secretKey: TENCENT_SECRET_KEY,
      token: TENCENT_TOKEN,
    };
  }
  return null;
};

export async function warm(options: WarmOptions): Promise<boolean> {
  let isWarmUped = false;
  const credential = getCredential();
  if (credential) {
    const spinner = ora();
    try {
      if (options.type === 'function') {
        spinner.start(`Warming up function ${options.functionName}`);
        const faas = new Faas({
          ...credential,
          region: options.region,
        });
        isWarmUped = await faas.warmUp(options);
      } else {
        assert(options.name, '[OPTIONS] name is required');
        assert(options.app, '[OPTIONS] app is required');
        spinner.start(
          `Warming up application ${options.app}, stage ${options.stage}, name ${options.name}`,
        );
        const sls = new Sls({
          ...credential,
          region: options.region,
        });
        isWarmUped = await sls.warmUp(options);
      }

      if (isWarmUped) {
        spinner.succeed('Warm up success');
      } else {
        spinner.stop();
      }
    } catch (e) {
      spinner.fail(e.message);
    }
  } else {
    console.log(chalk.red(`Missing credential information!`));
  }
  return isWarmUped;
}

const warmCommand = (): void => {
  program
    .command('warm')
    .description('Warm up serverless application')
    .option('-r, --region [region]', 'region of function', 'ap-guangzhou')
    .option('-n, --name [name]', 'name config in serverless.yml')
    .option('-a, --app [app]', 'app name')
    .option('-s, --stage [stage]', 'app stage', 'dev')
    .option('-o, --org [org]', 'app org name')
    .option('-f, --function-name [functionName]', 'app function name')
    .action((options) => {
      warm({
        type: options?.functionName ? 'function' : 'app',
        ...options,
      });
    });
};

export { warmCommand };
