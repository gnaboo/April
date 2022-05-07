const simplydjs = require('simply-djs');
const { SlashCommandBuilder } = require('@discordjs/builders');
const wait = require('util').promisify(setTimeout);

module.exports = {
	data: new SlashCommandBuilder()
		.setName('test')
		.setDescription('Un test LOL t\'as cru quoi?'),
	async execute(interaction) {
        await interaction.reply({content: "Un test LOL t\'as cru quoi?", ephemeral: true})
    },
};