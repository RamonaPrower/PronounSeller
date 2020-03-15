// require all commands here
const pronounsAt = require('./message/pronounsAt');
const pronounsArg = require('./message/pronounsArgs');
const pronounsCreate = require('./message/pronounsCreate');

// add to array
const messageCommands = [pronounsAt, pronounsArg, pronounsCreate];

// export to index.js

module.exports.messageCommands = messageCommands;