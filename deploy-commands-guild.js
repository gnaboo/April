const { REST } = require('@discordjs/rest');
const { Routes } = require('discord-api-types/v9');
const { token } = require('./config.json');
const fs = require('fs');

const commands = [];
const commandFolders = fs.readdirSync('./commands/guild');


const commandCategories = fs.readdirSync('./commands/guild').filter(file => !file.includes('.'));
for (const category of commandCategories) {
	const commandFiles = fs.readdirSync(`./commands/guild/${category}`).filter(file => file.endsWith('.js'));
	for (const file of commandFiles) {
		const command = require(`./commands/guild/${category}/${file}`);
		commands.push(command.data.toJSON());
		console.log(`Loaded guild/${category}/${command.data.name}!`)
	}
}

//OwO
// Place your client and guild ids here
const clientId = '858387628567298108';
const guildId = '766324873546563615';
//artportal: 766324873546563615
//serveur support: 905067948627091498
//servtest: 869956555146133516
const rest = new REST({ version: '9' }).setToken(token);

(async () => {
	try {
		console.log('Started refreshing application (/) commands.');

		await rest.put(
			Routes.applicationGuildCommands(clientId, guildId),
			{ body: commands },
		);

		console.log('Successfully reloaded application (/) commands.');
	} catch (error) {
		console.error(error);
	}
})();
