// imports
const Discord = require('discord.js');
const config = require('./config.json');
const commandList = require('./commands/command');

// start client
const client = new Discord.Client;

// message commands
client.messageCommands = new Discord.Collection();
const messageCommList = commandList.messageCommands;
for (const file of messageCommList) {
    client.messageCommands.set(file.settings.tag, file);
}

// insert message loops here

client.on('message', message => {
    const mentioned = message.mentions.has(client.user);
    if (message.author.bot) return;
    if (!message.guild) return;
    const splitArgs = message.content.split(' ');
    const firstArg = splitArgs.shift();

    if (mentioned === true && firstArg.includes(client.user.id)) {
        if (splitArgs.length !== 0) {
            client.messageCommands.get('pronounsArgs').execute(message);
            return;
        }
        else {
            client.messageCommands.get('pronouns@').execute(message);
            return;
        }

    }
});

// everything after this point doesn't need to be touched normally
client.on('ready', () => {
	console.log(`I'm up, and i'm part of ${client.guilds.cache.size} servers`);
});

client.login(config.token)
    .then(console.log('Logging In'))
    .catch(console.error);

client.on('error', data => {
    console.error('Connection Error', data.message);
});

client.on('disconnect', data => {
    console.error('I have Disconnected', data.message);
    autoRestartServer();
});

process.on('unhandledRejection', error => console.error('Uncaught Promise Rejection', error));

function autoRestartServer() {
    setTimeout(() => {
        if (!client.status == 0) process.exit(1);
    }, 1500);
}