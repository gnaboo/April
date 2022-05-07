const Discord = require('discord.js')

module.exports = {
	name: 'ready',
	once: true,
	execute(client) {

        //console.log(client.guilds.cache.map(m => `${m.name} | ${m.id}`).join("\n"))
        
		const colors = {
			red: '\x1b[31m',
			green: '\x1b[32m',
			yellow: '\x1b[33m',
			blue: '\x1b[34m',
			magenta: '\x1b[35m',
			cyan: '\x1b[36m',
			white: '\x1b[37m',
			reset: '\x1b[0m'
		}
		console.log(`${colors.blue}➔ Lancement de l'intégralité des modules pour ${colors.red}${client.user.tag} ${colors.blue}!`);
		console.log(`\n\n`)
                        console.log(`${colors.blue}╔══════════════════════════════════════════════════════════╗`)
                        console.log(`${colors.blue}║ ${colors.red}${client.user.username} ${colors.white}- ${colors.red}Connecté - v1.0.0                    - [] X ${colors.blue}║`)
                        console.log(`${colors.blue}║══════════════════════════════════════════════════════════║`)
						console.log(`${colors.blue}║                                                          ║`)
                        console.log(`${colors.blue}║                     ${colors.red}- DÉVELOPPEURS -                     ${colors.blue}║`)
                        console.log(`${colors.blue}║                  ${colors.red}BakaTaida  & CoolMan                     ${colors.blue}║`)
						console.log(`${colors.blue}║                                                          ║`)
                        console.log(`${colors.blue}║                                                          ║`)
                        console.log(`${colors.blue}║               ${colors.green}https://discord.gg/UrUtNAx                 ${colors.blue}║`)
                        console.log(`${colors.blue}╚══════════════════════════════════════════════════════════╝\x1b[37m`)
                        console.log(`\n`)
        client.user.setStatus('online')
        let status_list = [
            "Rolereact - Salon rôles",
            "Art Portal | https://discord.gg/graphisme",
            "Portal'Bot v3 - Art'Portal v3 *un jour*"
            ];
            setInterval(() => {
                let nombreutilisateurs = client.users.cache.size
                let Random = Math.floor(Math.random() * (status_list.length));
                client.user.setActivity(status_list[Random], { type: "PLAYING" });
            }, 10000);
	},
};