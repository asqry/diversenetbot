const botconfig = require("../botconfig.json");
const Discord = require("discord.js");
let green = (botconfig.green);
let blue = (botconfig.blue);
let red = (botconfig.red);


module.exports.run = async (bot, message, args) => {
    //kick <user> <reason>
    let kUser = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
    if(!kUser) return message.channel.send("Couldn't find that user.")
    let kReason = args.join(" ").slice(22);
    if(!kReason) return message.channel.send("Please provide a reason.")
    if(!message.member.hasPermission("KICK_MEMBERS")) return message.channel.send("Not enough permissions.");
    if(kUser.hasPermission("KICK_MEMBERS")) return message.channel.send("That user cannot be kicked.")

    let kembed = new Discord.RichEmbed()
        .setDescription("Kick")
        .setColor(red)
        .addField("Kicked User", `${kUser} with ID: ${kUser.id}`)
        .addField("Kicked By", `<@${message.author.id}> with ID: ${message.author.id}`)
        .addField("Kicked In", message.channel)
        .addField("Time", message.createdAt)
        .addField("Reason", kReason);

        let kickchannel = message.guild.channels.find(`name`, "incidents")
        if(!kickchannel) return message.channel.send(`Please create a channel called "incidents"`)

        message.guild.member(kUser).kick(kReason);
        kickchannel.send(kembed);
}

module.exports.help = {
    name: "kick"
}
