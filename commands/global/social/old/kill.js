const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed } = require('discord.js')
const wait = require('util').promisify(setTimeout);
const anime = require('anime-actions');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('kill')
		.setDescription('Trucider un utilisateur.')
        .addUserOption(option =>
            option.setName('target')
                .setDescription('Sélectionnez un utilisateur')
                .setRequired(true)),
	async execute(interaction) {
        const member = interaction.options.getMember('target');
        const interactionauthor = interaction.user.username
        var embedKILL = new MessageEmbed()
        .setColor("#070104")
        .setTitle("🔪")
        .setDescription(`${member.user.username} se fait tuer par ${interactionauthor}!`)
        .setImage(await anime.kill())
        .setFooter("Kill", 'https://cdn.discordapp.com/avatars/798908537894862858/d5d4cc678320855b1d5e2982a2794b98.png');
        
        await interaction.reply({embeds: [embedKILL], components: [] })
	},
};