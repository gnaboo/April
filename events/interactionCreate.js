const { Discord, MessageEmbed, MessageActionRow, MessageSelectMenu, MessageButton, isContextMenu, Permissions } = require('discord.js');
const { Modal, TextInputComponent, showModal } = require('discord-modals');
var fs = require("fs");

module.exports = {
    name: 'interactionCreate',
    async execute(interaction, client) {
        if (interaction.guild.id != "766324873546563615") return interaction.reply({ content: "Bonjour,\nLe support multi-serveur de portal'bot a été désactivé.\nCela signifie qu'il n'est plus disponible autre part que sur les serveurs Portal.\nBot actuellement diponible sur:\n-Art'Portal - http://discord.gg/graphisme\n\nSi vous recherchez un bot multifonctionnel, le développeur du bot vous conseille Tokinotsuki - https://discord.com/oauth2/authorize?client_id=791437575642152982&permissions=8&scope=bot%20applications.commands" });
        //if (interaction.customID) console.log(interaction.customID);
        if (interaction.isCommand()/* || interaction.isContextMenu()*/) {
            const command = client.commands.get(interaction.commandName);

            if (!command) return;

            try {
                await command.execute(interaction, client);
            } catch (error) {
                console.error(error);
                try {
                    await interaction.reply({ contnent: 'There was an error while executing this command!', ephemeral: true });
                } catch {
                    try {
                        await interaction.editReply({ contnent: 'There was an error while executing this command!', ephemeral: true });
                    } catch { }
                }
            }
        }

        else if (interaction.isSelectMenu()) {
            if (interaction.values[0].startsWith("role_hobbies_")){
                await interaction.reply({ content: "Ajout/Suppression des rôles de hobbies:", ephemeral: true });
                hobbiesmessage="Ajout/Suppression des rôles de hobbies:";
            } else if (interaction.values[0].startsWith("role_ping_")){
                await interaction.reply({ content: "Ajout/Suppression des rôles de notifications:", ephemeral: true });
                pingmessage="Ajout/Suppression des rôles de notifications:";
            }
            interaction.values.forEach(async (value, index) => {
                switch (interaction.values[index]) {
                    //help menu
                    case 'help_first_option':
                        await interaction.update({ embeds: [help_page_1], components: [helprow] });
                        break;
                    case 'help_second_option':
                        await interaction.update({ embeds: [help_page_2], components: [helprow] });
                        break;
                    case 'help_third_option':
                        await interaction.update({ embeds: [help_page_3], components: [helprow] });
                        break;
                    case 'help_fourth_option':
                        await interaction.update({ embeds: [help_page_4], components: [helprow] });
                        break;
                    case 'help_fifth_option':
                        await interaction.update({ embeds: [help_page_5], components: [helprow] });
                        break;

                    //rolereact

                    case 'role_genre_woman':
                        await interaction.guild.roles.fetch();
                        const womanmember = interaction.member;
                        let womanrole = interaction.guild.roles.cache.find(role => role.id == '769918743626252318');
                        if (womanmember.roles.cache.some(role => role.id == '769918743626252318')) {
                            womanmember.roles.remove(womanrole);
                            await interaction.update({ content: "Vous avez bien été retiré.e du rôle Femme/Woman", embeds: [], components: [rolegenrerow] });
                        } else {
                            if (womanmember.roles.cache.some(role => role.id == '768393897134784532')) {
                                womanmember.roles.remove(interaction.guild.roles.cache.find(role => role.id == '768393897134784532'));
                            }
                            if (womanmember.roles.cache.some(role => role.id == '772041733278007307')) {
                                womanmember.roles.remove(interaction.guild.roles.cache.find(role => role.id == '772041733278007307'));
                            }
                            womanmember.roles.add(womanrole);
                            await interaction.update({ content: "Vous avez bien reçu le rôle Femme/Woman", embeds: [], components: [rolegenrerow], ephemeral: true });
                        }
                        break;

                    case 'role_genre_man':
                        await interaction.guild.roles.fetch();
                        const manmember = interaction.member;
                        let manrole = interaction.guild.roles.cache.find(role => role.id == '768393897134784532');
                        if (manmember.roles.cache.some(role => role.id == '768393897134784532')) {
                            manmember.roles.remove(manrole);
                            await interaction.update({ content: "Vous avez bien été retiré.e du rôle Homme/Man", embeds: [], components: [rolegenrerow] });
                        } else {
                            if (manmember.roles.cache.some(role => role.id == '769918743626252318')) {
                                manmember.roles.remove(interaction.guild.roles.cache.find(role => role.id == '769918743626252318'));
                            }
                            if (manmember.roles.cache.some(role => role.id == '772041733278007307')) {
                                manmember.roles.remove(interaction.guild.roles.cache.find(role => role.id == '772041733278007307'));
                            }
                            manmember.roles.add(manrole);
                            await interaction.update({ content: "Vous avez bien reçu le rôle Homme/Man", embeds: [], components: [rolegenrerow], ephemeral: true });
                        }
                        break;

                    case 'role_genre_other':
                        await interaction.guild.roles.fetch();
                        const otmember = interaction.member;
                        let otrole = interaction.guild.roles.cache.find(role => role.id == '772041733278007307');
                        if (otmember.roles.cache.some(role => role.id == '772041733278007307')) {
                            otmember.roles.remove(otrole);
                            await interaction.update({ content: "Vous avez bien été retiré.e du rôle Autre/Other", embeds: [], components: [rolegenrerow] });
                        } else {
                            if (otmember.roles.cache.some(role => role.id == '769918743626252318')) {
                                otmember.roles.remove(interaction.guild.roles.cache.find(role => role.id == '769918743626252318'));
                            }
                            if (otmember.roles.cache.some(role => role.id == '768393897134784532')) {
                                otmember.roles.remove(interaction.guild.roles.cache.find(role => role.id == '768393897134784532'));
                            }
                            otmember.roles.add(otrole);
                            await interaction.update({ content: "Vous avez bien reçu le rôle Autre/Other", embeds: [], components: [rolegenrerow], ephemeral: true });
                        }
                        break;


                    case 'role_color_blue':
                        await interaction.guild.roles.fetch();
                        const bluemember = interaction.member;
                        let bluerole = interaction.guild.roles.cache.find(role => role.id == '947485362610139196');
                        if (bluemember.roles.cache.some(role => role.id == '947485362610139196')) {
                            bluemember.roles.remove(bluerole);
                            await interaction.update({ content: "Vous avez bien été retiré.e du rôle <@&947485362610139196>", embeds: [], components: [rolecolorrow] });
                        } else {
                            bluemember.roles.add(bluerole);
                            await interaction.update({ content: "Vous avez bien reçu le rôle <@&947485362610139196>", embeds: [], components: [rolecolorrow], ephemeral: true });
                        }
                        break;

                    case 'role_color_green':
                        await interaction.guild.roles.fetch();
                        const greenmember = interaction.member;
                        let greenrole = interaction.guild.roles.cache.find(role => role.id == '947489800330559510');
                        if (greenmember.roles.cache.some(role => role.id == '947489800330559510')) {
                            greenmember.roles.remove(greenrole);
                            await interaction.update({ content: "Vous avez bien été retiré.e du rôle <@&947489800330559510>", embeds: [], components: [rolecolorrow] });
                        } else {
                            greenmember.roles.add(greenrole);
                            await interaction.update({ content: "Vous avez bien reçu le rôle <@&947489800330559510>", embeds: [], components: [rolecolorrow], ephemeral: true });
                        }
                        break;

                    case 'role_color_orange':
                        await interaction.guild.roles.fetch();
                        const orangemember = interaction.member;
                        let orangerole = interaction.guild.roles.cache.find(role => role.id == '947490189096415273');
                        if (orangemember.roles.cache.some(role => role.id == '947490189096415273')) {
                            orangemember.roles.remove(orangerole);
                            await interaction.update({ content: "Vous avez bien été retiré.e du rôle <@&947490189096415273>", embeds: [], components: [rolecolorrow] });
                        } else {
                            orangemember.roles.add(orangerole);
                            await interaction.update({ content: "Vous avez bien reçu le rôle <@&947490189096415273>", embeds: [], components: [rolecolorrow], ephemeral: true });
                        }
                        break;

                    case 'role_color_red':
                        await interaction.guild.roles.fetch();
                        const redmember = interaction.member;
                        let redrole = interaction.guild.roles.cache.find(role => role.id == '947490255311872000');
                        if (redmember.roles.cache.some(role => role.id == '947490255311872000')) {
                            redmember.roles.remove(redrole);
                            await interaction.update({ content: "Vous avez bien été retiré.e du rôle <@&947490255311872000>", embeds: [], components: [rolecolorrow] });
                        } else {
                            redmember.roles.add(redrole);
                            await interaction.update({ content: "Vous avez bien reçu le rôle <@&947490255311872000>", embeds: [], components: [rolecolorrow], ephemeral: true });
                        }
                        break;

                    case 'role_color_white':
                        await interaction.guild.roles.fetch();
                        const whitemember = interaction.member;
                        let whiterole = interaction.guild.roles.cache.find(role => role.id == '947490339848060968');
                        if (whitemember.roles.cache.some(role => role.id == '947490339848060968')) {
                            whitemember.roles.remove(whiterole);
                            await interaction.update({ content: "Vous avez bien été retiré.e du rôle <@&947490339848060968>", embeds: [], components: [rolecolorrow] });
                        } else {
                            whitemember.roles.add(whiterole);
                            await interaction.update({ content: "Vous avez bien reçu le rôle <@&947490339848060968>", embeds: [], components: [rolecolorrow], ephemeral: true });
                        }
                        break;

                    case 'role_color_yellow':
                        await interaction.guild.roles.fetch();
                        const yellowmember = interaction.member;
                        let yellowrole = interaction.guild.roles.cache.find(role => role.id == '947490417245556796');
                        if (yellowmember.roles.cache.some(role => role.id == '947490417245556796')) {
                            yellowmember.roles.remove(yellowrole);
                            await interaction.update({ content: "Vous avez bien été retiré.e du rôle <@&947490417245556796>", embeds: [], components: [rolecolorrow] });
                        } else {
                            yellowmember.roles.add(yellowrole);
                            await interaction.update({ content: "Vous avez bien reçu le rôle <@&947490417245556796>", embeds: [], components: [rolecolorrow], ephemeral: true });
                        }
                        break;

                    case 'role_color_pink':
                        await interaction.guild.roles.fetch();
                        const pinkmember = interaction.member;
                        let pinkrole = interaction.guild.roles.cache.find(role => role.id == '947496679580500008');
                        if (pinkmember.roles.cache.some(role => role.id == '947496679580500008')) {
                            pinkmember.roles.remove(pinkrole);
                            await interaction.update({ content: "Vous avez bien été retiré.e du rôle <@&947496679580500008>", embeds: [], components: [rolecolorrow] });
                        } else {
                            pinkmember.roles.add(pinkrole);
                            await interaction.update({ content: "Vous avez bien reçu le rôle <@&947496679580500008>", embeds: [], components: [rolecolorrow], ephemeral: true });
                        }
                        break;


                    case 'role_hobbies_graphism':
                        await interaction.guild.roles.fetch();
                        const graphismmember = interaction.member;
                        let graphismrole = interaction.guild.roles.cache.find(role => role.id == '949745563824431124');
                        if (graphismmember.roles.cache.some(role => role.id == '949745563824431124')) {
                            graphismmember.roles.remove(graphismrole);
                            hobbiesmessage=hobbiesmessage+"\nVous avez bien été retiré.e du rôle <@&949745563824431124>";
                            await interaction.editReply({ content: hobbiesmessage , embeds: [], components: [], ephemeral: true });
                        } else {
                            graphismmember.roles.add(graphismrole);
                            hobbiesmessage= hobbiesmessage+"\nVous avez bien reçu le rôle <@&949745563824431124>";
                            await interaction.editReply({ content: hobbiesmessage, embeds: [], components: [], ephemeral: true });
                        }
                        break;

                    case 'role_hobbies_music':
                        await interaction.guild.roles.fetch();
                        const musicmember = interaction.member;
                        let musicrole = interaction.guild.roles.cache.find(role => role.id == '949746089987289128');
                        if (musicmember.roles.cache.some(role => role.id == '949746089987289128')) {
                            musicmember.roles.remove(musicrole);
                            hobbiesmessage=hobbiesmessage+"\nVous avez bien été retiré.e du rôle <@&949746089987289128>";
                            await interaction.editReply({ content: hobbiesmessage , embeds: [], components: [], ephemeral: true });
                        } else {
                            musicmember.roles.add(musicrole);
                            hobbiesmessage=hobbiesmessage+"\nVous avez bien reçu le rôle <@&949746089987289128>";
                            await interaction.editReply({ content: hobbiesmessage, embeds: [], components: [], ephemeral: true });
                        }
                        break;

                    case 'role_hobbies_videogames':
                        await interaction.guild.roles.fetch();
                        const videogamemember = interaction.member;
                        let videogamerole = interaction.guild.roles.cache.find(role => role.id == '949746175920181278');
                        if (videogamemember.roles.cache.some(role => role.id == '949746175920181278')) {
                            videogamemember.roles.remove(videogamerole);
                            hobbiesmessage=hobbiesmessage+"\nVous avez bien été retiré.e du rôle <@&949746175920181278>";
                            await interaction.editReply({ content: hobbiesmessage , embeds: [], components: [], ephemeral: true });
                        } else {
                            videogamemember.roles.add(videogamerole);
                            hobbiesmessage=hobbiesmessage+"\nVous avez bien reçu le rôle <@&949746175920181278>";
                            await interaction.editReply({ content: hobbiesmessage, embeds: [], components: [], ephemeral: true });
                        }
                        break;

                    case 'role_hobbies_mangascomics':
                        await interaction.guild.roles.fetch();
                        const mangamember = interaction.member;
                        let mangarole = interaction.guild.roles.cache.find(role => role.id == '949746259898544229');
                        if (mangamember.roles.cache.some(role => role.id == '949746259898544229')) {
                            mangamember.roles.remove(mangarole);
                            hobbiesmessage=hobbiesmessage+"\nVous avez bien été retiré.e du rôle <@&949746259898544229>";
                            await interaction.editReply({ content: hobbiesmessage , embeds: [], components: [], ephemeral: true });
                        } else {
                            mangamember.roles.add(mangarole)
                            hobbiesmessage=hobbiesmessage+"\nVous avez bien reçu le rôle <@&949746259898544229>"
                            await interaction.editReply({ content: hobbiesmessage, embeds: [], components: [], ephemeral: true })
                        }
                        break;

                    case 'role_hobbies_novels':
                        await interaction.guild.roles.fetch();
                        const novelmember = interaction.member;
                        let novelrole = interaction.guild.roles.cache.find(role => role.id == '949746341754601502');
                        if (novelmember.roles.cache.some(role => role.id == '949746341754601502')) {
                            novelmember.roles.remove(novelrole);
                            hobbiesmessage=hobbiesmessage+"\nVous avez bien été retiré.e du rôle <@&949746341754601502>";
                            await interaction.editReply({ content: hobbiesmessage, embeds: [], components: [] });
                        } else {
                            novelmember.roles.add(novelrole);
                            hobbiesmessage=hobbiesmessage+"\nVous avez bien reçu le rôle <@&949746341754601502>";
                            await interaction.editReply({ content: hobbiesmessage , embeds: [], components: [], ephemeral: true });
                        }
                        break;

                    case 'role_hobbies_programming':
                        await interaction.guild.roles.fetch();
                        const programingmember = interaction.member;
                        let programingrole = interaction.guild.roles.cache.find(role => role.id == '949746559019540511');
                        if (programingmember.roles.cache.some(role => role.id == '949746559019540511')) {
                            programingmember.roles.remove(programingrole);
                            hobbiesmessage=hobbiesmessage+"\nVous avez bien été retiré.e du rôle <@&949746559019540511>";
                            await interaction.editReply({ content: hobbiesmessage, embeds: [], components: [] });
                        } else {
                            programingmember.roles.add(programingrole)
                            hobbiesmessage=hobbiesmessage+"\nVous avez bien reçu le rôle <@&949746559019540511>";
                            await interaction.editReply({ content: hobbiesmessage , embeds: [], components: [], ephemeral: true });
                        }
                        break;

                    case 'role_hobbies_boardgame':
                        await interaction.guild.roles.fetch();
                        const boardgamemember = interaction.member;
                        let boardgamerole = interaction.guild.roles.cache.find(role => role.id == '949746641764749324');
                        if (boardgamemember.roles.cache.some(role => role.id == '949746641764749324')) {
                            boardgamemember.roles.remove(boardgamerole);
                            hobbiesmessage=hobbiesmessage+"\nVous avez bien été retiré.e du rôle <@&949746641764749324>";
                            await interaction.editReply({ content: hobbiesmessage, embeds: [], components: [] });
                        } else {
                            boardgamemember.roles.add(boardgamerole);
                            hobbiesmessage=hobbiesmessage+"\nVous avez bien reçu le rôle <@&949746641764749324>";
                            await interaction.editReply({ content: hobbiesmessage, embeds: [], components: [], ephemeral: true });
                        }
                        break;

                    case 'role_hobbies_cooking':
                        await interaction.guild.roles.fetch();
                        const cookingmember = interaction.member;
                        let cookingrole = interaction.guild.roles.cache.find(role => role.id == '949746678519439370');
                        if (cookingmember.roles.cache.some(role => role.id == '949746678519439370')) {
                            cookingmember.roles.remove(cookingrole);
                            hobbiesmessage=hobbiesmessage+"\nVous avez bien été retiré.e du rôle <@&949746678519439370>";
                            await interaction.editReply({ content: hobbiesmessage, embeds: [], components: [] });
                        } else {
                            cookingmember.roles.add(cookingrole);
                            hobbiesmessage=hobbiesmessage+"\nVous avez bien reçu le rôle <@&949746678519439370>";
                            await interaction.editReply({ content: hobbiesmessage, embeds: [], components: [], ephemeral: true });
                        }
                        break;


                    case 'role_ping_announcements':
                        await interaction.guild.roles.fetch();
                        const announcementsmember = interaction.member;
                        let announcementsrole = interaction.guild.roles.cache.find(role => role.id == '768396461763067914');
                        if (announcementsmember.roles.cache.some(role => role.id == '768396461763067914')) {
                            announcementsmember.roles.remove(announcementsrole);
                            pingmessage=pingmessage+"\nVous avez bien été retiré.e du rôle <@&768396461763067914>";
                            await interaction.editReply({ content: pingmessage, embeds: [], components: [] });
                        } else {
                            announcementsmember.roles.add(announcementsrole);
                            pingmessage=pingmessage+"\nVous avez bien reçu le rôle <@&768396461763067914>";
                            await interaction.editReply({ content: pingmessage, embeds: [], components: [], ephemeral: true });
                        }
                        break;

                    case 'role_ping_polls':
                        await interaction.guild.roles.fetch();
                        const pollsmember = interaction.member;
                        let pollssrole = interaction.guild.roles.cache.find(role => role.id == '784646468958945280');
                        if (pollsmember.roles.cache.some(role => role.id == '784646468958945280')) {
                            pollsmember.roles.remove(pollssrole);
                            pingmessage=pingmessage+"\nVous avez bien été retiré.e du rôle <@&784646468958945280>";
                            await interaction.editReply({ content: pingmessage, embeds: [], components: [] });
                        } else {
                            pollsmember.roles.add(pollssrole);
                            pingmessage=pingmessage+"\nVous avez bien reçu le rôle <@&784646468958945280>";
                            await interaction.editReply({ content: pingmessage, embeds: [], components: [], ephemeral: true });
                        }
                        break;

                    case 'role_ping_youtube':
                        await interaction.guild.roles.fetch();
                        const ytbmember = interaction.member;
                        let ytbsrole = interaction.guild.roles.cache.find(role => role.id == '774693756901392404');
                        if (ytbmember.roles.cache.some(role => role.id == '774693756901392404')) {
                            ytbmember.roles.remove(ytbsrole);
                            pingmessage=pingmessage+"\nVous avez bien été retiré.e du rôle <@&774693756901392404>";
                            await interaction.editReply({ content: pingmessage, embeds: [], components: [] });
                        } else {
                            ytbmember.roles.add(ytbsrole);
                            pingmessage=pingmessage+"\nVous avez bien reçu le rôle <@&774693756901392404>";
                            await interaction.editReply({ content: pingmessage, embeds: [], components: [], ephemeral: true });
                        }
                        break;

                    case 'role_ping_events':
                        await interaction.guild.roles.fetch();
                        const eventmember = interaction.member;
                        let eventrole = interaction.guild.roles.cache.find(role => role.id == '770568527156346880');
                        if (eventmember.roles.cache.some(role => role.id == '770568527156346880')) {
                            eventmember.roles.remove(eventrole);
                            pingmessage=pingmessage+"\nVous avez bien été retiré.e du rôle <@&770568527156346880>";
                            await interaction.editReply({ content: pingmessage, embeds: [], components: [] });
                        } else {
                            eventmember.roles.add(eventrole);
                            pingmessage=pingmessage+"\nVous avez bien reçu le rôle <@&770568527156346880>";
                            await interaction.editReply({ content: pingmessage, embeds: [], components: [], ephemeral: true });
                        }
                        break;

                    case 'role_ping_partnerships':
                        await interaction.guild.roles.fetch();
                        const partnermember = interaction.member;
                        let partnerrole = interaction.guild.roles.cache.find(role => role.id == '770723703948181525');
                        if (partnermember.roles.cache.some(role => role.id == '770723703948181525')) {
                            partnermember.roles.remove(partnerrole);
                            pingmessage=pingmessage+"\nVous avez bien été retiré.e du rôle <@&770723703948181525>";
                            await interaction.editReply({ content: pingmessage, embeds: [], components: [] });
                        } else {
                            partnermember.roles.add(partnerrole);
                            pingmessage=pingmessage+"\nVous avez bien reçu le rôle <@&770723703948181525>";
                            await interaction.editReply({ content: pingmessage, embeds: [], components: [], ephemeral: true });
                        }
                        break;

                    case 'role_ping_animations':
                        await interaction.guild.roles.fetch();
                        const animationmember = interaction.member;
                        let animationrole = interaction.guild.roles.cache.find(role => role.id == '799249307362131978');
                        if (animationmember.roles.cache.some(role => role.id == '799249307362131978')) {
                            animationmember.roles.remove(animationrole);
                            pingmessage=pingmessage+"\nVous avez bien été retiré.e du rôle <@&799249307362131978>";
                            await interaction.editReply({ content: pingmessage, embeds: [], components: [] });
                        } else {
                            animationmember.roles.add(animationrole);
                            pingmessage=pingmessage+"\nVous avez bien reçu le rôle <@&799249307362131978>";
                            await interaction.editReply({ content: pingmessage, embeds: [], components: [], ephemeral: true })
                        }
                        break;

                    case 'role_ping_ecology':
                        await interaction.guild.roles.fetch();
                        const ecomember = interaction.member;
                        let ecorole = interaction.guild.roles.cache.find(role => role.id == '847207140098572318');
                        if (ecomember.roles.cache.some(role => role.id == '847207140098572318')) {
                            ecomember.roles.remove(ecorole);
                            pingmessage=pingmessage+"\nVous avez bien été retiré.e du rôle <@&847207140098572318>";
                            await interaction.editReply({ content: pingmessage, embeds: [], components: [] });
                        } else {
                            ecomember.roles.add(ecorole);
                            pingmessage=pingmessage+"\nVous avez bien reçu le rôle <@&847207140098572318>";
                            await interaction.editReply({ content: pingmessage, embeds: [], components: [], ephemeral: true });
                        }
                        break;

                    case 'role_ping_insta':
                        await interaction.guild.roles.fetch();
                        const instamember = interaction.member;
                        let instasrole = interaction.guild.roles.cache.find(role => role.id == '955143137226010704');
                        if (instamember.roles.cache.some(role => role.id == '955143137226010704')) {
                            instamember.roles.remove(instasrole);
                            pingmessage=pingmessage+"\nVous avez bien été retiré.e du rôle <@&955143137226010704>";
                            await interaction.editReply({ content: pingmessage, embeds: [], components: [] });
                        } else {
                            instamember.roles.add(instasrole);
                            pingmessage=pingmessage+"\nVous avez bien reçu le rôle <@&955143137226010704>";
                            await interaction.editReply({ content: pingmessage, embeds: [], components: [], ephemeral: true });
                        }
                        break;


                    //ticket
                    case 'command_option':
                        await interaction.reply({ content: "Choisissez le type de commande voulu!", components: [ticketgraphismtyperow], ephemeral: true })
                        break;
                    case 'partnership_option':
                        interaction.message.edit({ embeds: interaction.message.embeds, components: interaction.message.components})
                        showModal(partnershipmodal, {
                            client: client, // This method needs the Client to show the Modal through the Discord API.
                            interaction: interaction // This method needs the Interaction to show the Modal with the Interaction ID & Token.
                        })
                        break;
                    case 'contact_option':
                        await interaction.guild.channels.create("ticket-" + interaction.user.username, {
                            type: 'GUILD_TEXT',
                        	permissionOverwrites: [
                        		{
                        			id: interaction.user.id,
                        			allow: [Permissions.FLAGS.VIEW_CHANNEL],
                        		},
                        	],
                        }).then(async channel => {
                            let category = interaction.guild.channels.cache.find(cat => cat.id === "916721453121040424")

                            await channel.setParent(category.id);
			                await channel.permissionOverwrites.create(interaction.user.id, { VIEW_CHANNEL: true });

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

                            await channel.send({ content: "Bienvenue <@" + interaction.user.id + ">\n@ Portal' Staff un ticket a été ouvert!", embeds: [commandEmbed], components: [btnrowTicket] }).then(msg => msg.pin())
                            await interaction.reply({ content: "Ton ticket a bien été créé ! (<#" + channel.id + ">)", ephemeral: true })
                        }).catch(console.error);
                        break;
                }
                //await new Promise(r => setTimeout(r, 2500));
            })

            if (interaction.values[0].startsWith("ticket_")) {
                var commandType = "";
                if (interaction.values[0] === "ticket_logo") {
                    var commandType = "Logo";
                } else if (interaction.values[0] === "ticket_discordbanner") {
                    var commandType = "Bannière Discord";
                } else if (interaction.values[0] === "ticket_ytbbanner") {
                    var commandType = "Bannière Youtube/...";
                } else if (interaction.values[0] === "ticket_drawing") {
                    var commandType = "Dessin";
                } else if (interaction.values[0] === "ticket_profilpicture") {
                    var commandType = "Photo de profil";
                } else if (interaction.values[0] === "ticket_video") {
                    var commandType = "Vidéo/Montage";
                } else if (interaction.values[0] === "ticket_overlay") {
                    var commandType = "Overlay de stream";
                } else if (interaction.values[0] === "ticket_emojis") {
                    var commandType = "Émojis/Emote";
                } else if (interaction.values[0] === "ticket_other") {
                    var commandType = "Autre";
                } else {//En cas d'oubli/bug, pour éviter de planter :3
                    var commandType = "Non spécifié"
                }

                const commandmodal2 = new Modal() // We create a Modal
                .setCustomId('commandmodal_'+interaction.values[0])
                .setTitle('Art\'Portal - Commande - '+commandType)
                .addComponents(
                    new TextInputComponent()
                    .setCustomId('command_theme')
                    .setLabel('Thème')
                    .setStyle('LONG')
                    .setMinLength(10)
                    .setMaxLength(1000)
                    .setPlaceholder('(Exemple: Futuriste, Fantaisie, Naturel, Etc...)')
                    .setRequired(true),
                    new TextInputComponent()
                    .setCustomId('command_description')
                    .setLabel('Description')
                    .setStyle('LONG')
                    .setMinLength(150)
                    .setMaxLength(1000)
                    .setPlaceholder('(Décrivez votre demande afin de faciliter le travail du graphiste. Soyez le plus précis possible!)')
                    .setRequired(true),
                    new TextInputComponent()
                    .setCustomId('command_toppings')
                    .setLabel('Effets/Détails/Texte à ajouter')
                    .setStyle('LONG')
                    .setMaxLength(1000)
                    .setPlaceholder('(Écrivez votre texte sans oublier les majuscules, minuscules, accent, etc...)')
                    .setRequired(false),
                    new TextInputComponent()
                    .setCustomId('command_baseimage')
                    .setLabel('Image(s) de Base')
                    .setStyle('LONG')
                    .setMaxLength(1000)
                    .setPlaceholder('(Liens des images dont il faut se servir)')
                    .setRequired(false),
                );
                showModal(commandmodal2, {
                    client: client, // This method needs the Client to show the Modal through the Discord API.
                    interaction: interaction // This method needs the Interaction to show the Modal with the Interaction ID & Token.
                });

                /*await interaction.guild.channels.create("ticket-" + interaction.user.username, {
                    type: 'GUILD_TEXT'
                }).then(async channel => {
                    let category = interaction.guild.channels.cache.find(cat => cat.id === "780559502105378836")

                    await channel.setParent(category.id);

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
                        .setDescription("> Copie le modèle de commande présent dans <#766375009651785768>, remplie et envoie le, un artiste te prendra en charge le plus vite que possible ^^")

                    await channel.send({ content: "Bienvenue <@" + interaction.user.id + ">\n@ Portal' Artiste un ticket a été ouvert!", embeds: [commandEmbed], components: [btnrowTicket] }).then(msg => msg.pin())
                    await interaction.reply({ content: "Ton ticket a bien été créé ! (<#" + channel.id + ">)", ephemeral: true })
                }).catch(console.error);*/
            }
        }

        else if (interaction.isButton()) {
            switch (interaction.customId) {
                case 'suggestion':
                    //interaction.message.edit({ embeds: interaction.message.embeds, components: interaction.message.components})
                    showModal(suggestionmodal, {
                        client: client, // This method needs the Client to show the Modal through the Discord API.
                        interaction: interaction // This method needs the Interaction to show the Modal with the Interaction ID & Token.
                    })
                    break;
                case 'question':
                    //interaction.message.edit({ embeds: interaction.message.embeds, components: interaction.message.components})
                    showModal(questionmodal, {
                        client: client, // This method needs the Client to show the Modal through the Discord API.
                        interaction: interaction // This method needs the Interaction to show the Modal with the Interaction ID & Token.
                    })
                    break;
                case 'ping_refresh_btn':
                    try {
                        const sent = await interaction.channel.send({ content: 'Pinging...' });
                        const latency = new MessageEmbed()
                            .setColor(`#7961fd`)
                            .setDescription(
                                `🏓 Portal' BOT v2.0\n`
                                + "\n"
                                + `Latence: ${sent.createdTimestamp - interaction.createdTimestamp}ms\n`
                                + `API: ${Math.round(client.ws.ping)}ms`
                            )
                        await interaction.update({ content: " ", embeds: [latency] })
                        sent.delete()
                    } catch { }
                    break;

                case 'apply':
                    showModal(applicationmodal, {
                        client: client, // This method needs the Client to show the Modal through the Discord API.
                        interaction: interaction // This method needs the Interaction to show the Modal with the Interaction ID & Token.
                    })
                    break;
                case 'applyartist':
                    showModal(applicationmodalartist, {
                        client: client, // This method needs the Client to show the Modal through the Discord API.
                        interaction: interaction // This method needs the Interaction to show the Modal with the Interaction ID & Token.
                    })
                    break;

                case 'modpanel_mute':
                    if(!interaction.member.permissions.has("MODERATE_MEMBERS")) return interaction.reply({content: `Vous n'avez pas la permisssion \`MODERATE_MEMBERS\` pour effectuer cette commande.`, ephemeral: true});
                    showModal(modpanel_mutemodal, {
                        client: client, // This method needs the Client to show the Modal through the Discord API.
                        interaction: interaction // This method needs the Interaction to show the Modal with the Interaction ID & Token.
                    })
                    break;

                case 'modpanel_ban':
                    if(!interaction.member.permissions.has("BAN_MEMBERS")) return interaction.reply({content: `Vous n'avez pas la permisssion \`BAN_MEMBERS\` pour effectuer cette commande.`, ephemeral: true});
                    showModal(modpanel_banmodal, {
                        client: client,
                        interaction: interaction
                    })
                    break;

                //rolereact
                case 'getrole_genre':
                    await interaction.reply({ content: " ", embeds: [], components: [rolegenrerow], ephemeral: true })
                    break;
                case 'getrole_hobbies':
                    await interaction.reply({ content: " ", embeds: [], components: [rolehobbiesrow], ephemeral: true })
                    break;
                case 'getrole_color':
                    await interaction.reply({ content: " ", embeds: [], components: [rolecolorrow], ephemeral: true })
                    break;
                case 'getrole_pings':
                    await interaction.reply({ content: " ", embeds: [], components: [rolepingsrow], ephemeral: true })
                    break;
                case 'getrole_list':
                    await interaction.deferReply({ ephemeral: true })
                    rolecache=interaction.member.roles.cache
                    
                    var rolelistmessage = "Rôle de couleur (affiché):"
                    if (rolecache.some(role => role.id == '947490339848060968')) {
                        var rolelistmessage = rolelistmessage+"\n<@&947490339848060968>"
                    } else if (rolecache.some(role => role.id == '947490417245556796')) {
                        var rolelistmessage = rolelistmessage+"\n<@&947490417245556796>"
                    } else if (rolecache.some(role => role.id == '947490189096415273')) {
                        var rolelistmessage = rolelistmessage+"\n<@&947490189096415273>"
                    } else if (rolecache.some(role => role.id == '947490255311872000')) {
                        var rolelistmessage = rolelistmessage+"\n<@&947490255311872000>"
                    } else if (rolecache.some(role => role.id == '947496679580500008')) {
                        var rolelistmessage = rolelistmessage+"\n<@&947496679580500008>"
                    } else if (rolecache.some(role => role.id == '947485362610139196')) {
                        var rolelistmessage = rolelistmessage+"\n<@&947485362610139196>"
                    } else if (rolecache.some(role => role.id == '947489800330559510')) {
                        var rolelistmessage = rolelistmessage+"\n<@&947489800330559510>"
                    } else {
                        var rolelistmessage = rolelistmessage + "\nAucun"
                    }

                    var rolelistmessage = rolelistmessage + "\n\nRôles de genre:"
                    if (rolecache.some(role => role.id == '769918743626252318')) {
                        var rolelistmessage = rolelistmessage+"\n<@&769918743626252318>"
                    }
                    if (rolecache.some(role => role.id == '768393897134784532')) {
                        var rolelistmessage = rolelistmessage+"\n<@&768393897134784532>"
                    }
                    if (rolecache.some(role => role.id == '772041733278007307')) {
                        var rolelistmessage = rolelistmessage+"\n<@&772041733278007307>"
                    }
                    if(!rolecache.some(role => role.id == '769918743626252318') && !rolecache.some(role => role.id == '768393897134784532') && !rolecache.some(role => role.id == '772041733278007307')){
                        var rolelistmessage = rolelistmessage + "\nAucun"
                    }

                    var rolelistmessage = rolelistmessage + "\n\nRôles de hobbies:"
                    var hobbiescount = 0
                    if (rolecache.some(role => role.id == '949745563824431124')) {
                        var rolelistmessage = rolelistmessage+"\n<@&949745563824431124>"
                    } else hobbiescount=hobbiescount+1
                    if (rolecache.some(role => role.id == '949746089987289128')) {
                        var rolelistmessage = rolelistmessage+"\n<@&949746089987289128>"
                    } else hobbiescount=hobbiescount+1
                    if (rolecache.some(role => role.id == '949746175920181278')) {
                        var rolelistmessage = rolelistmessage+"\n<@&949746175920181278>"
                    } else hobbiescount=hobbiescount+1
                    if (rolecache.some(role => role.id == '949746259898544229')) {
                        var rolelistmessage = rolelistmessage+"\n<@&949746259898544229>"
                    } else hobbiescount=hobbiescount+1
                    if (rolecache.some(role => role.id == '949746341754601502')) {
                        var rolelistmessage = rolelistmessage+"\n<@&949746341754601502>"
                    } else hobbiescount=hobbiescount+1
                    if (rolecache.some(role => role.id == '949746559019540511')) {
                        var rolelistmessage = rolelistmessage+"\n<@&949746559019540511>"
                    } else hobbiescount=hobbiescount+1
                    if (rolecache.some(role => role.id == '949746641764749324')) {
                        var rolelistmessage = rolelistmessage+"\n<@&949746641764749324>"
                    } else hobbiescount=hobbiescount+1
                    if (rolecache.some(role => role.id == '949746678519439370')) {
                        var rolelistmessage = rolelistmessage+"\n<@&949746678519439370>"
                    } else hobbiescount=hobbiescount+1
                    if (hobbiescount==8) var rolelistmessage=rolelistmessage+"\nAucun"

                    var rolelistmessage = rolelistmessage + "\n\nRôles de notifications:"
                    var pingcount = 0
                    if (rolecache.some(role => role.id == '768396461763067914')) {
                        var rolelistmessage = rolelistmessage+"\n<@&768396461763067914>"
                    } else pingcount=pingcount+1
                    if (rolecache.some(role => role.id == '784646468958945280')) {
                        var rolelistmessage = rolelistmessage+"\n<@&784646468958945280>"
                    } else pingcount=pingcount+1
                    if (rolecache.some(role => role.id == '774693756901392404')) {
                        var rolelistmessage = rolelistmessage+"\n<@&774693756901392404>"
                    } else pingcount=pingcount+1
                    if (rolecache.some(role => role.id == '770568527156346880')) {
                        var rolelistmessage = rolelistmessage+"\n<@&770568527156346880>"
                    } else pingcount=pingcount+1
                    if (rolecache.some(role => role.id == '770723703948181525')) {
                        var rolelistmessage = rolelistmessage+"\n<@&770723703948181525>"
                    } else pingcount=pingcount+1
                    if (rolecache.some(role => role.id == '799249307362131978')) {
                        var rolelistmessage = rolelistmessage+"\n<@&799249307362131978>"
                    } else pingcount=pingcount+1
                    if (rolecache.some(role => role.id == '847207140098572318')) {
                        var rolelistmessage = rolelistmessage+"\n<@&847207140098572318>"
                    } else pingcount=pingcount+1
                    if (rolecache.some(role => role.id == '955143137226010704')) {
                        var rolelistmessage = rolelistmessage+"\n<@&955143137226010704>"
                    } else pingcount=pingcount+1
                    if (pingcount==8) var rolelistmessage=rolelistmessage+"\nAucun"

                    const roleEMBED = new MessageEmbed()
                        .setAuthor(interaction.user.tag)
                        .setTitle("Vos rôles sur Art'Portal")
                        .setColor("#7961fd")
                        .setDescription(rolelistmessage)

                    await interaction.editReply({ embeds:[roleEMBED], ephemerl: true })
                    break;

                //ticket
                case 'takeCommand':
                    var ticketRowTaken = new MessageActionRow()
                        .addComponents([
                            new MessageButton()
                                .setLabel("Valider la commande")
                                .setStyle("SUCCESS")
                                .setEmoji("✔")
                                .setCustomId("ticketfinished_" + interaction.user.id.toString()),
                            new MessageButton()
                                .setLabel("Annuler la prise en charge")
                                .setStyle("DANGER")
                                .setEmoji("❌")
                                .setCustomId("canceltakenticket_" + interaction.user.id.toString()),
                            new MessageButton()
                                .setLabel("Supprimer le ticket")
                                .setStyle("DANGER")
                                .setEmoji("🗑")
                                .setCustomId("delete"),
                        ]);
                    if (interaction.channel.name.includes("🟢")) return interaction.reply({ content: "La commande est déjà prise en charge!", ephemeral: true })
                    interaction.update({ components: [ticketRowTaken] })

                    interaction.channel.setName(String(interaction.channel.name) + "-🟢")

                    interaction.message.reply({ content: interaction.user.tag + " prend en charge la commande!" })
                    break;
                case 'delete':
                    if (!interaction.member.roles.cache.has('778016554066640896')) return interaction.reply({ content: "Tu n'a pas la permission de faire ça!", ephemeral: true })

                    var ticketRowDelete = new MessageActionRow()
                        .addComponents(
                            new MessageButton()
                                .setLabel("Oui")
                                .setStyle("SUCCESS")
                                .setEmoji("✔")
                                .setCustomId("acceptDelete"),
                            new MessageButton()
                                .setLabel("Non")
                                .setStyle("DANGER")
                                .setEmoji("❌")
                                .setCustomId("denyDelete"),
                        );
                    interaction.reply({ content: "Êtes-vous sûr de vouloir supprimer ce ticket ?", components: [ticketRowDelete] })
                    break;
                case 'acceptDelete':
                    if (!interaction.member.roles.cache.has('780553836581879808')) return interaction.reply({ content: "Tu n'a pas la permission de faire sa!", ephemeral: true })
                    interaction.update({ content: "Le ticket va être supprimé dans 5 secondes!", components: [] })
                    setTimeout(() => {
                        interaction.channel.delete()//client.channels.cache.get(interaction.channel.id)
                    }, 5000)
                    break;
                case 'denyDelete':                                       //rôle Gérant Commande
                    if (!interaction.member.roles.cache.has('780553836581879808')) return interaction.reply({ content: "Tu n'a pas la permission de faire sa!", ephemeral: true })
                    interaction.update({ content: "Action annulée!", components: [] })
                    break;
            }
            if (interaction.customId.startsWith("applicationticket_")) {
                //return interaction.reply({ content: "Désolé, cette fonctionnalité n'a pas encore été implémentée !", ephemeral: true })
                const userid = interaction.customId.split("_")[2]
                const type = interaction.customId.split("_")[1]
                const member = await interaction.guild.members.fetch(userid)
                const user = await client.users.cache.get(userid)
                await interaction.guild.channels.create(type + "-" + user.username, {
                    type: 'GUILD_TEXT',
                	permissionOverwrites: [
                		{
                			id: member.id,
                			allow: [Permissions.FLAGS.VIEW_CHANNEL],
                		},
                	],
                }).then(async channel => {
                    let category = await interaction.guild.channels.cache.find(cat => cat.id === "916721453121040424")
                    await channel.setParent(category.id);
			        await channel.permissionOverwrites.create(member.id, { VIEW_CHANNEL: true });
                    var btnrowTicket = new MessageActionRow()
                        .addComponents([
                            new MessageButton()
                                .setLabel("Supprimer le ticket")
                                .setStyle("DANGER")
                                .setEmoji("🗑")
                                .setCustomId("delete"),
                        ]);
                    await channel.send({embeds:[interaction.message.embeds[0]], components:[btnrowTicket]})
                    await channel.send({content: `<@${userid}>`})
                })
                const openapplicationticket = new MessageButton()
				.setCustomId("notuseful")
				.setLabel("Ticket ouvert")
				.setStyle('SECONDARY')
				.setEmoji("🎫")
                .setDisabled(true)
                var btnrowTicket = new MessageActionRow()
                        .addComponents([openapplicationticket]);
                interaction.update({embeds:[interaction.message.embeds[0]],components:[btnrowTicket]})
                
            } else if (interaction.customId.startsWith("canceltakenticket_")) {
                if (interaction.user.id == interaction.customId.replace("canceltakenticket_", "") || interaction.member.permissions.has("ADMINISTRATOR")) {
                    var messageend = ""
                    if (interaction.user.id == interaction.customId.replace("canceltakenticket_", "")) {
                        var messageend = `(Annulation par l'artiste)`
                    } else {
                        var messageend = `(Annulation par un administrateur - ${interaction.user.tag})`
                    }
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
                    interaction.update({ components: [btnrowTicket] })
                    oguser = await client.users.fetch(interaction.customId.replace("canceltakenticket_", ""))
                    interaction.message.reply(oguser.tag + " ne prend plus en charge la commande...\n" + messageend)
                    interaction.channel.setName(String(interaction.channel.name.replace("-🟢", "")))
                } else {
                    return interaction.reply({ content: "Seul un administrateur ou l'artiste ayant prit le ticket en charge peut utiliser ce bouton", ephemeral: true })
                }
            }
        }
    },
}

const help_page_1 = new MessageEmbed()
    .setColor(`#7961fd`)
    .setAuthor(" ")
    .setThumbnail(`https://i.imgur.com/zcZsfNA.png`)
    .setDescription(
        "Liste des commandes disponibles. (Page 1/5)\n"
        + "**Commandes slash** \n"
        + "**Syntaxe d'utilisation:**\n"
        + "\n"
        + "<:syntaxe_2:871429314497896448>・Argument optionnel pour exécuter la commande.\n"
        + "<:syntaxe_1:871429314485301258>・Un argument est requis pour exécuter la commande.\n"
        + "\n"
        + "`Page #1`・Sommaire\n"
        + "`Page #2`・Commandes sociales.\n"
        + "`Page #3`・Commandes de jeux.\n"
        + "`Page #4`・Commandes diverses.\n"
        + "`Page #5`・Commandes d'administration\n"
        + "\n"
        + "**__Information:__**\n"
        + "Les commandes marquées d'un symbole requièrent une permission\n"
        + "Les commandes étant régulièrement mises à jour, le help peut être légèrement en retard.\n"
    );

const help_page_2 = new MessageEmbed()
    .setColor(`#7961fd`)
    .setAuthor(" ")
    .setThumbnail(`https://i.imgur.com/zcZsfNA.png`)
    .setDescription(
        "Liste des commandes disponibles. (Page 2/5)\n"
        + "**Commandes slash** \n"
        + "**Syntaxe d'utilisation:**\n"
        + "\n"
        + "<:syntaxe_2:871429314497896448>・Argument optionnel pour exécuter la commande.\n"
        + "<:syntaxe_1:871429314485301258>・Un argument est requis pour exécuter la commande.\n"
        + "\n"
        + "\`interaction hug <utilisateur>\`・Faire un câlin\n"
        + "`interaction kiss <utilisateur>\`・Embrasser quelqu'un\n"
        + "`interaction kill <utilisateur>\`・Trucider quelqu'un <:portalnew:882588620349906995>\n"
        + "`interaction baka <utilisateur>\`・Traiter quelqu'un de baka <:portalnew:882588620349906995>\n"
        + "`interaction blush\`・Rougir <:portalnew:882588620349906995>\n"
        + "`interaction punch <utilisateur>\`・Frapper quelqu'un <:portalnew:882588620349906995>\n"
        + "\n"
        + "**__Information:__**\n"
        + "Les commandes marquées d'un symbole requièrent une permission\n"
    );

const help_page_3 = new MessageEmbed()
    .setColor(`#7961fd`)
    .setAuthor(" ")
    .setThumbnail(`https://i.imgur.com/zcZsfNA.png`)
    .setDescription(
        "Liste des commandes disponibles. (Page 3/5)\n"
        + "**Commandes slash**\n"
        + "**Syntaxe d'utilisation:**\n"
        + "\n"
        + "<:syntaxe_2:871429314497896448>・Argument optionnel pour exécuter la commande.\n"
        + "<:syntaxe_1:871429314485301258>・Un argument est requis pour exécuter la commande.\n"
        + "\n"
        + "`rps <utilisateur>`・Lancer une partie de pierre feuille ciseaux\n"
        + "`tictactoe <utilisateur>`・Lancer une partie de tictactoe (morpion)\n"
        + "`8ball <question>`・Poser une question de à la boule 8 magique\n"
        + "`together <channel> <activité>`・Lancer une activité dans le salon vocal spécifié: Youtube/Poker/Echecs... <:portalnew:882588620349906995>\n"
        + "`calculator`・Faire apparaître une calculatrice virtuelle <:portalnew:882588620349906995>\n"
        + "\n"
        + "**__Information:__**\n"
        + "Les commandes marquées d'un symbole requièrent une permission\n"
    );

const help_page_4 = new MessageEmbed()
    .setColor(`#7961fd`)
    .setAuthor(" ")
    .setThumbnail(`https://i.imgur.com/zcZsfNA.png`)
    .setDescription(
        "Liste des commandes disponibles. (Page 4/5)\n"
        + "**Commandes slash**\n"
        + "**Syntaxe d'utilisation:**\n"
        + "\n"
        + "<:syntaxe_2:871429314497896448>・Argument optionnel pour exécuter la commande.\n"
        + "<:syntaxe_1:871429314485301258>・Un argument est requis pour exécuter la commande.\n"
        + "\n"
        + "`ping`・Afficher la latence du bot <:portalnew:882588620349906995>\n"
        + "`help`・Affiche l'aide ci-présente <:portalnew:882588620349906995>\n"
        + "`info <type>`・Affiche des informations sur le serveur/bot/utilisateur <:portalnew:882588620349906995>\n"
        + "\n"
        + "**__Information:__**\n"
        + "Les commandes marquées d'un symbole requièrent une permission\n"
    );

const help_page_5 = new MessageEmbed()
    .setColor(`#7961fd`)
    .setAuthor(" ")
    .setThumbnail(`https://i.imgur.com/zcZsfNA.png`)
    .setDescription(
        "Liste des commandes disponibles. (Page 5/5)\n"
        + "**Commandes slash**\n"
        + "**Syntaxe d'utilisation:**\n"
        + "\n"
        + "<:syntaxe_2:871429314497896448>・Argument optionnel pour exécuter la commande.\n"
        + "<:syntaxe_1:871429314485301258>・Un argument est requis pour exécuter la commande.\n"
        + "\n"
        + "`say <message> <channel>\`・Envoyer un message dans le salon spécifié <:portalnew:882588620349906995>\n"
        + "\n"
        + "**__Information:__**\n"
        + "Les commandes marquées d'un symbole requièrent une permission\n"
    );

const helprow = new MessageActionRow()
    .addComponents(
        new MessageSelectMenu()
            .setCustomId('helpselect')
            .setPlaceholder('Navigateur')
            .addOptions([
                {
                    label: 'Page 1',
                    description: 'Sommaire',
                    value: 'help_first_option',
                },
                {
                    label: 'Page 2',
                    description: 'Commandes sociales',
                    value: 'help_second_option',
                },
                {
                    label: 'Page 3',
                    description: 'Commandes de jeu.',
                    value: 'help_third_option',
                },
                {
                    label: 'Page 4',
                    description: 'Commandes diverses',
                    value: 'help_fourth_option',
                },
                {
                    label: 'Page 5',
                    description: 'Commandes d\'administration',
                    value: 'help_fifth_option',
                },
            ]),
    );

const ticketRow = new MessageActionRow()
    .addComponents(
        new MessageSelectMenu()
            .setCustomId('ticket_')
            .setPlaceholder('Choisissez le type de ticket')
            .addOptions([
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




const rolegenrerow = new MessageActionRow()
    .addComponents(
        new MessageSelectMenu()
            .setCustomId('rolegenreselect')
            .setPlaceholder('Choisissez votre genre / Choose your genre')
            .addOptions([
                {
                    label: 'Femme / Woman',
                    value: 'role_genre_woman',
                    emoji: '🚶‍♀️',
                },
                {
                    label: 'Homme / Man',
                    value: 'role_genre_man',
                    emoji: '🚶‍♂️',
                },
                {
                    label: 'Autre / Other',
                    value: 'role_genre_other',
                    emoji: '🚶',
                }
            ]),
    );

const rolecolorrow = new MessageActionRow()
    .addComponents(
        new MessageSelectMenu()
            .setCustomId('rolecolorselect')
            .setPlaceholder('Choisissez une couleur / Choose a color')
            .addOptions([
                {
                    label: 'Bleu/Blue',
                    value: 'role_color_blue',
                    emoji: '🔵'
                },
                {
                    label: 'Vert/Green',
                    value: 'role_color_green',
                    emoji: '🟢'
                },
                {
                    label: 'Orange/Orange',
                    value: 'role_color_orange',
                    emoji: '🟠'
                },
                {
                    label: 'Rouge/Red',
                    value: 'role_color_red',
                    emoji: '🔴'
                },
                {
                    label: 'Blanc/White',
                    value: 'role_color_white',
                    emoji: '⚪'
                },
                {
                    label: 'Jaune/Yellow',
                    value: 'role_color_yellow',
                    emoji: '🟡'
                },
                {
                    label: 'Rose/Pink',
                    value: 'role_color_pink',
                    emoji: '947495875654066207'
                }
            ]),
    );
const rolehobbiesrow = new MessageActionRow()
    .addComponents(
        new MessageSelectMenu()
            .setCustomId('rolehobbiesselect')
            .setPlaceholder('Choisissez vos hobbies / Choose your hobbies')
            .setMaxValues(8)
            .addOptions([
                {
                    label: 'Graphisme/Graphism',
                    value: 'role_hobbies_graphism',
                    emoji: '🖌️'
                },
                {
                    label: 'Musique/Music',
                    value: 'role_hobbies_music',
                    emoji: '🎵'
                },
                {
                    label: 'Jeux vidéos/Videogames',
                    value: 'role_hobbies_videogames',
                    emoji: '🎮'
                },
                {
                    label: 'Mangas-BDs/Mangas-Comics',
                    value: 'role_hobbies_mangascomics',
                    emoji: '📙'
                },
                {
                    label: 'Romans/Novels',
                    value: 'role_hobbies_novels',
                    emoji: '📚'
                },
                {
                    label: 'Programmation/Programming',
                    value: 'role_hobbies_programming',
                    emoji: '💻'
                },
                {
                    label: 'Jeu de société/Board game',
                    value: 'role_hobbies_boardgame',
                    emoji: '🎲'
                },
                {
                    label: 'Cuisine/Cooking',
                    value: 'role_hobbies_cooking',
                    emoji: '🍽'
                },
            ]),
    );
const rolepingsrow = new MessageActionRow()
    .addComponents(
        new MessageSelectMenu()
            .setCustomId('rolepingsselect')
            .setPlaceholder('Choisissez vos notifications / Choose your pings')
            .setMaxValues(7)
            .addOptions([
                {
                    label: 'Annonces/Announcements',
                    value: 'role_ping_announcements',
                    emoji: '📣'
                },
                {
                    label: 'Sondages/Polls',
                    value: 'role_ping_polls',
                    emoji: '📊'
                },
                {
                    label: 'Youtube/Youtube',
                    value: 'role_ping_youtube',
                    emoji: '🎞'
                },
                {
                    label: 'Evenements/Events',
                    value: 'role_ping_events',
                    emoji: '📌'
                },
                {
                    label: 'Partenariats/Partnerships',
                    value: 'role_ping_partnerships',
                    emoji: '🧩'
                },
                {
                    label: 'Animations/Animations',
                    value: 'role_ping_animations',
                    emoji: '🎉'
                },
                {
                    label: 'Ecologie/Ecology',
                    value: 'role_ping_ecology',
                    emoji: '🍄'
                },
                {
                    label: 'Instagram/Instagram',
                    value: 'role_ping_insta',
                    emoji: '🖼️'
                },
            ]),
    );
const sanctionreason = new MessageActionRow()
.addComponents(
    new MessageSelectMenu()
        .setCustomId('sanctionreasons')
        .setPlaceholder('Indiquez le(s) raisons de la sanction.')
        .setMaxValues(5)
        .addOptions([
            {
                label: 'Irrespect/Insulte(s)/Vulgarité',
                value: 'irrespectinsultevulgarité',
            },
            {
                label: 'Spam',
                value: 'spam',
            },
            {
                label: 'Image(s) choquante(s)',
                value: 'imagechoquante',
            },
            {
                label: 'Message(s) choquant(s)',
                value: 'messagechoquand',
            },
            {
                label: 'Autre',
                value: 'autre',
            },
        ]),
);
const applicationmodal = new Modal() // We create a Modal
.setCustomId('applicationmodal')
.setTitle('Art\'Portal - Candidature')
.addComponents(
    /*new TextInputComponent() // We create a Text Input Component
    .setCustomId('application_pseudo')
    .setLabel('Votre pseudo')
    .setStyle('SHORT') //IMPORTANT: Text Input Component Style can be 'SHORT' or 'LONG'
    .setMinLength(7)
    .setMaxLength(10)
    .setPlaceholder('Ex: CoolMan#4094')
    .setRequired(true), // If it's required or not*/
    new TextInputComponent()
    .setCustomId('application_motivation')
    .setLabel('Expliquez vos motivations')
    .setStyle('LONG')
    .setMinLength(300)
    .setMaxLength(1000)
    .setPlaceholder('Ex: Cela me permettrait de m\'enrichir culturellement')
    .setRequired(true),
    new TextInputComponent()
    .setCustomId('application_aptitudes')
    .setLabel('Vos aptitudes')
    .setStyle('LONG')
    .setMinLength(300)
    .setMaxLength(1000)
    .setPlaceholder('En montage pour devenir artiste et en modération pour devenir staff')
    .setRequired(true),
    new TextInputComponent()
    .setCustomId('application_presentation')
    .setLabel('Présentez-vous')
    .setStyle('LONG')
    .setMinLength(300)
    .setMaxLength(1000)
    .setPlaceholder('Présentez-vous, votre expérience, vos attentes...')
    .setRequired(true),
    new TextInputComponent()
    .setCustomId('application_disponibilites')
    .setLabel('Vos disponibilités')
    .setStyle('LONG')
    .setMinLength(20)
    .setMaxLength(1000)
    .setPlaceholder('Ex: Le lundi de 16 à 20h, le dimanche toute la journée...')
    .setRequired(true),
);

const applicationmodalartist = new Modal() // We create a Modal
.setCustomId('applicationmodalartist')
.setTitle('Art\'Portal - Candidature Artiste')
.addComponents(
    /*new TextInputComponent() // We create a Text Input Component
    .setCustomId('application_pseudo')
    .setLabel('Votre pseudo')
    .setStyle('SHORT') //IMPORTANT: Text Input Component Style can be 'SHORT' or 'LONG'
    .setMinLength(7)
    .setMaxLength(10)
    .setPlaceholder('Ex: CoolMan#4094')
    .setRequired(true), // If it's required or not*/
    new TextInputComponent()
    .setCustomId('application_motivation')
    .setLabel('Expliquez vos motivations')
    .setStyle('LONG')
    .setMinLength(300)
    .setMaxLength(1000)
    .setPlaceholder('Ex: Cela me permettrait de m\'enrichir culturellement')
    .setRequired(true),
    new TextInputComponent()
    .setCustomId('application_aptitudes')
    .setLabel('Vos aptitudes')
    .setStyle('LONG')
    .setMinLength(300)
    .setMaxLength(1000)
    .setPlaceholder('En montage, dessin, etc')
    .setRequired(true),
    new TextInputComponent()
    .setCustomId('application_presentation')
    .setLabel('Présentez-vous')
    .setStyle('LONG')
    .setMinLength(300)
    .setMaxLength(1000)
    .setPlaceholder('Présentez-vous, votre expérience, vos attentes...')
    .setRequired(true),
    new TextInputComponent()
    .setCustomId('application_examples')
    .setLabel('Exemples de créations')
    .setStyle('LONG')
    .setMinLength(20)
    .setMaxLength(1000)
    .setPlaceholder('(Liens vers les créations)')
    .setRequired(true),
);

const modpanel_banmodal = new Modal()
.setCustomId('modpanel_banmodal')
.setTitle('Art\'Portal - Bannissement')
.addComponents(
    new TextInputComponent()
    .setCustomId('modpanel_ban_userid')
    .setLabel('Indiquez l\'ID de la personne à bannir')
    .setStyle('SHORT')
    .setMinLength(18)
    .setMaxLength(18)
    .setPlaceholder('Ex: 697438073646088194')
    .setRequired(true),
    new TextInputComponent()
    .setCustomId('modpanel_ban_reason')
    .setLabel('Raison du ban')
    .setStyle('LONG')
    .setMinLength(10)
    .setMaxLength(1000)
    .setPlaceholder('Ex: Insultes, Irrespect')
    .setRequired(true),
);

const modpanel_kickmodal = new Modal()
.setCustomId('modpanel_kickmodal')
.setTitle('Art\'Portal - Expulsion')
.addComponents(
    new TextInputComponent()
    .setCustomId('modpanel_kick_userid')
    .setLabel('Indiquez l\'ID de la personne à kick')
    .setStyle('SHORT')
    .setMinLength(18)
    .setMaxLength(18)
    .setPlaceholder('Ex: 697438073646088194')
    .setRequired(true),
    new TextInputComponent()
    .setCustomId('modpanel_kick_reason')
    .setLabel('Raison du kick')
    .setStyle('LONG')
    .setMinLength(10)
    .setMaxLength(1000)
    .setPlaceholder('Ex: Insultes, Irrespect')
    .setRequired(true),
);

const modpanel_mutemodal = new Modal()
.setCustomId('modpanel_mutemodal')
.setTitle('Art\'Portal - Mute')
.addComponents(
    new TextInputComponent()
    .setCustomId('modpanel_mute_userid')
    .setLabel('Indiquez l\'ID de la personne à mute')
    .setStyle('SHORT')
    .setMinLength(18)
    .setMaxLength(18)
    .setPlaceholder('Ex: 697438073646088194')
    .setRequired(true),
    new TextInputComponent()
    .setCustomId('modpanel_mute_reason')
    .setLabel('Raison du mute')
    .setStyle('LONG')
    .setMinLength(10)
    .setMaxLength(1000)
    .setPlaceholder('Ex: Spam')
    .setRequired(true),
    new TextInputComponent()
    .setCustomId('modpanel_mute_duration')
    .setLabel('Durée du mute EN MINUTES')
    .setStyle('SHORT')
    .setMinLength(1)
    .setMaxLength(4)
    .setPlaceholder('Ex: 1, 60...')
    .setRequired(true),
);

const partnershipmodal = new Modal()
.setCustomId('partnershipmodal')
.setTitle('Art\'Portal - Partenariats')
.addComponents(
    new TextInputComponent()
    .setCustomId('partnership_servinvite')
    .setLabel('Invitation / Lien')
    .setStyle('SHORT')
    .setMaxLength(35)
    .setPlaceholder('Invitation / Lien de votre organisme')
    .setRequired(true),
    new TextInputComponent()
    .setCustomId('partnership_servdesc')
    .setLabel('Description')
    .setStyle('LONG')
    .setMinLength(10)
    .setMaxLength(1000)
    .setPlaceholder('Décrivez votre serveur / organisation si ce n\'est pas un serveur')
    .setRequired(false),
);

const suggestionmodal = new Modal()
.setCustomId('suggestionmodal')
.setTitle('Art\'Portal - Suggestions')
.addComponents(
    new TextInputComponent()
    .setCustomId('suggestion')
    .setLabel('Suggestion')
    .setStyle('LONG')
    .setMinLength(10)
    .setMaxLength(1000)
    .setPlaceholder('Décrivez votre suggestion le plus précisément possible !')
    .setRequired(true),
);

const questionmodal = new Modal()
.setCustomId('questionmodal')
.setTitle('Art\'Portal - Questions')
.addComponents(
    new TextInputComponent()
    .setCustomId('question')
    .setLabel('Question')
    .setStyle('LONG')
    .setMinLength(10)
    .setMaxLength(1000)
    .setPlaceholder('Décrivez votre question le plus précisément possible !')
    .setRequired(true),
);
