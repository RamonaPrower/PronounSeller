// imports
const roleManager = require('../../utils/roles/roleManager');
// exports
module.exports = {
	async execute(message) {
		const splitArgs = message.content.split(' ');
		splitArgs.shift();
		const pronoun = splitArgs.join();
		const details = await roleManager.updateRoles(pronoun.toLowerCase(), message.author.id, message.guild);
		if (details.toggle === 'added') {
			const roleMessage = `${message.author.username}, You have purchased the strongest of my ${details.tag} Pronouns.`;
			await message.channel.send(roleMessage);
		}
		else {
			const roleMessage = `The ${details.tag} pronouns were too strong for ${message.author.username}.`;
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
	regexp: /^!pronounsArgs/mi,
	tag: 'pronounsArgs',
};
