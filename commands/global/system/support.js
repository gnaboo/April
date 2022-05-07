const config = require('../../../config');
const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('support')
		.setDescription('Recevoir un lien d\'invitation sur le serveur support (Art\' Portal).'),
	async execute(interaction, client) {
		var server = client.guilds.cache.get("766324873546563615");

		if (!server) return interaction.reply('**❌ | I am not able to find the server, remember I need to be in the support server to invite people.**');
		var channel = server.channels.cache.filter(chx => chx.type === 'GUILD_TEXT').find(x => x.position === 0);
		let invite = await channel.createInvite({ maxAge: 10 * 60 * 1000, maxUses: 1}, `Requested with command by ${interaction.member.user.tag}`).catch(console.log);

		let emb = new MessageEmbed()
			.setTitle(`Rejoignez ${server.name}`)
			.setDescription(`Utilisez ce lien: http://discord.gg/UrUtNAx!`)///${invite.url}
			.setTimestamp()
			.setFooter("Portal'Bot")
			.setColor('BLURPLE');

		await interaction.reply({embeds: [emb], ephemeral: true});
	}
};