console.log(`------------------------------------------------- \r\n             Premier démarrage \r\n-------------------------------------------------`)
console.log(``)
console.log(`Bienvenue sur votre hébergement, pour importer vos modules, vous pouvez inscrire leur nom ci-dessous (séparés par des espaces) ou passer par le SFTP.`)
console.log(`Image Docker réalisée par AZeRY`)

const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

rl.question(`Quels modules npm voulez vous installer ?`, (answer) => {
const { exec } = require("child_process");

exec(`npm i ${answer}`, (error, stdout, stderr) => {
    if (error) {
        console.log(`error: ${error.message}`);
        return;
    }
    if (stderr) {
        console.log(`stderr: ${stderr}`);
        return;
    }
    console.log(`${stdout}`);
});
rl.close();
})
