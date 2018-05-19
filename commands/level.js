const botconfig = require("../botconfig.json");
const Discord = require("discord.js");
let xp = require("../xp.json");
let green = (botconfig.green);
let blue = (botconfig.blue);
let red = (botconfig.red);
let purple = (botconfig.purple);


module.exports.run = async (bot, message, args) => {
    if(!xp[message.author.id]){
        xp[message.author.id] = {
            xp: 0,
            level: 1
        };
}

    let curxp = xp[message.author.id].xp;
    let curlvl = xp[message.author.id].level;
    let nextlvlxp = curlvl * 300;
    let difference = nextlvlxp - curxp;

    let lvlembed = new Discord.RichEmbed()
    .setAuthor(message.author.username)
    .setColor(purple)
    .addField("Level", curlvl, true)
    .addField("XP", curxp, true)
    .setFooter(`${difference} XP Until Level Up`, message.author.displayAvatarURL);

    message.channel.send(lvlembed).then(msg => {msg.delete(10000)});

}

module.exports.help = {
    name: "level"
}
