const botconfig = require("../botconfig.json");
const Discord = require("discord.js");
const ms = require("ms");
const fs = require("fs");
let warns = JSON.parse(fs.readFileSync("./warnings.json", "utf8"));
let green = (botconfig.green);
let blue = (botconfig.blue);
let red = (botconfig.red);


module.exports.run = async (bot, message, args) => {
    //--warnlevel <user>
    if(!message.member.hasPermission("MANAGE_MESSAGES")) return message.channel.send("You do not have sufficient permissions.");
    let wUser = message.guild.member(message.mentions.users.first()) || message.guild.members.get(args[0]);
    if(!wUser) return message.channel.send("Couldn't find that user.");
    let warnlevel = warns[wUser.id].warns;

    let wlembed = new Discord.RichEmbed()
    .setAuthor(`${wUser.id}`)
    .setColor(green)
    .addField("Number Of Warnings", `${warnlevel}`);

    message.channel.send(wlembed);
}

module.exports.help = {
    name: "warnlevel"
}
