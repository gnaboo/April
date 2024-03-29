const { SlashCommandBuilder } = require('@discordjs/builders');
const wait = require('util').promisify(setTimeout);

module.exports = {
	data: new SlashCommandBuilder()
		.setName('say')
		.setDescription('Faire envoyer un message au bot')
        .addStringOption(option =>
            option.setName('message')
                .setDescription('Message à envoyer')
                .setRequired(true))
        .addChannelOption(option => 
            option.setName('destination')
            .setDescription('Sélectionnez le salon où envoyer le message!')
            .setRequired(false)),
	async execute(interaction) {
        if(!interaction.member.permissions.has("ADMINISTRATOR")) return interaction.reply({content: `Vous n'avez pas la permisssion \`ADMINISTRATOR\` pour effectuer cette commande.`, ephemeral: true});
        let msgtosend = interaction.options.getString('message');
        msgtosend = msgtosend.substring(0,2000);
        let channeltosend = interaction.options.getChannel('destination');
        if(!channeltosend){
            channeltosend = interaction.channel
        }
        try{
            channeltosend.send(msgtosend)
            await interaction.reply({content: "Message envoyé!", ephemeral: true})
        }catch{
            await interaction.reply({content: "Erreur: Je n'ai probablement pas la permission d'envoyer des messages ou le message est trop long", ephemeral: true})
        }
    },
};