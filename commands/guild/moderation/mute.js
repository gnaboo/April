const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed } = require('discord.js');

module.exports = {

    data: new SlashCommandBuilder()
        .setName('mute')
        .setDescription('Réduire un utilisateur au silence !')
        .addUserOption(option => option.setName('user').setDescription('Membre à bannir').setRequired(true))
        .addStringOption(option => option.setName('reason').setDescription('Raison').setRequired(true))
        .addStringOption(option => option.setName('durtion').setDescription('Durée EN MINUTES (Ex: 60)').setRequired(true)),

    async execute(interaction) {
	return interaction.guild.channels.create("test",{
	    type: 15
	})

        const user = interaction.options.getMember('user');
        const reason = interaction.options.getString('reason');
        const duration = interaction.options.getString('duration');
        
        if(!user) return interaction.reply({content: `Je n'ai pas réussi à trouver l'utilisateur.`, ephemeral: true});
        
        const userRoleRawPos = user.roles.highest.rawPosition;
        const memberRoleRawPos = interaction.member.roles.highest.rawPosition;

        if(!interaction.member.permissions.has("TIMEOUT_MEMBERS")) return interaction.reply({content: `Vous n'avez pas la permisssion \`BAN_MEMBERS\` pour effectuer cette commande.`, ephemeral: true});

        if(user.user.id === interaction.user.id) return interaction.reply({content: `Vous ne pouvez pas vous mute vous-même! !`, ephemeral: true});

        if(userRoleRawPos >= memberRoleRawPos) return interaction.reply({content: `Vous ne pouvez pas mute cet utilisateur.`, ephemeral: true});

        if(!user.bannable) return interaction.reply({content: `Je ne peux pas mute cet utilisateur. Cela est dû au fait que l'utilisateur est modérateur/administrateur ou que son rôle est au dessus du rôle du bot...`, ephemeral: true});

        try{
            await user.timeout(duration * 60 * 1000)
        }catch(error){
            console.error(error)
        };

        const timeoutEMBED = new MessageEmbed()
        .setColor(`#009500`)
        .setThumbnail(`https://i.imgur.com/zcZsfNA.png`)
        .setTitle(`➔ Art' Portal - Mute`)
        .addFields(
            { 
                name: "・Utilisateur.trice・",
                value: `**Tag: ${user.user.tag}\nID: ${user.user.id}**`,
                inline: true
            },
            { 
                name: "・Raison du mute・",
                value: `**${reason !== null ? `${reason}` : 'No reason specified'}**`,
                inline: true
            },
            { 
                name: "・Durée du mute・",
                value: `**${duration !== null ? `${duration}` : 'No duration specified'}**`,
                inline: true
            },
            {
                name: `・Modérateur.trice・`,
                value: `**${interaction.member.user.tag}**`
            },
            {
                name: `・Date・`,
                value: `<t:${Math.floor(new Date().getTime()/1000)}:D>`,
                inline: true
            },
        )
        await interaction.reply({embeds: [timeoutEMBED], ephemeral: true});
		const channel = await interaction.guild.channels.cache.get("806565484115263528")
		await channel.send({ embeds: [timeoutEMBED] })
    }
  
};