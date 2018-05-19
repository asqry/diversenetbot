const botconfig = require("../botconfig.json");
const Discord = require("discord.js");
let green = (botconfig.green);
let blue = (botconfig.blue);
let red = (botconfig.red);


module.exports.run = async (bot, message, args) => {
    let mUser = message.guild.member(message.mentions.members.first() || message.guild.members.get(args[0]));
    if(!mUser) return message.channel.send("Couldn't find that user.");
    if(mUser.hasPermission("MANAGE_MESSAGES")) return message.channel.send("That user could't have been muted.");
    if(!message.member.hasPermission("MANAGE_MESSAGES")) return message.channel.send("You do not have sufficient permissions.");

    let muterole = message.guild.roles.find(`name`, "muted");
    if(!muterole)  return message.channel.send(`Please make sure your "muted" role is lowercase.`);

    mUser.removeRole(muterole.id);
    message.channel.send(`<@${mUser.id}> has been unmuted by ${message.author}.`);
}

module.exports.help = {
    name: "unmute"
}
