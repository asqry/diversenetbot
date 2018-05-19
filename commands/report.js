const botconfig = require("../botconfig.json");
const Discord = require("discord.js");
let green = (botconfig.green);
let blue = (botconfig.blue);
let red = (botconfig.red);


module.exports.run = async (bot, message, args) => {
    //--report <user> <reason>
    let rUser = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
    if(!rUser) return message.channel.send("Couldn't find that user.");
    let reason = args.join(" ").slice(22);
    if(!reason) return message.channel.send("Please provide a reason.");

    let rembed = new Discord.RichEmbed()
    .setDescription("Report")
    .setColor(red)
    .addField("Reported User", `${rUser} with ID: ${rUser.id}`)
    .addField("Reported By", `${message.author} with ID: ${message.author.id}`)
    .addField("Channel", message.channel)
    .addField("Time", message.createdAt)
    .addField("Reason", reason);

    let reportschannel = message.guild.channels.find(`name`, "reports")
    if(!reportschannel) return message.channel.send(`Please create a channel called "reports"`);

    message.delete().catch(O_o=>{});
    reportschannel.send(rembed);
}

module.exports.help = {
    name: "report"
}
