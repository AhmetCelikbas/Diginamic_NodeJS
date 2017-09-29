#!/usr/bin/env node
const program = require('commander');
const main = require('../src/main');

program
  .version('1.0.0')
  .option('-l, --list', 'Get the pubs list')
  .option('-o, --opened', 'Get the pubs list')
  .parse(process.argv);


if (program.list) {
  console.log(main.getListPub());
}

if (program.opened) {
  console.log(main.getListPubsOuvertAujourdHui());
}
