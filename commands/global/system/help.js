const Discord = require('discord.js');
const { MessageActionRow, MessageEmbed, MessageSelectMenu, MessageButton } = require('discord.js');
const { Client, Collection, Intents } = require('discord.js');
const { SlashCommandBuilder } = require('@discordjs/builders');
const fs = require('fs')

module.exports = {
	data: new SlashCommandBuilder()
		.setName('help')
		.setDescription('Afficher l\'aide du bot'),

    async execute(interaction) {
        const help_page_1 = new MessageEmbed()
        .setColor(`#7961fd`)
        .setAuthor(" ")
        .setThumbnail(`https://i.imgur.com/zcZsfNA.png`)
        .setDescription(
            "Liste des commandes disponibles. (Page 1/5)\n"
            + "**Commandes slash** \n"
            + "**Syntaxe d'utilisation:**\n"
            + "\n"
            + "<:syntaxe_2:871429314497896448>・Argument optionnel pour exécuter la commande.\n"
            + "<:syntaxe_1:871429314485301258>・Un argument est requis pour exécuter la commande.\n"
            + "\n"
            + "`Page #1`・Sommaire\n"
            + "`Page #2`・Commandes sociales.\n"
            + "`Page #3`・Commandes de jeux.\n"
            + "`Page #4`・Commandes diverses.\n"
            + "`Page #5`・Commandes d'administration\n"
            + "\n"
            + "**__Information:__**\n"
            + "Les commandes marquées d'un symbole requièrent une permission\n"
            + "Les commandes étant régulièrement mises à jour, le help peut être légèrement en retard.\n"
        );
        
        const row = new MessageActionRow()
			.addComponents(
				new MessageSelectMenu()
					.setCustomId('helpselect')
					.setPlaceholder('Navigateur')
					.addOptions([
						{
							label: 'Page 1',
							description: 'Sommaire',
							value: 'help_first_option',
						},
						{
							label: 'Page 2',
							description: 'Commandes sociales',
							value: 'help_second_option',
						},
                        {
							label: 'Page 3',
							description: 'Commandes de jeu.',
							value: 'help_third_option',
						},
						{
							label: 'Page 4',
							description: 'Commandes diverses',
							value: 'help_fourth_option',
						},
                        {
							label: 'Page 5',
							description: 'Commandes d\'administration',
							value: 'help_fifth_option',
						},
					]),
			);
			const btnrow = new MessageActionRow()
				.addComponents(
					new MessageButton()
						.setLabel('Serveur support')
						.setEmoji("🆘")
						.setLink("https://discord.gg/rQACEvtrFU")
						.setStyle('LINK'),
					new MessageButton()
						.setLabel('M\'inviter')
						.setEmoji("🔗")
						.setLink("https://discord.com/api/oauth2/authorize?client_id=858387628567298108&permissions=0&scope=bot%20applications.commands")
						.setStyle('LINK'),
				);
        
        try{
            //await interaction.reply({content: "Portal'Bot - Help", ephemeral: true})
            await interaction.reply({ embeds: [help_page_1], components: [row, btnrow] });
        }catch{}
    }
}