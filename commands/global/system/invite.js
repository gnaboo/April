const config = require('../../../config');
const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('invite')
		.setDescription('Recevoir le lien d\'invitation du bot.'),
	async execute(interaction, client) {
		let emb = new MessageEmbed()
			.setTitle(`Ajouter Portal'Bot à votre serveur.`)
			.addField('Lien:', `[**\`CLICK HERE\`**](https://discord.com/api/oauth2/authorize?client_id=858387628567298108&permissions=2147486720&scope=bot%20applications.commands)`, true)
			.addField('Permissions requises: Slash commands, envoyer des messages, voir les salons')
			.setFooter("Portal'Bot")
			.setColor('BLURPLE');
		await interaction.reply({embeds: [emb], ephemeral: true});
	}
};