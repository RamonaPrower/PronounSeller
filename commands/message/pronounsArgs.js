// imports
const roleManager = require('../../utils/roles/roleManager');
const strings = require('../../strings/strings');
const validPronoun = pronoun => {
	return strings.defaultPronouns.some(i => {
		const checkPronoun = pronoun.toLowerCase();
		return i === checkPronoun;
	});
};
// exports
module.exports = {
	async execute(message) {
		const splitArgs = message.content.split(' ');
		splitArgs.shift();
		const pronouns = splitArgs;
		if (pronouns.length > 3) {
			await message.channel.send('You cannot handle that many pronouns at one time. You may only select up to three pronouns in one message');
			return;
		}
		for (const string of pronouns) {
			const lowerString = string.toLowerCase();
			const guildRole = message.guild.roles.cache.find(r => r.name === lowerString);
			if (validPronoun(lowerString) || guildRole) {
				const details = await roleManager.updateRoles(lowerString, message.author.id, message.guild);
				if (details.toggle === 'added') {
					const roleMessage = `${message.author.username}, You have purchased the strongest of my ${details.tag} Pronouns.`;
					await message.channel.send(roleMessage);
					break;
				}
				else {
					const roleMessage = `The ${details.tag} pronouns were too strong for ${message.author.username}.`;
					await message.channel.send(roleMessage);
					break;
				}
			}
			else {
				await message.channel.send('I do not have those pronouns in stock, you will need to ask an admin to restock those pronouns');
				break;
			}
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
	regexp: /^!pronounsArgs/mi,
	tag: 'pronounsArgs',
};
