// imports
const strings = require('../../strings/strings');
const roleManager = require('../../utils/roles/roleManager');
// exports
module.exports = {
	async execute(message) {
		// create welcome message
		const sentMessage = await message.channel.send(strings.sellerSpeech);
		const pronounArr = [['🇭', 'he/him'], ['🇸', 'she/her'], ['🇹', 'they/them'], ['🇦', 'any/all']];
		const pronouns = new Map(pronounArr);
		// add emojis
		await Promise.all([
			sentMessage.react('🇭'),
			sentMessage.react('🇸'),
			sentMessage.react('🇹'),
			sentMessage.react('🇦'),
		]);
		// create emoji collector
        const filter = (reaction, user) => {
			return ['🇭', '🇸', '🇹', '🇦'].includes(reaction.emoji.name) && user.id !== sentMessage.author.id;
		};
		// toggle user group based on emoji
		const collector = sentMessage.createReactionCollector(filter, { time: 60000 });
		collector.on('collect', async (reaction, user) => {
			const foundPronoun = pronouns.get(reaction.emoji.name);
			const details = await roleManager.updateRoles(foundPronoun, user.id, message.guild);
			if (details.toggle === 'added') {
				const roleMessage = `${user.username}, You have purchased the strongest of my ${details.tag} Pronouns.`;
				await message.channel.send(roleMessage);
			}
			else {
				const roleMessage = `The ${details.tag} pronouns were too strong for ${user.username}.`;
				await message.channel.send(roleMessage);
			}
		});
		collector.on('remove', async (reaction, user) => {
			const foundPronoun = pronouns.get(reaction.emoji.name);
			const details = await roleManager.updateRoles(foundPronoun, user.id, message.guild);
			if (details.toggle === 'added') {
				const roleMessage = `${user.username}, You have purchased the strongest of my ${details.tag} Pronouns.`;
				await message.channel.send(roleMessage);
			}
			else {
				const roleMessage = `The ${details.tag} pronouns were too strong for ${user.username}.`;
				await message.channel.send(roleMessage);
			}
		});
		// shut up shop once collector finished
	},
};

module.exports.info = {
	name: 'Pronouns',
	description: 'Get your pronouns from the Pronoun seller',
	summon: '@',
	visible: true,
};
module.exports.settings = {
	regexp: /^!pronounsIntro/mi,
	tag: 'pronouns@',
};
