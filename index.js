const fs = require('fs');
const { Client, Collection, Intents, Permissions } = require('discord.js');
const Discord = require('discord.js');
const { MessageActionRow, MessageEmbed, MessageSelectMenu, MessageButton } = require('discord.js');
const { DiscordTogether } = require('discord-together');
const { token } = require('./config.json');
const config = require('./config.json');
const { mongoConnect } = require('./functions');
require('dotenv').config();

const client = new Client({ shards: "auto", partials: ["CHANNEL"], intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_PRESENCES, Intents.FLAGS.GUILD_MEMBERS, Intents.FLAGS.GUILD_MESSAGE_REACTIONS, Intents.FLAGS.GUILD_MESSAGES] });
const discordModals = require('discord-modals');
discordModals(client);
client.config = config;
client.discordTogether = new DiscordTogether(client);

process.on('uncaughtException', function (err) {
  console.error(err);
  console.log("Process prevented from crashing...");
});

client.commands = new Collection();

const eventFiles = fs.readdirSync('./events').filter(file => file.endsWith('.js'));

for (const file of eventFiles) {
	const event = require(`./events/${file}`);
	if (event.once) {
		client.once(event.name, (...args) => event.execute(...args, client));
	} else {
		client.on(event.name, (...args) => event.execute(...args, client));
	}
}

client.commands = new Collection();
//const globalcommandCategories = fs.readdirSync('./commands/global').filter(file => !file.includes('.'));
const guildcommandCategories = fs.readdirSync('./commands/guild').filter(file => !file.includes('.'));
/*for (const category of globalcommandCategories) {
	const commandFiles = fs.readdirSync(`./commands/global/${category}`).filter(file => file.endsWith('.js'));
	for (const file of commandFiles) {
		const command = require(`./commands/global/${category}/${file}`);
		client.commands.set(command.data.name, command);
		console.log(`Loaded global/${category}/${command.data.name}!`)
	}
}*/
for (const category of guildcommandCategories) {
	const commandFiles = fs.readdirSync(`./commands/guild/${category}`).filter(file => file.endsWith('.js'));
	for (const file of commandFiles) {
		const command = require(`./commands/guild/${category}/${file}`);
		client.commands.set(command.data.name, command);
		console.log(`Loaded guild/${category}/${command.data.name}!`);
	}
}

client.once('ready', () => {
	console.log('Ready!');
    /*client.ws.on('INTERACTION_CREATE', (data) => {
    	if (!data.type) return;    
    	if (data.type == 5) {
    		client.emit('modalSubmit', new (require('discord-modals').ModalSubmitInteraction)(client, data));
    	} else return;
	});*/
});

client.on('error', async (err) => {
  console.error(err);
});

client.on('modalSubmit', async (modal) => {
	if(modal.customId === 'suggestionmodal'){
		await modal.deferReply({ ephemeral: true });
		const suggestioncontent = modal.getTextInputValue('suggestion');
		const message = await modal.channel.send({content: `Suggestion de <@${modal.user.id}>:\n${suggestioncontent}`});
		const thread = await message.startThread({
			name: 'Suggestion-'+modal.user.username,
			autoArchiveDuration: 24*60,
			reason: "Suggestion faite par "+modal.user.username,
		});
		await modal.followUp({content:"Votre suggestion a bien été postée !", ephemeral: true});
	}else if(modal.customId === 'questionmodal'){
		await modal.deferReply({ ephemeral: true });
		const suggestioncontent = modal.getTextInputValue('question');
		const message = await modal.channel.send({content: `Question de <@${modal.user.id}>:\n${suggestioncontent}`});
		const thread = await message.startThread({
			name: 'Question-'+modal.user.username,
			autoArchiveDuration: 24*60,
			reason: "Question posée par "+modal.user.username,
		});
		await modal.followUp({content:"Votre suggestion a bien été postée !", ephemeral: true});
	}else if(modal.customId === 'applicationmodal'){
		await modal.deferReply({ ephemeral: true });
		const motivation = modal.getTextInputValue('application_motivation');
		const aptitudes = modal.getTextInputValue('application_aptitudes');
		const presentation = modal.getTextInputValue('application_presentation');
		const disponibilites = modal.getTextInputValue('application_disponibilites');
		const applicationchannel= client.channels.cache.find(channel => channel.id === '934898908407144469');
		const applicationEMBED = new MessageEmbed()
    	    .setColor(`#7961fd`)
			.setTitle("Art'Portal - Candidature Staff")
			.addFields(
				{ 
					name: "・Candidat・",
					value: `**Tag: ${modal.user.tag}\nID: ${modal.user.id}**`,
					inline: true
				},
				{ 
					name: "・Motivation・",
					value: `${motivation}`,
					inline: false
				},
				{
					name: `・Aptitudes・`,
					value: `${aptitudes}`,
					inline: false
				},
				{
					name: `・Présentation・`,
					value: `${presentation}`,
					inline: false
				},
				{
					name: `・Disponibilité・`,
					value: `${disponibilites}`,
					inline: false
				},
				{
					name: `・Date de la candidature・`,
					value: `<t:${Math.floor(new Date().getTime()/1000)}:D>`,
					inline: true
				},
			);
		
		const openapplicationticket = new MessageButton()
			.setCustomId("applicationticket_staff_"+modal.user.id)
			.setLabel("Ouvrir un ticket")
			.setStyle('SUCCESS')
			.setEmoji("🎫");
		const applicationrow = new MessageActionRow()
			.addComponents([openapplicationticket]);
		applicationchannel.send({embeds:[applicationEMBED], components:[applicationrow]});
		await modal.followUp({ content: 'Votre candidature a bien été envoyée au staff !', embeds:[applicationEMBED], ephemeral: true });
	} else if(modal.customId === 'applicationmodalartist'){
		await modal.deferReply({ ephemeral: true });
		const motivation = modal.getTextInputValue('application_motivation');
		const aptitudes = modal.getTextInputValue('application_aptitudes');
		const presentation = modal.getTextInputValue('application_presentation');
		const disponibilites = modal.getTextInputValue('application_examples');
		const applicationchannel= client.channels.cache.find(channel => channel.id === '950124391159697540');
		const applicationEMBED = new MessageEmbed()
    	    .setColor(`#7961fd`)
			.setTitle("Art'Portal - Candidature Artiste")
			.addFields(
				{ 
					name: "・Candidat・",
					value: `**Tag: ${modal.user.tag}\nID: ${modal.user.id}**`,
					inline: true
				},
				{ 
					name: "・Motivation・",
					value: `${motivation}`,
					inline: false
				},
				{
					name: `・Aptitudes・`,
					value: `${aptitudes}`,
					inline: false
				},
				{
					name: `・Présentation・`,
					value: `${presentation}`,
					inline: false
				},
				{
					name: `・Exemples de créations・`,
					value: `${disponibilites}`,
					inline: false
				},
				{
					name: `・Date de la candidature・`,
					value: `<t:${Math.floor(new Date().getTime()/1000)}:D>`,
					inline: true
				},
			);
		
			const openapplicationticket = new MessageButton()
				.setCustomId("applicationticket_artiste_"+modal.user.id)
				.setLabel("Ouvrir un ticket")
				.setStyle('SUCCESS')
				.setEmoji("🎫");
			const applicationrow = new MessageActionRow()
				.addComponents([openapplicationticket]);
		applicationchannel.send({embeds:[applicationEMBED], components:[applicationrow]});
		await modal.followUp({ content: 'Votre candidature a bien été envoyée au staff !', embeds:[applicationEMBED], ephemeral: true });
	} else if (modal.customId.startsWith("commandmodal_")){
		await modal.deferReply({ ephemeral: true });
        var commandType = "";
        if (modal.customId.replace("commandmodal_","") === "ticket_logo") {
            commandType = "Logo";
        } else if (modal.customId.replace("commandmodal_","") === "ticket_discordbanner") {
            commandType = "Bannière Discord";
        } else if (modal.customId.replace("commandmodal_","") === "ticket_ytbbanner") {
            commandType = "Bannière Youtube/Twitch/...";
        } else if (modal.customId.replace("commandmodal_","") === "ticket_drawing") {
            commandType = "Dessin";
        } else if (modal.customId.replace("commandmodal_","") === "ticket_profilpicture") {
            commandType = "Photo de profil";
       } else if (modal.customId.replace("commandmodal_","") === "ticket_video") {
            commandType = "Vidéo/Montage";
        } else if (modal.customId.replace("commandmodal_","") === "ticket_overlay") {
            commandType = "Overlay de stream";
        } else if (modal.customId.replace("commandmodal_","") === "ticket_emojis") {
            commandType = "Émojis/Emote";
        } else if (modal.customId.replace("commandmodal_","") === "ticket_other") {
            commandType = "Autre";
        } else {//En cas d'oubli/bug, pour éviter de planter :3
            commandType = "Non spécifié";
        }
		const theme = modal.getTextInputValue('command_theme');
		const desc = modal.getTextInputValue('command_description');
		const top = modal.getTextInputValue('command_toppings');
		const baseimg = modal.getTextInputValue('command_baseimage');
		

        await modal.guild.channels.create("ticket-" + modal.user.username, {
            type: 'GUILD_TEXT',
            permissionOverwrites: [
	    		{
                	id: modal.user.id,
               		allow: [Permissions.FLAGS.VIEW_CHANNEL],
           		},
           	],
        }).then(async channel => {
            let category = modal.guild.channels.cache.find(cat => cat.id === "780559502105378836");

            await channel.setParent(category.id);
			await channel.permissionOverwrites.create(modal.user.id, { VIEW_CHANNEL: true });
            var btnrowTicket = new MessageActionRow()
                .addComponents([
                    new MessageButton()
                    .setLabel("Prendre en charge")
                    .setStyle("SUCCESS")
                    .setEmoji("✏")
                    .setCustomId("takeCommand"),
                    new MessageButton()
                    .setLabel("Supprimer le ticket")
                    .setStyle("DANGER")
                    .setEmoji("🗑")
                    .setCustomId("delete"),
                ]);

            const commandEmbed = new MessageEmbed()
                .setColor(`#7961fd`)
                .setTitle("Commande: " + commandType)
                .setDescription("Un artiste viendra prendre votre commande bientôt !\n> :x: Si l'artiste ne reçoit aucune réponse pendant plusieurs jours de suite, le ticket sera fermé/mis en attente\n> Si vous quittez le serveur avec ce ticket ouvert, vous serez blacklist: vous ne pourrez pas repasser commande.");

            await channel.send({ content: "Bienvenue <@" + modal.user.id + ">\n@ Portal' Artiste un ticket a été ouvert!", embeds: [commandEmbed], components: [btnrowTicket] }).then(msg => msg.pin());
            
			const commandtosendEMBED = new MessageEmbed()
	    	    .setColor(`#7961fd`)
				.setTitle("__Formulaire de commande Art' Portal__")
				.addFields(
					{ 
						name: "・Type de graphisme・",
						value: `${commandType? commandType : "Non spécifié"}`,
						inline: false
					},
					{ 
						name: "・Thème imposé・",
						value: `${theme? theme : "Non spécifié"}`,
						inline: false
					},
					{
						name: `・Description de l'image・`,
						value: `${desc? desc : "Non spécifié"}`,
						inline: false
					},
					{
						name: `・Effets, détails, texte à ajouter・`,
						value: `${top? top : "Non spécifié"}`,
						inline: false
					},
					{
						name: `・Image(s) de Base・`,
						value: `${baseimg? baseimg : "Non spécifié"}`,
						inline: false
					},
				);
			await channel.send({embeds:[commandtosendEMBED]}).then(msg => msg.pin());
            //await channel.send(`<:PortalLogo:881610563262750751> - **__Formulaire de commande Art' Portal__**\n\n**__Type de Graphisme :__**\n${commandType? commandType : "Non spécifié"}\n\n**__Thème imposé :__**\n${theme? theme : "Non spécifié"}\n\n**__Description de l'image :__**\n${desc? desc : "Non spécifié"}\n\n**__Effets, détails, texte à ajouter :__**\n${top? top : "Non spécifié"}\n\n**__Image(s) de Base :__**\n${baseimg? baseimg : "Non spécifié"}`)
            await modal.followUp({ content: "Ton ticket a bien été créé ! (<#" + channel.id + ">)", ephemeral: true });
        }).catch(console.error);
	} else if (modal.customId=='partnershipmodal'){
		await modal.deferReply({ ephemeral: true });
		await modal.guild.channels.create("ticket-" + modal.user.username, {
			type: 'GUILD_TEXT',
            permissionOverwrites: [
                {
                	id: modal.user.id,
                	allow: [Permissions.FLAGS.VIEW_CHANNEL],
                },
            ],
		}).then(async channel => {
			let category = modal.guild.channels.cache.find(cat => cat.id === "847188286043717632")

			await channel.setParent(category.id);
			await channel.permissionOverwrites.create(modal.user.id, { VIEW_CHANNEL: true });

			var btnrowTicket = new MessageActionRow()
				.addComponents([
					new MessageButton()
						.setLabel("Supprimer le ticket")
						.setStyle("DANGER")
						.setEmoji("🗑")
						.setCustomId("delete"),
				]);

			const commandEmbed = new MessageEmbed()
				.setColor(`#7961fd`)
				.setDescription("*Merci de patienter un peu*")

			await channel.send({ content: "Bienvenue <@" + modal.user.id + ">\n@ Portal' Staff un ticket a été ouvert!", embeds: [commandEmbed], components: [btnrowTicket] }).then(msg => msg.pin());
			await channel.send(`Invitation / Lien : ${modal.getTextInputValue('partnership_servinvite')}\nDescription : ${modal.getTextInputValue('partnership_servdesc')}`).then(msg => msg.pin());
			await modal.followUp({ content: "Ton ticket a bien été créé ! (<#" + channel.id + ">)", ephemeral: true })
		}).catch(console.error);
	} else if (modal.customId=='modpanel_banmodal'){
		await modal.deferReply({ephemeral: true})
		const userId = modal.getTextInputValue('modpanel_ban_userid');
		const reason = modal.getTextInputValue('modpanel_ban_reason');

		const user = await modal.guild.members.cache.get(userId)

		if(!user) return modal.followUp({content: `Je n'ai pas réussi à trouver l'utilisateur.`, ephemeral: true});
        
        const userRoleRawPos = user.roles.highest.rawPosition;
        const memberRoleRawPos = modal.member.roles.highest.rawPosition;

        if(!modal.member.permissions.has("BAN_MEMBERS")) return modal.followUp({content: `Vous n'avez pas la permisssion \`BAN_MEMBERS\` pour effectuer cette commande.`, ephemeral: true});

        if(user.user.id === modal.user.id) return modal.followUp({content: `Vous ne pouvez pas vous bannir vous-même! !`, ephemeral: true});

        if(userRoleRawPos >= memberRoleRawPos) return modal.followUp({content: `Vous ne pouvez pas bannir cet utilisateur.`, ephemeral: true});

        if(!user.bannable) return modal.followUp({content: `Je ne peux pas bannir cet utilisateur. Cela est dû au fait que l'utilisateur est modérateur/administrateur ou que son rôle est au dessus du rôle du bot...`, ephemeral: true});

        await user.ban({reason: reason !== null ? `${reason}` : 'Aucune raison précisée'});

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
                value: `**${modal.member.user.tag}**`
            },
            {
                name: `・Date・`,
                value: `<t:${Math.floor(new Date().getTime()/1000)}:D>`,
                inline: true
            },
        )
        await modal.followUp({embeds: [banEMBED], ephemeral: true});
		const channel = await modal.guild.channels.cache.get("806565484115263528");
		await channel.send({ embeds: [banEMBED] });
	} else if (modal.customId == "modpanel_mutemodal"){
		await modal.deferReply({ephemeral: true})
		const userId = modal.getTextInputValue('modpanel_mute_userid');
		const reason = modal.getTextInputValue('modpanel_mute_reason');
		const duration = modal.getTextInputValue('modpanel_mute_duration');
		
		const user = await modal.guild.members.cache.get(userId)
        
        if(!user) return modal.followUp({content: `Je n'ai pas réussi à trouver l'utilisateur.`, ephemeral: true});
        
        const userRoleRawPos = user.roles.highest.rawPosition;
        const memberRoleRawPos = modal.member.roles.highest.rawPosition;

        if(!modal.member.permissions.has("MODERATE_MEMBERS")) return modal.followUp({content: `Vous n'avez pas la permisssion \`MODERATE_MEMBERS\` pour effectuer cette commande.`, ephemeral: true});

        if(user.user.id === modal.user.id) return modal.followUp({content: `Vous ne pouvez pas vous mute vous-même! !`, ephemeral: true});

        if(userRoleRawPos >= memberRoleRawPos) return modal.followUp({content: `Vous ne pouvez pas mute cet utilisateur.`, ephemeral: true});

        if(!user.bannable) return modal.followUp({content: `Je ne peux pas mute cet utilisateur. Cela est dû au fait que l'utilisateur est modérateur/administrateur ou que son rôle est au dessus du rôle du bot...`, ephemeral: true});

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
                value: `**${modal.member.user.tag}**`
            },
            {
                name: `・Date・`,
                value: `<t:${Math.floor(new Date().getTime()/1000)}:D>`,
                inline: true
            },
        )
        await modal.followUp({embeds: [timeoutEMBED], ephemeral: true});
		const channel = await modal.guild.channels.cache.get("806565484115263528")
		await channel.send({ embeds: [timeoutEMBED] })
	}
});


client.on('guildMemberAdd', async guildMember => {
	//console.log("1")
	//console.log(member.guild.id)
	//console.log(guild.id)
	const guild = guildMember.guild
    if (guild.id=="766324873546563615"){
		const channel = await guild.channels.cache.find(c => c.id=='810585812394967091');
		try{
			channel.send({ content: welcomemessage.replace("[memberid]", guildMember.id)});
		}catch(error){
			console.log(error)
		};
	}
});//OwO ?

const welcomemessage = 
"☆ Bienvenue <@[memberid]> ☆\n"+
"\n"+
"Je t'invite à aller lire le <#766336361984294913> ainsi que de prendre tes rôles dans <#947860675017973841>\n"+
"Nous espérons que tu passera un bon moment sur Art' Portal ! ^^"

client.login(token);
