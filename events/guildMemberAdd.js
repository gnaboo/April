module.exports = {
	name: 'guildMemberAdd',
	on: true,
	async execute(guild, client, member) {
        if (guild.id=="766324873546563615"){
			const channel = await guild.channels.cache.find(c => c.id=='810585812394967091')
			.then(c =>{
				c.send({ content: welcomemessage.replace("[memberid]", members.id)})
			})
		}
	},
};//OwO ?

const welcomemessage = 
"☆ Bienvenue <@[memberid]> ☆\n"+
"\n"+
"Je t'invite à aller lire le <#766336361984294913> ainsi que de prendre tes rôles dans <#947860675017973841>\n"+
"Nous espérons que tu passera un bon moment sur Art' Portal ! ^^"