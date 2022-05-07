const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed, MessageButton, MessageActionRow } = require('discord.js')
const fs = require('fs')



module.exports = {
	data: new SlashCommandBuilder()
		.setName('panel')
		.setDescription('Utiliser le système de panels.')
        .addSubcommand(subcommand =>
			subcommand
				.setName('rolereact')
				.setDescription('Mettre en place le système de rolereact.')
                .addChannelOption(option => 
                    option.setName('panelchannel')
                    .setDescription('Choisissez le salon où envoyer le panel de rolereact !')
                    .setRequired(true)))
        .addSubcommand(subcommand =>
			subcommand
				.setName('rolereactembed')
				.setDescription('Afficher l\'embed de présentation du rolereact.')
                .addChannelOption(option => 
                    option.setName('panelchannel')
                    .setDescription('Choisissez le salon où envoyer l\'embed !')
                    .setRequired(true)))
        .addSubcommand(subcommand =>
			subcommand
				.setName('candidatures')
				.setDescription('Mettre en place le système de candidatures.')
                .addChannelOption(option => 
                    option.setName('panelchannel')
                    .setDescription('Choisissez le salon où envoyer le panel de candidatures !')
                    .setRequired(true)))
        .addSubcommand(subcommand =>
			subcommand
				.setName('moderation')
				.setDescription('Mettre en place le système de modération.')
                .addChannelOption(option => 
                    option.setName('panelchannel')
                    .setDescription('Choisissez le salon où envoyer le panel des sanctions !')
                    .setRequired(true))),
	async execute(interaction, client) {
        if (!interaction.member.permissions.has("ADMINISTRATOR")) return interaction.reply({ content: `Vous n'avez pas la permisssion \`ADMINISTRATEUR\` pour effectuer cette commande.`, ephemeral: true });

        switch(interaction.options.getSubcommand()) {
            case 'rolereact':
                await interaction.reply({content: "Le panel de rolereact est en cours de création...", ephemeral: true});
                const rolereactchannel = interaction.options.getChannel('panelchannel');
                const rolereactEMBED = new MessageEmbed()
                        .setAuthor("Art'Portal")
                        .setTitle("Choisissez vos rôles/Choose your roles")
                        .setDescription("Cliquez sur les boutons pour choisir les rôles correspondant à vos choix\nClick on the buttons in order to choose the roles you want")
                        .setColor(`#7961fd`);
                    const genrebtn = new MessageButton()
                        .setCustomId("getrole_genre")
                        .setLabel("Genre/Genre")
                        .setStyle('PRIMARY')
                        .setEmoji("👥");
                    const hobbiesbtn = new MessageButton()
                        .setCustomId("getrole_hobbies")
                        .setLabel("Hobbies/Hobbies")
                        .setStyle('PRIMARY')
                        .setEmoji("♟️");
                    const colorbtn = new MessageButton()
                        .setCustomId("getrole_color")
                        .setLabel("Couleur/Color")
                        .setStyle('PRIMARY')
                        .setEmoji("🌈");
                    const pingsbtn = new MessageButton()
                        .setCustomId("getrole_pings")
                        .setLabel("Notifications/Pings")
                        .setStyle('PRIMARY')
                        .setEmoji("📌");
                    
                    const listbtn = new MessageButton()
                    .setCustomId("getrole_list")
                    .setLabel("Afficher vos rôles")
                    .setStyle('SECONDARY')
                    .setEmoji("📖");
                    const btnrow = new MessageActionRow()
                        .addComponents([genrebtn, hobbiesbtn, colorbtn, pingsbtn]);
                    const btnrow2 = new MessageActionRow()
                        .addComponents([listbtn]);
                    rolereactchannel.send({ embeds: [rolereactEMBED], components: [btnrow, btnrow2] });
                    await interaction.editReply({content: "Le panel de rolereact a bien été envoyé !", ephemeral: true});
                break;
            case 'rolereactembed':
                const rolereactpresentationchannel = interaction.options.getChannel('panelchannel');
                const rolereactpresentationEMBED = new MessageEmbed()
                        .setAuthor("Art'Portal")
                        .setTitle("Présentation des rôles")
                        //.setDescription("__**Rôles de couleur:**__\n<@947490339848060968>\n<@947490417245556796>\n<@947490189096415273>\n<@947490255311872000>\n<@947496679580500008>\n<@947490339848060968>\n<@947489800330559510>\n\n")
                        .setColor(`#7961fd`)
                        .setDescription("Les différents rôles que vous pouvez choisir sur Art'Portal sont listés ci-dessous")
                        .addFields(
                            { 
                                name: "・Couleurs・",
                                value: `<@&947490339848060968>\n<@&947490417245556796>\n<@&947490189096415273>\n<@&947490255311872000>\n<@&947496679580500008>\n<@&947485362610139196>\n<@&947489800330559510>`,
                                inline: true
                            },
                            { 
                                name: "・Genres・",
                                value: `<@&769918743626252318>\n<@&768393897134784532>\n<@&772041733278007307>`,
                                inline: true
                            },
                            { 
                                name: "・Notifications・",
                                value: `<@&768396461763067914>\n<@&784646468958945280>\n<@&774693756901392404>\n<@&770568527156346880>\n<@&770723703948181525>\n<@&799249307362131978>\n<@&847207140098572318>\n<@&955143137226010704>`,
                                inline: true
                            },
                            { 
                                name: "・Hobbies・",
                                value: `<@&949745563824431124>\n<@&949746089987289128>\n<@&949746175920181278>\n<@&949746259898544229>\n<@&949746341754601502>\n<@&949746559019540511>\n<@&949746641764749324>\n<@&949746678519439370>`,
                                inline: true
                            },
                        );
                await rolereactpresentationchannel.send({embeds:[rolereactpresentationEMBED]});
                await interaction.reply({ content: "L'embed a bien été envoyé !", ephemeral: true });

                break;
            case 'moderation':
                await interaction.reply({content: "Le panel de rolereact est en cours de création...", ephemeral: true});
                const suggestchannel = interaction.options.getChannel('panelchannel');
                const suggestEMBED = new MessageEmbed()
                        .setAuthor("Art'Portal")
                        .setTitle("Panel de suggestions/question")
                        .setDescription("Proposez vos suggestions ou posez une question ! Le staff vous répondra sous peu !")
                        .setColor(`#7961fd`);
                    const suggestbtn = new MessageButton()
                        .setCustomId("suggestion")
                        .setStyle('SUCCESS')
                        .setEmoji("📩");
                    const questionbtn = new MessageButton()
                        .setCustomId("question")
                        .setStyle('SUCCESS')
                        .setEmoji("❓");
                    
                    /*const sanctionsbtn = new MessageButton()
                    .setCustomId("modpanel_sannctionslist")
                    .setLabel("Afficher vos rôles")
                    .setStyle('SECONDARY')
                    .setEmoji("📖")*/
                    const suggestbtnrow = new MessageActionRow()
                        .addComponents([suggestbtn, questionbtn]);
                    //const modbtnrow2 = new MessageActionRow()
                    //    .addComponents([listbtn]);
                    suggestchannel.send({ embeds: [suggestEMBED], components: [suggestbtnrow/*, modbtnrow2*/] });
                    await interaction.editReply({content: "Le panel de suggestions/questions a bien été envoyé !", ephemeral: true});
                break;
            case 'candidatures':
                await interaction.reply({content: "Le panel de rolereact est en cours de création...", ephemeral: true});
                const applicationchannel = interaction.options.getChannel('panelchannel');
                const applicationEMBED = new MessageEmbed()
                        .setAuthor("Art'Portal")
                        .setTitle("Candidatures")
                        .setDescription("Cliquez sur le bouton pour candidater pour entrer dans le staff / l'équipe d' artistes.")
                        .setColor(`#7961fd`);
                    const applicationbtn = new MessageButton()
                        .setCustomId("apply")
                        .setLabel("Candidature staff")
                        .setStyle('SUCCESS')
                        .setEmoji("🛠");
                    const applicationbtnartist = new MessageButton()
                        .setCustomId("applyartist")
                        .setLabel("Candidature artiste")
                        .setStyle('SUCCESS')
                        .setEmoji("🖌️");
                    const applicationbtnrow = new MessageActionRow()
                        .addComponents([applicationbtn, applicationbtnartist]);
                    applicationchannel.send({ embeds: [applicationEMBED], components: [applicationbtnrow] });
                    await interaction.editReply({content: "Le panel de candidature a bien été envoyé !", ephemeral: true});
                break;
        }
	},
};
