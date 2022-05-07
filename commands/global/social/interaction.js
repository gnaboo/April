const { SlashCommandBuilder } = require('@discordjs/builders');
const Discord = require('discord.js');
const { MessageEmbed } = require('discord.js');
const wait = require('util').promisify(setTimeout);
const anime =  require('anime-actions')
module.exports = {
	data: new SlashCommandBuilder()
		.setName('interaction')
		.setDescription('Interactions sociales.')
		.addSubcommand(subcommand =>
			subcommand
				.setName('baka')
				.setDescription('Traiter un utilisateur de baka.')
				.addUserOption(option => option.setName('target').setDescription('The user').setRequired(true)))
		.addSubcommand(subcommand =>
			subcommand
				.setName('blush')
				.setDescription('Rougir (soi-même).'))
		.addSubcommand(subcommand =>
			subcommand
				.setName('hug')
				.setDescription('Câliner un utilisateur.')
				.addUserOption(option => option.setName('target').setDescription('The user').setRequired(true)))
		.addSubcommand(subcommand =>
			subcommand
				.setName('kill')
				.setDescription('Trucider un utilisateur.')
				.addUserOption(option => option.setName('target').setDescription('The user').setRequired(true)))
		.addSubcommand(subcommand =>
			subcommand
				.setName('kiss')
				.setDescription('Embrasser un utilisateur.')
				.addUserOption(option => option.setName('target').setDescription('The user').setRequired(true)))
		.addSubcommand(subcommand =>
			subcommand
				.setName('punch')
				.setDescription('Frapper un utilisateur.')
				.addUserOption(option => option.setName('target').setDescription('The user').setRequired(true))),
	async execute(interaction, client) {
		try{
			const member = interaction.options.getMember('target');
            switch(interaction.options.getSubcommand()){
                case 'baka':
					const interactionauthora = interaction.user.username
                    var embedBAKA = new MessageEmbed()
                    .setColor("#FFFF00")
                    .setTitle("Baka!")
                    .setDescription(`${member.user.username} est traité de baka par ${interactionauthora}!`)
                    .setImage(await anime.baka())
                    .setFooter("Baka", 'https://cdn.discordapp.com/avatars/798908537894862858/d5d4cc678320855b1d5e2982a2794b98.png');

                    await interaction.reply({embeds: [embedBAKA], components: [] })
                break;

                case 'blush':
					const interactionauthorb = interaction.user.username
                    var embedBLUSH = new MessageEmbed()
					.setColor("ff0080")
					.setTitle("Ooh!")
					.setDescription(`${interactionauthorb} rougit!`)
					.setImage(await anime.blush())
					.setFooter("Blush", 'https://cdn.discordapp.com/avatars/798908537894862858/d5d4cc678320855b1d5e2982a2794b98.png');
        			await interaction.reply({embeds: [embedBLUSH], components: [] })
				break;

                case 'hug':
					const interactionauthorc = interaction.user.username
					var embedHUG = new MessageEmbed()
					.setColor("#c601c0")
					.setTitle("<3!")
					.setDescription(`${member.user.username} reçoit un câlin de ${interactionauthorc}!`)
					.setImage(await anime.hug())
					.setFooter("Hug", 'https://cdn.discordapp.com/avatars/798908537894862858/d5d4cc678320855b1d5e2982a2794b98.png');
					
					await interaction.reply({embeds: [embedHUG], components: [] })
				break;

                case 'kill':
					const interactionauthord = interaction.user.username
					var embedKILL = new MessageEmbed()
					.setColor("#070104")
					.setTitle("🔪")
					.setDescription(`${member.user.username} se fait tuer par ${interactionauthord}!`)
					.setImage(await anime.kill())
					.setFooter("Kill", 'https://cdn.discordapp.com/avatars/798908537894862858/d5d4cc678320855b1d5e2982a2794b98.png');
					
					await interaction.reply({embeds: [embedKILL], components: [] })
				break;

                case 'kiss':
					const interactionauthore = interaction.user.username
                    var embedKISS = new MessageEmbed()
					.setColor("#c601c0")
					.setTitle("<3!")
					.setDescription(`${member.user.username} reçoit un baiser de ${interactionauthore}!`)
					.setImage(await anime.kiss())
					.setFooter("Kiss", 'https://cdn.discordapp.com/avatars/798908537894862858/d5d4cc678320855b1d5e2982a2794b98.png');
					
					await interaction.reply({embeds: [embedKISS], components: [] })
				break;

                case 'punch':
					const interactionauthorf = interaction.user.username
					var embedPUNCH = new MessageEmbed()
					.setColor("ff0080")
					.setTitle("Ooh!")
					.setDescription(`${interactionauthorf} frappe ${member.user.username}!`)
					.setImage(await anime.punch())
					.setFooter("Punch", 'https://cdn.discordapp.com/avatars/798908537894862858/d5d4cc678320855b1d5e2982a2794b98.png');
					
					await interaction.reply({embeds: [embedPUNCH], components: [] })
				break;
            }
        }catch(err){
            await interaction.reply({content:"Désolé, je n'ai pas pu envoyer le message. Le problème vient probablement d'une de mes API. Mersi d'attendre, le problème devrait être résolu d'ici quelques heures.", ephemeral: true})
			console.log(err)
		}
	},
};

/*.addUserOption(option =>
            option.setName('target')
                .setDescription('Sélectionnez un utilisateur')
                .setRequired(true)),*/