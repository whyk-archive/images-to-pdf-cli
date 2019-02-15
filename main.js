#!/usr/bin/env node

const imageToPdf = require('images-to-pdf');
const fs = require('fs');
const chalk = require('chalk');
const path = require('path');

const argv = process.argv;
const baseDir = path.join(__dirname, argv[2]);
const generateName = argv[3];

fs.readdir(baseDir, (err, files) => {
  const filterImg = files.filter(file => file.includes('.png') || file.includes('.jpg'));
  let fullPathImg = [];
  filterImg.forEach(img => {
    fullPathImg.push(`${baseDir}${img}`);
  })
  imageToPdf(fullPathImg, `${baseDir}${generateName}.pdf`);
  console.log(chalk.green('generate PDF!!!!!!'));
});