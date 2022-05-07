const fs = require('fs')

module.exports = {
	name: 'guildCreate',
	on: true,
	execute(guild) {
		console.log(`\x1b[32m➔ J'ai rejoint le serveur: ${guild.name}!`);
	},
};