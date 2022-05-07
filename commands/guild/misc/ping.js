const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed, MessageButton, MessageActionRow } = require('discord.js')
const wait = require('util').promisify(setTimeout);

module.exports = {
	data: new SlashCommandBuilder()
		.setName('ping')
		.setDescription('Obtenir la latence du bot.'),
	async execute(interaction, client) {
        const pingrefreshbutton = new MessageButton()
            .setCustomId(`ping_refresh_btn`)
            .setEmoji("🔁")
            .setStyle('PRIMARY')

        const row = new MessageActionRow()
        .addComponents([pingrefreshbutton])

        const sent = await interaction.reply({ content: 'Pinging...', components:[row], fetchReply: true});
        const latency = new MessageEmbed()
            .setColor(`#7961fd`)
            .setDescription(
                `🏓 Portal' BOT v2.0\n`
                + "\n"
                + `Latence: ${sent.createdTimestamp - interaction.createdTimestamp}ms\n`
                + `API: ${Math.round(client.ws.ping)}ms`
            )
		interaction.editReply({content:" ", embeds:[latency]});
		//Le ping de mon API est de ${client.ws.ping}ms.
	},
};