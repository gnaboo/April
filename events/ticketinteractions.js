const { Discord, MessageEmbed, MessageActionRow, MessageSelectMenu, MessageButton } = require('discord.js');
const fs = require('fs')

module.exports = {
	name: 'interactionCreate',
	async execute(interaction, client) {
        if (interaction.isButton()){
            const stringarrayticket = interaction.customId.split("-")
            //const ticketbdd = JSON.parse(fs.readFileSync("./ticketbdd.json").toString());
            switch (stringarrayticket[0]) {
                case 'ticket':
                    const categoryid = ticketbdd[interaction.guild.id]["ticketscategory"]
                    if (!categoryid) return interaction.reply({content: "La catégorie où créer le ticket n'a pas été spécifiée ! Merci de demander à un administrateur de résoudre le problème."})
                    await interaction.reply({content:"Création du ticket en cours...", ephemeral: true})
                    const id = stringarrayticket[2]
                    const member = interaction.guild.members.cache.get(id);
                    if(!member) return interaction.editReply({content:"L'utilisateur ayant fait la commande a quitté le serveur...", ephemeral:true})
                    const demandecontent = (interaction.message.embeds[0].description);
                    const ticketEMBED = new MessageEmbed()
                    .setColor(`#008B8B`)
                    .setAuthor(`➔ ${interaction.guild.name} - Ticket`)
                    .setDescription(`**__Votre ticket a été créé avec succès !__** \n \n **Utilisateur:** ${member.user.username} \n **ID:** ${id} \n \n Date de création du ticket: <t:${Math.floor(new Date().getTime()/1000)}:D>\n \n**Commande:** ${demandecontent}`)
                    interaction.guild.channels.create(`ticket-${member.user.username}`, {
                        type: 'text',
                        parent: categoryid,
                        permissionOverwrites: [
                            {
                                deny: "VIEW_CHANNEL",
                                id: interaction.guild.id
                            },
                            {
                                allow: ["VIEW_CHANNEL", "SEND_MESSAGES", "ATTACH_FILES", "READ_MESSAGE_HISTORY", "ADD_REACTIONS"],
                                id: id
                            },
                            {
                                allow: ["VIEW_CHANNEL", "SEND_MESSAGES", "ATTACH_FILES", "READ_MESSAGE_HISTORY", "ADD_REACTIONS"],
                                id: interaction.user.id
                            }
                        ]
                    }).then(async channel => {
                        setTimeout(async function(){
                            await interaction.editReply({content: `Le ticket a bien été ouvert!\n<#${channel.id}>`, ephemeral:true});
                            channel.send(`<@${id}> <@${interaction.user.id}>`).then(async msg => {
                                msg.delete();
                            });
                            channel.send({embeds: [ticketEMBED], components:[closeticketrow]})
                            const demandeEMBED = new MessageEmbed()
                            .setAuthor(member.user.tag)
                            .setTitle("Commande de graphisme")
                            .setDescription(`La commande a été prise en compte par ${interaction.user.tag}`)
                            await interaction.message.edit({embeds:[demandeEMBED], components:[takenticketrow]})
                        }, 2000);
                    })
                break;
                case 'closeticket':
                    if(!interaction.member.permissions.has("ADMINISTRATOR")) return interaction.reply({content: `Vous n'avez pas la permisssion \`ADMINISTRATEUR\` pour effectuer cette commande.`, ephemeral: true});
                    await interaction.reply({content:"Fermeture du ticket en cours..."})
                    await interaction.channel.delete()
                break;
                case 'blacklist':
                    const blacklist = ticketbdd[interaction.guild.id]["ticketscategory"]
                    break;
            }
        }
	},
}


const takenticketbtn = new MessageButton()
    .setCustomId("taken-graph")
    .setLabel("Prendre en charge la commande")
    .setStyle('SUCCESS')
    .setDisabled(true)


const takenticketrow = new MessageActionRow()
    .addComponents(takenticketbtn);

const closeticketbtn = new MessageButton()
    .setCustomId("closeticket")
    .setLabel("Fermer le ticket")
    .setStyle('DANGER')

const closeticketrow = new MessageActionRow()
    .addComponents(closeticketbtn);