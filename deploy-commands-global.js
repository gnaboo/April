const { REST } = require('@discordjs/rest');
const { Routes } = require('discord-api-types/v9');
const { token } = require('./config.json');
const fs = require('fs');

const commands = [];
const commandFolders = fs.readdirSync('./commands');
/*for (const folder of commandFolders) {
    const commandFiles = fs.readdirSync(`./commands/${folder}`).filter(file => file.endsWith('.js'));
    for (const file of commandFiles) {
		const command = require(`./commands/${folder}/${file}`);
		commands.push(command.data.toJSON());
		console.log(`${folder}/${file}`)
	}
}*/

const commandCategories = fs.readdirSync('./commands').filter(file => !file.includes('.'));
for (const category of commandCategories) {
	const commandFiles = fs.readdirSync(`./commands//${category}`).filter(file => file.endsWith('.js'));
	for (const file of commandFiles) {
		const command = require(`./commands/${category}/${file}`);
		commands.push(command.data.toJSON());
		console.log(`Loaded global/${category}/${command.data.name}!`)
	}
}
/*const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));
for (const file of commandFiles) {
	const command = require(`./commands/${file}`);
	commands.push(command.data.toJSON());
	console.log(`${file}`)
}*/

// Place your client id here
const clientId = '858387628567298108';

const rest = new REST({ version: '9' }).setToken(token);

(async () => {
	try {
		console.log('Started refreshing application (/) commands.');

		await rest.put(
			Routes.applicationCommands(clientId),
			{ body: commands },
		);

		console.log('Successfully reloaded application (/) commands.');
	} catch (error) {
		console.error(error);
	}
})();
