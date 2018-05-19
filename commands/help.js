const Discord = require("discord.js");
const botconfig = require("../botconfig.json");
let green = (botconfig.green);
let blue = (botconfig.blue);
let red = (botconfig.red);
let purple = (botconfig.purple);


module.exports.run = async (bot, message, args) => {
    let boticon = bot.user.displayAvatarURL
    let helpembed = new Discord.RichEmbed()
    .setDescription("Help and usage for Diverse Network Bot")

    message.channel.send(helpembed);

}

module.exports.help = {
    name: "help"
}
