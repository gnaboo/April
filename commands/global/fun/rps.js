const simplydjs = require('simply-djs');
const { SlashCommandBuilder } = require('@discordjs/builders');
const wait = require('util').promisify(setTimeout);


module.exports = {
	data: new SlashCommandBuilder()
		.setName('rps')
		.setDescription('Jouer au morpion')
        .addUserOption(option =>
            option.setName('target')
                .setDescription('Adversaire')
                .setRequired(true)),
	async execute(interaction) {
		if(interaction.channel.type === 'DM') return interaction.reply({content: "Vous ne pouvez pas executer cette commande en messages privés!", ephemeral: true})
        const user = interaction.options.getMember('target');
        try{
            simplydjs.rps(interaction, {    
                slash: true,
                // other options
            })
        }catch{
            interaction.reply({content: "Erreur lors de l'execution de la commande! Raison possible: Je n'ai pas la permission d'envoyer des messages dans ce salon!", ephemeral: true})
        }
    },
};