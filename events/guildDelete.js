module.exports = {
	name: 'guildDelete',
	on: true,
	execute(guild/*, bdd*/) {
		console.log(`➔ J'ai quitté le serveur: ${guild.name}!`);
	},
};