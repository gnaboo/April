const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed } = require('discord.js');

module.exports = {

    data: new SlashCommandBuilder()
        .setName('ban')
        .setDescription('Bannir un utilisateur !')
        .addUserOption(option => option.setName('user').setDescription('Membre à bannir').setRequired(true))
        .addStringOption(option => option.setName('reason').setDescription('Raison').setRequired(true)),

    async execute(interaction) {

        const user = interaction.options.getMember('user');
        const reason = interaction.options.getString('reason');
        
        if(!user) return interaction.reply({content: `Je n'ai pas réussi à trouver l'utilisateur.`, ephemeral: true});
        
        const userRoleRawPos = user.roles.highest.rawPosition;
        const memberRoleRawPos = interaction.member.roles.highest.rawPosition;

        if(!interaction.member.permissions.has("BAN_MEMBERS")) return interaction.reply({content: `Vous n'avez pas la permisssion \`BAN_MEMBERS\` pour effectuer cette commande.`, ephemeral: true});

        if(user.user.id === interaction.user.id) return interaction.reply({content: `Vous ne pouvez pas vous bannir vous-même! !`, ephemeral: true});

        if(userRoleRawPos >= memberRoleRawPos) return interaction.reply({content: `Vous ne pouvez pas bannir cet utilisateur.`, ephemeral: true});

        if(!user.bannable) return interaction.reply({content: `Je ne peux pas bannir cet utilisateur. Cela est dû au fait que l'utilisateur est modérateur/administrateur ou que son rôle est au dessus du rôle du bot...`, ephemeral: true});

        await user.ban({reason: reason !== null ? `${reason}` : 'No reason specified'});

        const banEMBED = new MessageEmbed()
        .setColor(`#009500`)
        .setThumbnail(`https://i.imgur.com/zcZsfNA.png`)
        .setTitle(`➔ Art' Portal - Bannissement`)
        .addFields(
            { 
                name: "・Utilisateur.trice・",
                value: `**Tag: ${user.user.tag}\nID: ${user.user.id}**`,
                inline: true
            },
            { 
                name: "・Raison du bannissement・",
                value: `**${reason !== null ? `${reason}` : 'No reason specified'}**`,
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
        await interaction.reply({embeds: [banEMBED], ephemeral: true});
		const channel = await interaction.guild.channels.cache.get("806565484115263528")
		await channel.send({ embeds: [banEMBED] })
      
    }
  
};