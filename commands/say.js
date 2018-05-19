const botconfig = require("../botconfig.json");
const Discord = require("discord.js");
let green = (botconfig.green);
let blue = (botconfig.blue);
let red = (botconfig.red);


module.exports.run = async (bot, message, args) => {
    //--say <message>
    if(!message.member.hasPermission("MANAGE_MESSAGES")) return message.channel.send("You do not have sufficient permissions.");
    let botmsg = args.join(" ");
    message.delete().catch();
    message.channel.send(botmsg);
}

module.exports.help = {
    name: "say"
}
