// require all commands here
const pronounsAt = require('./message/pronounsAt');
const pronounsArg = require('./message/pronounsArgs');

// add to array
const messageCommands = [pronounsAt, pronounsArg];

// export to index.js

module.exports.messageCommands = messageCommands;