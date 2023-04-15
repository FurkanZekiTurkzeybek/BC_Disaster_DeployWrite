const path = require('path');
const fs = require('fs');
const solc = require('solc');

const personPath = path.resolve(__dirname,'contracts','person.sol');
const source = fs.readFileSync(personPath,'utf8');

module.exports = solc.compile(source,1).contracts[':Person'];
