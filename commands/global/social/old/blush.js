const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed } = require('discord.js')
const wait = require('util').promisify(setTimeout);
const anime = require('anime-actions');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('blush')
		.setDescription('Rougir.'),
	async execute(interaction) {
        const interactionauthor = interaction.user.username
        var embedBLUSH = new MessageEmbed()
        .setColor("ff0080")
        .setTitle("Ooh!")
        .setDescription(`${interactionauthor} rougis!`)
        .setImage(await anime.blush())
        .setFooter("Blush", 'https://cdn.discordapp.com/avatars/798908537894862858/d5d4cc678320855b1d5e2982a2794b98.png');
        
        await interaction.reply({embeds: [embedBLUSH], components: [] })
	},
};