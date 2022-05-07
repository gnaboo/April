const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed } = require('discord.js');
const wait = require('util').promisify(setTimeout);

module.exports = {
	data: new SlashCommandBuilder()
		.setName('reverse-text')
		.setDescription('Envoyer une suggestion au développeur du bot')
        .addStringOption(option =>
            option.setName('texte')
                .setDescription('Texte à retourner (max 2000 caractères)')
                .setRequired(true)),
	async execute(interaction, client) {
        const texttoreverse = interaction.options.getString('texte')?.substring(0,2000);
        const reversedtext = texttoreverse.split("").reverse().join("");
        const reversedtextembed = new MessageEmbed()
        .setDescription(reversedtext)
        .setAuthor(interaction.user.tag)
        .setFooter("Renverseur de texte")
        .setColor(`#7961fd`)
        await interaction.reply({embeds:[reversedtextembed], ephemeral: true})
    },
};