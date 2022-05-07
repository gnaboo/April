const simplydjs = require('simply-djs');
const { SlashCommandBuilder } = require('@discordjs/builders');
const wait = require('util').promisify(setTimeout);


module.exports = {
	data: new SlashCommandBuilder()
		.setName('calculator')
		.setDescription('Calculatrice virtuelle'),
	async execute(interaction) {
        try{
            simplydjs.calculator(interaction, {    
                slash: true,
                // other options
            })
        }catch{
            interaction.reply({content: "Erreur lors de l'execution de la commande! Raison possible: Je n'ai pas la permission d'envoyer des messages dans ce salon!", ephemeral: true})
        }
    },
};