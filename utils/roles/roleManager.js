module.exports = {
    async updateRoles(tag, snowflake, guild) {
        const details = {
            tag: tag,
        };
        const member = await guild.members.fetch(snowflake);
        let guildRole = guild.roles.cache.find(r => r.name === tag);
        const defaultRole = guild.roles.cache.find(r => r.name === '@everyone');
        if (!guildRole) {
            guildRole = await guild.roles.create({
                data: {
                    name: tag,
                    permissions: defaultRole.permissions.DEFAULT,
                },
                reason: 'Creating ' + tag + 'role for ' + member.username + '.',
            });
        }
        if (!member.roles.cache.get(guildRole.id)) {
            member.roles.add(guildRole.id);
            details.toggle = 'added';
        }
        else {
            member.roles.remove(guildRole.id);
            details.toggle = 'removed';
        }
        return details;
    },
    async addRoles(tag, guild) {
        const details = {
            tag: tag,
        };
        let guildRole = guild.roles.cache.find(r => r.name === tag);
        const defaultRole = guild.roles.cache.find(r => r.name === '@everyone');
        if (!guildRole) {
            guildRole = await guild.roles.create({
                data: {
                    name: tag,
                    permissions: defaultRole.permissions.DEFAULT,
                },
                reason: 'Creating ' + tag + 'role.',
            });
            details.toggle = 'added';
        }
        else {
            details.toggle = 'exists';
        }
        return details;
    },
};
