const botconfig = require("../botconfig.json");
const Discord = require("discord.js");
let green = (botconfig.green);
let blue = (botconfig.blue);
let red = (botconfig.red);


module.exports.run = async (bot, message, args) => {
    let sicon = message.guild.iconURL
    let sembed = new Discord.RichEmbed()
    .setDescription("Information on Diverse Network")
    .setColor(blue)
    .setThumbnail(sicon)
    .addField("Server Name", message.guild.name)
    .addField("Created On", `${message.guild.createdAt}`)
    .addField("You joined", message.member.joinedAt)
    .addField("Total Members", message.guild.memberCount);

    message.channel.send(sembed);
}

module.exports.help = {
    name: "serverinfo"
}
