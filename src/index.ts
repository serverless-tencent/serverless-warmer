#!/usr/bin/env node

import { program } from 'commander';
import { warmCommand } from './warm';

// eslint-disable-next-line
const { version } = require('../package.json');

async function run() {
  program.storeOptionsAsProperties(false).passCommandToAction(false);
  program.version(
    `Serverless Warmer Version: ${version}`,
    '-v, --version',
    'output the current version',
  );

  // inject sub commands
  warmCommand();

  program.on('--help', () => {
    console.log('');
    console.log('Example call:');
    console.log('  $ ywarm --help');
  });

  program.parse(process.argv);
}

run();
