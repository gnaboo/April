const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed } = require('discord.js')
const wait = require('util').promisify(setTimeout);
const anime = require('anime-actions');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('punch')
		.setDescription('Frapper un utilisateur.')
                .addUserOption(option =>
                    option.setName('target')
                        .setDescription('Sélectionnez un utilisateur')
                        .setRequired(true)),
	async execute(interaction) {
        const member = interaction.options.getMember('target');
        const interactionauthor = interaction.user.username
        var embedPUNCH = new MessageEmbed()
        .setColor("ff0080")
        .setTitle("Ooh!")
        .setDescription(`${interactionauthor} frappe ${member.user.username}!`)
        .setImage(await anime.punch())
        .setFooter("Punch", 'https://cdn.discordapp.com/avatars/798908537894862858/d5d4cc678320855b1d5e2982a2794b98.png');
        
        await interaction.reply({embeds: [embedPUNCH], components: [] })
	},
};