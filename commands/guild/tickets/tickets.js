const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed, MessageButton, MessageActionRow, MessageSelectMenu } = require('discord.js')
const fs = require('fs')


module.exports = {
    data: new SlashCommandBuilder()
        .setName('ticket')
        .setDescription('Utiliser le système de tickets.')
        .addSubcommand(subcommand =>
            subcommand
                .setName('create')
                .setDescription('Créer un ticket.')
                .addStringOption(option =>
                    option.setName('content')
                        .setDescription('Raison du ticket (max 200 caractères).')
                        .setRequired(true)))
        .addSubcommand(subcommand =>
            subcommand
                .setName('setup')
                .setDescription('Mettre en place le système de tickets.')
                .addChannelOption(option =>
                    option.setName('ticketsendchannel')
                        .setDescription('Choisissez le salon où envoyer les demandes de tickets !')
                        .setRequired(true))),
    async execute(interaction, client) {
        //let ticketbdd = JSON.parse(fs.readFileSync("./ticketbdd.json").toString());
        function SaveTicketBDD() {
            fs.writeFile("./ticketbdd.json", JSON.stringify(ticketbdd, null, 4), (err) => {
                if (err) interaction.channel.send({ content: "Une erreur est survenue :c\n" + err, ephemeral: true });
            });
        }
        switch (interaction.options.getSubcommand()) {
            case 'create':
                await interaction.deferReply({ ephemeral: true });
                if (!interaction.member.permissions.has("ADMINISTRATOR")) return interaction.editReply({ content: `Vous n'avez pas la permisssion \`ADMINISTRATEUR\` pour effectuer cette commande.`, ephemeral: true });
                /*if (!ticketbdd[interaction.guild.id]) {
                    ticketbdd[interaction.guild.id] = {}
                }*/
                const demandeschannela = interaction.channel;

                await interaction.editReply({ content: `Le système de tickets a bien été mis en place !\nSalon où les tickets seront envoyés: <#${demandeschannela.id}>`, ephemeral: false });

                const ticketEmbeda = new MessageEmbed()
                    .setColor(`#7961fd`)
                    .setTitle("Commandes")
                    .setDescription("Tu veux passer commande ? Choisis avec le menu déroulant çi-dessous ! ^^")
                    .setThumbnail(`https://i.imgur.com/zcZsfNA.png`);

                demandeschannela.send({ embeds: [ticketEmbeda], components: [ticketgraphismtyperow] });
                
                
                /*//if (!ticketbdd[interaction.guild.id]) return interaction.editReply({ content: "Désolé, le système de ticket n'a pas été mis en place par un administrateur.", ephemeral: true })
                const blacklist = ticketbdd[interaction.guild.id]["blacklist"]
                if (blacklist.includes(interaction.user.id)) return interaction.editReply({ content: "Désolé, vous avez été blacklisté des tickets par un administrateur de ce serveur...", ephemeral: true })
                const demandeschannelid = ticketbdd[interaction.guild.id]["demandeschannel"]
                const ticketscategoryid = ticketbdd[interaction.guild.id]["ticketscategory"]
                if (demandeschannelid & ticketscategoryid) {
                    const demandeschannel = await client.channels.fetch(demandeschannelid)
                    const demandeEMBED = new MessageEmbed()
                        .setAuthor(interaction.user.tag)
                        .setTitle("Demande d'ouverture de ticket")
                        .setDescription(interaction.options.getString('content').substring(0, 200))
                    const ticketbtn = new MessageButton()
                        .setCustomId("ticket-" + interaction.guild.id + "-" + interaction.user.id + "-")
                        .setLabel("Prendre en charge la commande")
                        .setStyle('SUCCESS')
                    const blacklistbtn = new MessageButton()
                        .setCustomId("blacklist-" + interaction.user.id + "-")
                        .setLabel("Blacklister le demandeur")
                        .setStyle('DANGER')
                    const btnrow = new MessageActionRow()
                        .addComponents([ticketbtn, blacklistbtn]);
                    demandeschannel.send({ embeds: [demandeEMBED], components: [btnrow] })
                    await interaction.editReply({ content: "Votre demande a bien été envoyée!", ephemeral: true })
                } else return interaction.editReply({ content: "Le système de tickets n'a pas encore été configuré!\n Merci de demander à un administrateur de le faire !" })*/
                break;
            case 'setup':
                if (!interaction.member.permissions.has("ADMINISTRATOR")) return interaction.reply({ content: `Vous n'avez pas la permisssion \`ADMINISTRATEUR\` pour effectuer cette commande.`, ephemeral: true });
                /*if (!ticketbdd[interaction.guild.id]) {
                    ticketbdd[interaction.guild.id] = {}
                }*/
                const demandeschannel = interaction.options.getChannel('ticketsendchannel');
                const ticketscategory = interaction.options.getChannel('ticketscategory');
                /*if (!ticketbdd[interaction.guild.id]["blacklist"]) {
                    ticketbdd[interaction.guild.id] = { "demandeschannel": demandeschannel.id.toString(), "ticketscategory": ticketscategory.id.toString(), "blacklist": [] }
                } else {
                    ticketbdd[interaction.guild.id]["demandeschannel"] = demandeschannel.id.toString();
                   // ticketbdd[interaction.guild.id]["ticketscategory"] = ticketscategory.id.toString();
                }
                SaveTicketBDD()*/

                const ticketRow = new MessageActionRow()
                    .addComponents(
                        new MessageSelectMenu()
                            .setCustomId('ticketselect')
                            .setPlaceholder('Choisissez le type de ticket que vous voulez !')
                            .addOptions([
                                /*{
                                    label: 'Demande de graphisme',
                                    value: 'command_option',
                                    emoji: '🎨'
                                },*/
                                {
                                    label: 'Demande de partenariat',
                                    value: 'partnership_option',
                                    emoji: '💎'
                                },
                                {
                                    label: 'Contacter le Portal\'Staff',
                                    value: 'contact_option',
                                    emoji: '✉'
                                }
                            ]),
                    );

                await interaction.reply({ content: `Le système de tickets a bien été mis en place !\nSalon où les tickets seront envoyés: <#${demandeschannel.id}>`, ephemeral: false })

                const ticketEmbed = new MessageEmbed()
                    .setColor(`#7961fd`)
                    .setTitle("Tickets")
                    .setDescription("Tu veux faire une demande de partenariat / contacter le staff ?\nChoisis avec le menu déroulant çi-dessous ! ^^")
                    .setThumbnail(`https://i.imgur.com/zcZsfNA.png`)

                demandeschannel.send({ embeds: [ticketEmbed], components: [ticketRow] })
                break;
        }
    },
};

const ticketgraphismtyperow = new MessageActionRow()
    .addComponents(
        new MessageSelectMenu()
            .setCustomId('ticketgraphismtypeselect')
            .setPlaceholder('Choisissez le type de graphisme.')
            .addOptions([
                {
                    label: 'Logo/Logo',
                    value: 'ticket_logo',
                    emoji: '🖼'
                },
                {
                    label: 'Bannière/Banner (Discord)',
                    value: 'ticket_discordbanner',
                    emoji: '🧩'
                },
                {
                    label: 'Bannière/Banner (Youtube/Twitch)',
                    value: 'ticket_ytbbanner',
                    emoji: '🧩'
                },
                {
                    label: 'Dessin/Drawing',
                    value: 'ticket_drawing',
                    emoji: '✏'
                },
                {
                    label: 'Photo de profil/Profile picture',
                    value: 'ticket_profilpicture',
                    emoji: '🎆'
                },
                {
                    label: 'Video/Video',
                    value: 'ticket_video',
                    emoji: '🎞'
                },
                {
                    label: 'Overlay/Overlay',
                    value: 'ticket_overlay',
                    emoji: '🎥'
                },
                {
                    label: 'Emojis/Emotes',
                    value: 'ticket_emojis',
                    emoji: '😀'
                },
                {
                    label: 'Autre/Other',
                    value: 'ticket_other',
                    emoji: '🎈'
                }
            ]),
    );