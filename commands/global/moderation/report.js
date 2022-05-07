const { SlashCommandBuilder } = require('@discordjs/builders');
const wait = require('util').promisify(setTimeout);
const { Permissions } = require('discord.js');
const { MessageEmbed } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('report')
		.setDescription('Porter plainte contre un utilisateur')
		.addUserOption(option => option.setName('target').setDescription('Membre').setRequired(true))
		.addStringOption(option => option.setName('reason').setDescription('Raison du report').setRequired(true)),
	async execute(interaction, client) {
        //interaction.reply({content:"Commande en cours de création...", ephemeral:true})
        const Ruser = interaction.options.getMember('target');
        if(!Ruser) return interaction.reply({content: `Je n'ai pas réussi à trouver l'utilisateur.`, ephemeral: true});
        let reason = interaction.options.getString('reason');
        
        //if(reason.lenght>=200) return interaction.reply({content:"La raison du report ne peut pas faire plus de 200 caractères!", ephemeral:true})
        const reportchannel = await client.channels.fetch('891238940118495273')
        reason = reason.substring(0,200);
        const reportEMBED = new MessageEmbed()
            .setColor(`#009500`)
            .setThumbnail(`https://i.imgur.com/zcZsfNA.png`)
            .setTitle(`➔ Art' Portal - Report`)
            .addFields(
                {
                    name: `__Vous avez trouvé un problème ?__`,
                    value: `En cas de problème avec notre bot, contactez un administrateur.`
                },
                { 
                    name: "・Utilisateur・",
                    value: `**Tag: ${Ruser.user.tag}\nID: ${Ruser.id}**`,
                    inline: true
                },
                { 
                    name: "・Raison du report・",
                    value: `**${reason !== null ? `${reason}` : 'No reason specified'}**`,
                    inline: true
                },
                {
                    name: `・Reporter・`,
                    value: `**${interaction.member.user.tag}**`
                },
                {
                    name: `・Date・`,
                    value: `<t:${Math.floor(new Date().getTime()/1000)}:D>`,
                    inline: true
                },
            )
        try{
            reportchannel.send({embeds: [reportEMBED]})
        	interaction.reply({content: "Report effectué!", embeds:[reportEMBED], ephemeral: true})
        }catch{
            return interaction.reply({content: "Erreur lors de l'execution de la commande! Raison possible: Je n'ai pas la permission d'envoyer des messages dans le salon de report! Merci d'en informer immédiatement un administrateur!", ephemeral: true})
        }
    },
};