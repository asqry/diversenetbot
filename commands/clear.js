const botconfig = require("../botconfig.json");
const Discord = require("discord.js");
let green = (botconfig.green);
let blue = (botconfig.blue);
let red = (botconfig.red);


module.exports.run = async (bot, message, args) => {
    //--clear <amount of messages>
    if(!message.member.hasPermission("MANAGE_MESSAGES")) return message.channel.send("You do not have sufficient permissions.");
    if(!args[0]) return message.channel.send("Usage: --clear <# of messages>");
    message.channel.bulkDelete(args[0]).then(() => {
        message.channel.send(`${message.author} successfully deleted ${args[0]} messages in ${message.channel}.`);
    })
}

module.exports.help = {
    name: "clear"
}
