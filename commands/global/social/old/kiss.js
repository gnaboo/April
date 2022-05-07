const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed } = require('discord.js')
const wait = require('util').promisify(setTimeout);
const anime = require('anime-actions');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('kiss')
		.setDescription('Embrasser un utilisateur.')
        .addUserOption(option =>
            option.setName('target')
                .setDescription('Sélectionnez un utilisateur')
                .setRequired(true)),
	async execute(interaction) {
        const member = interaction.options.getMember('target');
        const interactionauthor = interaction.user.username
        var embedKISS = new MessageEmbed()
        .setColor("#c601c0")
        .setTitle("<3!")
        .setDescription(`${member.user.username} reçoit un baiser de ${interactionauthor}!`)
        .setImage(await anime.kiss())
        .setFooter("Kiss", 'https://cdn.discordapp.com/avatars/798908537894862858/d5d4cc678320855b1d5e2982a2794b98.png');
        
        await interaction.reply({embeds: [embedKISS], components: [] })
	},
};