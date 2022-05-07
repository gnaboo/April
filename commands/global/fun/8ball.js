const { SlashCommandBuilder } = require('@discordjs/builders');
const wait = require('util').promisify(setTimeout);
const {MessageEmbed} = require('discord.js')

module.exports = {
	data: new SlashCommandBuilder()
		.setName('8ball')
		.setDescription('Divination avec la boule 8 magique.')
        .addStringOption(option =>
            option.setName('question')
                .setDescription('Question')
                .setRequired(true)),
	async execute(interaction) {
        const question = interaction.options.getString('question');
        
        let eightBall = [
            'C\'est certain!',
            'C\'est fort probable.',
            'Sans aucun doute.',
            'Oui - Définitivement',
            'Cela repose sur tes épaules',
            'Comme je le vois, oui',
            'D\'un certain point de vue, c\'est fort probable',
            'Beaucoup pourraient prétendre le contraire.',
            'D\'aucuns partagent cet avis.',
            'C\'est un possibilité à prendre en compte',
            'Ca à l\'air bien engagé',
            'Oui',
            'Il y a des arguments en la faveur de cette théorie',
            'Erreur de transmission, merci de rééssayer',
            'Redemandez plus tard.',
            'Il vaut mieux que tu n\'en saches rien pour le moment',
            'Je ne devrais pas te le direq',
            'Désolé, je ne suis pas en mesure de prédire immédiatement',
            'Concentre-toi et redemande',
            'Ne compte pas là-dessus',
            'Ma réponse est non',
            'Mes sources disent non',
            'Réponse mitigée',
            'On peut en douter'
    ];

        let answer = Math.floor(Math.random() * eightBall.length);

        let eightballembed = new MessageEmbed()
            .setColor(`#7961fd`)
            .setTitle(`${question}`)
            .setDescription(`🎱 <@${interaction.member.id}>, ${eightBall[answer]}`,)
            .setFooter(`Portal'Bot - 🎱`)
        

        await interaction.reply({embeds: [eightballembed], ephemeral: true});
    },
};

