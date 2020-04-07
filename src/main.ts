#!/usr/bin/env node

import imageToPdf from 'images-to-pdf';
import fs from 'fs';
import chalk from 'chalk';
import path from 'path';
import pkg from '../package.json';

const [,,secondArg, generateName] = process.argv;
const baseDir: string = path.join(process.cwd(), secondArg);

const versionCmd = () => {
  console.log(`v${pkg.version}`);
}
const helpCmd = () => {
  console.log(pkg.bin);

  const cmdName = chalk.yellow('itp');
  console.log(`
  Usage:
    1. ${cmdName} path/to/file pdf_name
    2. ${cmdName} Command

    ${chalk.red('file extension limitation: png, jpg')}

  Command:
    -v, --version : Show version
    -h, --help    : Show help
  `);
}
const mainCmd = () => {
  fs.readdir(baseDir, (_, files) => {
    const filterImg = files.filter(file => file.includes('.png') || file.includes('.jpg'));
    let fullPathImg: string[] = [];
    filterImg.forEach((img, index) => {
      const pageNum = index + 1;
      fullPathImg.push(`${baseDir}${img}`);
      console.log(`page${String(pageNum).padStart(3, '0')} : ${baseDir}${img}`);
    })
    imageToPdf(fullPathImg, `${baseDir}${generateName}.pdf`);
    console.log(chalk.green('generate PDF!!!!!!\n'));
  });
}

switch (secondArg) {
  case '-v' || '--version':
    versionCmd();
    break;
  case '-h' || '--help':
    helpCmd();
    break;
  default:
    mainCmd();
    break;
}