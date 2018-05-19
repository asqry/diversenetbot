const botconfig = require("../botconfig.json");
const Discord = require("discord.js");
let green = (botconfig.green);
let blue = (botconfig.blue);
let red = (botconfig.red);


module.exports.run = async (bot, message, args) => {
    let bicon = bot.user.displayAvatarURL
    let botembed = new Discord.RichEmbed()
    .setDescription("Bot Information")
    .setThumbnail(bicon)
    .setColor(green)
    .addField("Bot Name", bot.user.username)
    .addField("Created On", bot.user.createdAt);

    message.channel.send(botembed);
}

module.exports.help = {
    name: "botinfo"
}
