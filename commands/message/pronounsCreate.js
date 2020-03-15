// imports
const roleManager = require('../../utils/roles/roleManager');

// exports
module.exports = {
    async execute(message) {
        const splitArgs = message.content.split(' ');
        splitArgs.shift();
        splitArgs.shift();
        const pronouns = splitArgs;
        if (pronouns.length > 3) {
            await message.channel.send('You cannot handle that many pronouns at one time. You may only select up to three pronouns in one message');
            return;
        }
        for (const string of pronouns) {
            const guildRole = message.guild.roles.cache.find(r => r.name === string);
            if (guildRole) {
                await message.channel.send(`The ${string} pronouns are already in stock`);
                break;
            }
            const details = await roleManager.addRoles(string.toLowerCase(), message.guild);
            const roleMessage = `${message.author.username}, We now have the strongest of my ${details.tag} Pronouns in stock`;
            await message.channel.send(roleMessage);
        }

    },
};

module.exports.info = {
    name: 'Pronouns',
    description: 'Get your pronouns from the Pronoun seller',
    summon: 'arguments',
    visible: true,
};
module.exports.settings = {
    regexp: /^!pronounsCreate/mi,
    tag: 'pronounsCreate',
};
