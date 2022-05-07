const { SlashCommandBuilder } = require('@discordjs/builders');
const Discord = require('discord.js');
const { MessageEmbed } = require('discord.js');
const wait = require('util').promisify(setTimeout);
const fs = require('fs')
const ms = require("ms")
const messages = {
    giveaway: "🎉🎉 **GIVEAWAY** 🎉🎉",
    giveawayEnded: "🎉🎉 **GIVEAWAY FINI** 🎉🎉",
    inviteToParticipate: "Réagissez avec 🎉 pour participer!",
    dropMessage: "Soyez le permier à réagir avec 🎉 !",
    drawing: 'Tirage au sort: {timestamp}',
    winMessage: "Félicitations, {winners}! Vous avez gagné **{this.prize}**!",
    embedFooter: "Portal'Bot - Giveaways",
    noWinner: "Giveaway annulé, aucune participation valide.",
    hostedBy: "Host par: {this.hostedBy}",
    winners: "Gagnant(s)",
    endedAt: "Fini à "
}

module.exports = {
	data: new SlashCommandBuilder()
		.setName('giveaway')
		.setDescription('Commandes de giveaway.')
		.addSubcommand(subcommand =>
			subcommand
				.setName('start')
				.setDescription('Lancer un giveaway')
				.addStringOption(option =>
                    option.setName('duration')
                        .setDescription('Durée du giveaway. Exemple: 1m, 1h, 1d.')
                        .setRequired(true))
                .addIntegerOption(option =>
                    option.setName('winners')
                        .setDescription('Nombre de gagnants.')
                        .setRequired(true))
                .addStringOption(option =>
                    option.setName('prize')
                        .setDescription('Récompense du giveaway.')
                        .setRequired(true))
                .addChannelOption(option => 
                    option.setName('destination')
                        .setDescription('Sélectionnez le salon où se déroulera le giveaway.')
                        .setRequired(true)))
		.addSubcommand(subcommand =>
			subcommand
				.setName('drop')
				.setDescription('Lancer un drop: premier(s) à cliquer remportent le drop.')
                .addIntegerOption(option =>
                    option.setName('winners')
                        .setDescription('Nombre de gagnants.')
                        .setRequired(true))
                .addStringOption(option =>
                    option.setName('prize')
                        .setDescription('Récompense du giveaway.')
                        .setRequired(true))
                .addChannelOption(option => 
                    option.setName('destination')
                        .setDescription('Sélectionnez le salon où se déroulera le giveaway.')
                        .setRequired(true)))
		.addSubcommand(subcommand =>
			subcommand
				.setName('reroll')
				.setDescription('Relancer le tirage au sort du giveaway spécifié')
                .addStringOption(option =>
                    option.setName('giveaway_id')
                        .setDescription('Id du message du giveaway à reroll')
                        .setRequired(true))),
	async execute(interaction, client) {
        await interaction.deferReply({ephemeral:true})
        const user = interaction.member
		switch(interaction.options.getSubcommand()){
            case "start":
                // If the member doesn't have enough permissions
                if(!user.permissions.has('MANAGE_MESSAGES')) return interaction.editReply({content: ':x: Vous devez avoir la permission "Gérer les messages" pour créer un giveaway.',ephemeral: true});

                const giveawayChannel = interaction.options.getChannel('destination');
                const giveawayDuration = interaction.options.getString('duration');
                const giveawayWinnerCount = interaction.options.getInteger('winners');
                const giveawayPrize = interaction.options.getString('prize').substring(0,200);
                
                if(!giveawayChannel.isText()) return interaction.editReply({content: ':x: Merci de spécifier un salon textuel!',ephemeral: true});
            
                // Start the giveaway
                client.giveawaysManager.start(giveawayChannel, {
                    // The giveaway duration
                    duration: ms(giveawayDuration),
                    // The giveaway prize
                    prize: giveawayPrize,
                    // The giveaway winner count
                    winnerCount: giveawayWinnerCount,
                    // Who hosts this giveaway
                    hostedBy: client.config.hostedBy ? interaction.user : null,
                    // Messages
                    messages
                });
            
                await interaction.editReply({content:`Giveaway lancé dans ${giveawayChannel}!`, ephemeral:true});
            break;

            case "drop":
                // If the member doesn't have enough permissions
                if(!user.permissions.has('MANAGE_MESSAGES')) return interaction.reply({content: ':x: Vous devez avoir la permission "Gérer les messages" pour créer un giveaway.',ephemeral: true});
            
                const dropgiveawayChannel = interaction.options.getChannel('destination');
                const dropgiveawayWinnerCount = interaction.options.getInteger('winners');
                const dropgiveawayPrize = interaction.options.getString('prize');
            
                if(!dropgiveawayChannel.isText()) return interaction.reply({content: ':x: Merci de spécifier un salon textuel!',ephemeral: true});
            
                // Start the giveaway
                client.giveawaysManager.start(dropgiveawayChannel, {
                    // The number of winners for this drop
                    winnerCount: dropgiveawayWinnerCount,
                    // The prize of the giveaway
                    prize: dropgiveawayPrize,
                    // Who hosts this giveaway
                    hostedBy: client.config.hostedBy ? interaction.user : null,
                    // specify drop
                    isDrop: true,
                    // Messages
                    messages
                });
            
                await interaction.editReply({content:`Drop lancé dans ${dropgiveawayChannel}!`, ephemeral:true});
            break;

            case "reroll":
                // If the member doesn't have enough permissions
                if(!user.permissions.has('MANAGE_MESSAGES')) return interaction.reply({content: ':x: Vous devez avoir la permission "Gérer les messages" pour créer un giveaway.',ephemeral: true});
            
                const query = interaction.options.getString('giveaway_id');
                if(isNaN(query))return interaction.editReply({content:"Merci de spécifier une ID valide (nombre)"})

                // try to found the giveaway with prize then with ID
                const giveaway = 
                    // Search with giveaway prize
                    //client.giveawaysManager.giveaways.find((g) => g.prize === query && g.guildId === interaction.guild.id) ||
                    // Search with giveaway ID
                    client.giveawaysManager.giveaways.find((g) => g.messageId === query && g.guildId === interaction.guild.id);

                // If no giveaway was found
                if (!giveaway) return interaction.editReply({content: 'Je n\'ai pas trouvé de giveaway avec l\'id `'+ query +'`.',ephemeral: true});

                if (!giveaway.ended) return interaction.editReply({content: 'Le giveaway n\'est pas encore fini!',ephemeral: true});

                // Reroll the giveaway
                client.giveawaysManager.reroll(giveaway.messageId)
                .then(() => {
                    // Success message
                    interaction.editReply('Giveaway rerolled!');
                })
                .catch((e) => {
                    interaction.editReply({content: e,ephemeral: true});
                });
            break;
        }
    }
}