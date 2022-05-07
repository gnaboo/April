const { SlashCommandBuilder } = require('@discordjs/builders');
const { CommandInteractionOptionResolver } = require('discord.js');
const wait = require('util').promisify(setTimeout);
//const {DiscordTogether} = require('discord-together');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('together')
		.setDescription('Lancer une activité dans un salon vocal.')
        .addChannelOption(option => option.setName('destination').setDescription('Selectionnez un channel vocal où lancer l\'activité').setRequired(true))
        .addStringOption(option =>
            option.setName('category')
                .setDescription('Activité')
                .setRequired(true)
                .addChoice('Youtube', 'youtube')
                .addChoice('Poker', 'poker')
                .addChoice('Betrayal', 'betrayal')
                .addChoice('Fishing', 'fishing')
                .addChoice('Chess', 'chess')),
	async execute(interaction, client) {
		if(interaction.channel.type === 'DM') return interaction.reply({content: "Vous ne pouvez pas executer cette commande en messages privés!", ephemeral: true})
        const channel = interaction.options.getChannel('destination');
        const activity = interaction.options.getString('category');
        //console.log(interaction.member.voice.channelID)
        if(!channel.isVoice()) return interaction.reply({content:"Merci de spécifier un salon vocal", ephemeral: true})
        switch(activity){
            case 'youtube':
                client.discordTogether.createTogetherCode(channel.id, 'youtube').then(async invite => {
                    return interaction.reply({content:`Voici le lien de l'activité:\n${invite.code}`});
                });
            break;
            case 'poker':
                client.discordTogether.createTogetherCode(channel.id, 'poker').then(async invite => {
                    return interaction.reply({content:`Voici le lien de l'activité:\n${invite.code}`});
                });
            break;
            case 'betrayal':
                client.discordTogether.createTogetherCode(channel.id, 'betrayal').then(async invite => {
                    return interaction.reply({content:`Voici le lien de l'activité:\n${invite.code}`});
                });
            break;
            case 'fishing':
                client.discordTogether.createTogetherCode(channel.id, 'fishing').then(async invite => {
                    return interaction.reply({content:`Voici le lien de l'activité:\n${invite.code}`});
                });
            break;
            case 'chess':
                client.discordTogether.createTogetherCode(channel.id, 'chess').then(async invite => {
                    return interaction.reply({content:`Voici le lien de l'activité:\n${invite.code}`});
                });
            break;
        }
    },
};