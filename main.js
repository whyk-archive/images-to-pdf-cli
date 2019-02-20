#!/usr/bin/env node

const imageToPdf = require('images-to-pdf');
const fs = require('fs');
const chalk = require('chalk');
const path = require('path');
const pkg = require('./package.json');

const argv = process.argv;
const baseDir = path.join(__dirname, argv[2]);
const generateName = argv[3];

const versionCmd = () => {
  console.log(`v${pkg.version}`);
}
const helpCmd = () => {
  const cmdName = chalk.yellow(Object.keys(pkg.bin));
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
  fs.readdir(baseDir, (err, files) => {
    const filterImg = files.filter(file => file.includes('.png') || file.includes('.jpg'));
    let fullPathImg = [];
    filterImg.forEach((img, index) => {
      const pageNum = index + 1;
      fullPathImg.push(`${baseDir}${img}`);
      console.log(`page${String(pageNum).padStart(3, '0')} : ${baseDir}${img}`);
    })
    imageToPdf(fullPathImg, `${baseDir}${generateName}.pdf`);
    console.log(chalk.green('generate PDF!!!!!!\n'));
  });
}

switch (argv[2]) {
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