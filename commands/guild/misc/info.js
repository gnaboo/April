const { SlashCommandBuilder } = require('@discordjs/builders');
const Discord = require('discord.js');
const { MessageEmbed } = require('discord.js');
const wait = require('util').promisify(setTimeout);
const fs = require('fs')
const statuses = {
  "online" : "🟢",
  "idle" : "🟠",
  "dnd" : "🔴",
  "offline" : "⚫️",
}

module.exports = {
	data: new SlashCommandBuilder()
		.setName('info')
		.setDescription('Obtenir des informations diverses.')
		.addSubcommand(subcommand =>
			subcommand
				.setName('user')
				.setDescription('Obtenir des informations sur un utilisateur')
				.addUserOption(option => option.setName('target').setDescription('The user').setRequired(true)))
		.addSubcommand(subcommand =>
			subcommand
				.setName('server')
				.setDescription('Obtenir des informations sur le serveur'))
		.addSubcommand(subcommand =>
			subcommand
				.setName('bot')
				.setDescription('Obtenir des informations sur Portal\'Bot')),
	async execute(interaction, client) {
		//await interaction.deferReply()
		//console.log(interaction.options.getSubcommand())
		switch(interaction.options.getSubcommand()){
			case 'user':
				if(interaction.channel.type === 'DM') return interaction.reply({content: "Vous ne pouvez pas executer cette commande en messages privés!", ephemeral: true})
				const user = interaction.options.getUser('target');
				const member = interaction.guild.members.cache.get(user.id);
				if (user && member) {
					const bdd = JSON.parse(fs.readFileSync("./bdd.json").toString());
					const embedUSERINFO = new MessageEmbed()
					.setAuthor(user.tag, user.avatarURL())
					.setColor("BLURPLE")
					.setThumbnail(user.avatarURL())
					.setDescription(`<@${user.id}>`)
					.addFields(
						{
							name: "👤 Informations sur le compte",
							value: ``
								+`**ID:** ${user.id}\n`
								+`**Nom complet:** ${user.tag}\n`
								+`**Bot:** ${user.bot ? "Oui" : "Non"}\n`
								+`**Créé:** <t:${Math.floor(user.createdTimestamp / 1000)}:d>`
								,
							inline: false
						},
						{
							name: "📋 Information sur le membre",
							value: 
								`**A rejoint le serveur:** <t:${Math.floor(member.joinedTimestamp / 1000)}:R>\n`
								+`**Nickname:** ${member.nickname || `Aucun`}\n`
								+`**Plus haut rôle:** ${member.roles.hoist ? member.roles.hoist.name : "Aucun"}`
								,
							inline: false	
						},
						{
							name: `📝 Rôles [${member.roles.cache.size - 1}]`,
							value: member.roles.cache.size ? member.roles.cache.map(roles => `**${roles}**`).slice(0, 20).join(" ") : "None",
							inline: false
						}
					)
					if(bdd[user.id]){
						if(bdd[user.id]["betatester"]){
							embedUSERINFO.addFields(
								{
									name: "🐛 Beta tester",
									value: `Depuis le ${bdd[user.id]["betatestersince"]}\nBugs trouvés: ${bdd[user.id]["bugsfound"]}`,
									inline: false
								}
							)
						}
						if(bdd[user.id]["contributer"]){
							embedUSERINFO.addFields(
								{
									name: "🤝 Contributeur",
									value: `Une suggestion de cet utilisateur a été rajoutée au bot`,
									inline: false
								}
							)
						}
						if(bdd[user.id]["developer"]){
							embedUSERINFO.addFields(
								{
									name: "⚙️ Développeur",
									value: `Développeur du bot`,
									inline: false
								}
							)
						}
						if(bdd[user.id]["bot"]){
							embedUSERINFO.addFields(
								{
									name: "🤖 Portal'Bot",
									value: `Portal'Bot UwU`,
									inline: false
								}
							)
						}

					}
					await interaction.reply({embeds:[embedUSERINFO], ephemeral: false});
				}else if (user) {
					const bdd = JSON.parse(fs.readFileSync("./bdd.json").toString());
					const embedUSERINFO = new MessageEmbed()
					.setAuthor(user.tag, user.avatarURL())
					.setColor("BLURPLE")
					.setThumbnail(user.avatarURL())
					.setDescription(`<@${user.id}>`)
					.addFields(
						{
							name: "👤 Informations sur le compte",
							value: ``
								+`**ID:** ${user.id}\n`
								+`**Bot:** ${user.bot ? "Oui" : "Non"}\n`
								+`**Créé:** <t:${Math.floor(user.createdTimestamp / 1000)}:d>`,
							inline: false
						}
					)
					if(bdd[user.id]){
						if(bdd[user.id]["betatester"]){
							embedUSERINFO.addFields(
								{
									name: "🐛 Beta tester",
									value: `Depuis le ${bdd[user.id]["betatestersince"]}`,
									inline: false
								}
							)
						}
						if(bdd[user.id]["developer"]){
							embedUSERINFO.addFields(
								{
									name: "⚙️ Développeur",
									value: `Développeur officiel du bot`,
									inline: false
								}
							)
						}
						if(bdd[user.id]["contributer"]){
							embedUSERINFO.addFields(
								{
									name: "🤝 Contributeur",
									value: `A participé de près au développement du bot`,
									inline: false
								}
							)
						}
						if(bdd[user.id]["bot"]){
							embedUSERINFO.addFields(
								{
									name: "🤖 Bot",
									value: `Portal'Bot`,
									inline: false
								}
							)
						}

					}
					await interaction.reply({embeds:[embedUSERINFO], ephemeral: false});
				}else{
					await interaction.reply({content:"Utilisateur inconnu! Merci de réessayer...", ephemeral: true})
				}
			break;
			case 'server':
				if(interaction.channel.type === 'DM') return interaction.reply({content: "Vous ne pouvez pas executer cette commande en messages privés!", ephemeral: true})
				const owner = await interaction.guild.fetchOwner();
				const embedSERVINFO = new MessageEmbed()
					.setAuthor(interaction.guild.name)
					.setColor("BLURPLE")
					.setThumbnail(interaction.guild.iconURL())
					.addFields(
						{
							name: `Propriétaire`,
							value: `${owner.user.tag}`,
							inline: true
						},
						{
							name: `Date de création du serveur`,
							value: `${interaction.guild.createdAt.toDateString()} à ${interaction.guild.createdAt.toTimeString()}`,
							inline: true
						},
						{
							name: `ID du serveur`,
							value: `${interaction.guild.id}`,
							inline: true
						},
						{
							name: `Nombre total de membres`,
							value: `${interaction.guild.memberCount}`,
							inline: true
						},
						{
							name: "Nombre de salons",
							value: `${interaction.guild.channels.cache.size}`,
							inline: true
						}
					)
				await interaction.reply({embeds:[embedSERVINFO], ephemeral: false})
			break;
			case 'bot':
                const embedBOTINFO = new MessageEmbed()
					.setAuthor("Portal'Bot")
					.setColor("BLURPLE")
					.setThumbnail("https://cdn.discordapp.com/avatars/858387628567298108/486407233be7edba21cda59bcd648022.png")
                	.setDescription("Développé par CoolMan#4094 avec l'aide de BakaTaida#5677.\n"
                                   +"Portal'Bot a été initialement conçu pour le serveur de graphisme [Art'Portal](https://discord.gg/UrUtNAx). Au vu des retours positifs sur le bot, nous avons décidé de le rendre public.\n"
                                    +"Le bot est mis à jour au moins une fois par mois pour palier à tous les bugs possibles. Il utilise les fonctionnalités les plus récentes de discord, à compter les commandes slash, les boutons et les menus."
                                    +"\nBibliothèque: [discord.js](https://discord.js.org/)"
                                   )
				await interaction.reply({embeds: [embedBOTINFO], ephemeral: false})
			break;
		}
	},
};

/*.addUserOption(option =>
            option.setName('target')
                .setDescription('Sélectionnez un utilisateur')
                .setRequired(true)),*/