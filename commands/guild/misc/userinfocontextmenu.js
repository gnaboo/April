const { ContextMenuCommandBuilder } = require('@discordjs/builders');
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
	data: new ContextMenuCommandBuilder()
		.setName('UserInfo')
		.setType(2),
	async execute(interaction, client) {
		if(interaction.channel.type === 'DM') return interaction.reply({content: "Vous ne pouvez pas executer cette commande en messages privés!", ephemeral: true})
		const member = interaction.guild.members.cache.get(interaction.targetId);
		const user = member.user
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
							value: `Développeur officiel du bot`,
							inline: false
						}
					)
				}
				if(bdd[user.id]["bot"]){embedUSERINFO.addFields({name: "🤖 Bot",value: `Portal'Bot`,inline: false})}
			}
			await interaction.reply({embeds:[embedUSERINFO], ephemeral: false});
		}else{
			await interaction.reply({content:"Utilisateur inconnu! Merci de réessayer...", ephemeral: true})
		}
	},
};