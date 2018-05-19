    const botconfig = require("../botconfig.json");
    const Discord = require("discord.js");
    let green = (botconfig.green);
    let blue = (botconfig.blue);
    let red = (botconfig.red);

    module.exports.run = async (bot, message, args) => {
        //kick <user> <reason>
        let bUser = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
        if(!bUser) return message.channel.send("Couldn't find that user.")
        let bReason = args.join(" ").slice(22);
        if(!bReason) return message.channel.send("Please provide a reason.")
        if(!message.member.hasPermission("KICK_MEMBERS")) return message.channel.send("Not enough permissions.");
        if(bUser.hasPermission("KICK_MEMBERS")) return message.channel.send("That user cannot be kicked.")

        let bembed = new Discord.RichEmbed()
            .setDescription("Ban")
            .setColor(red)
            .addField("Banned User", `${bUser} with ID: ${bUser.id}`)
            .addField("Banned By", `<@${message.author.id}> with ID: ${message.author.id}`)
            .addField("Banned In", message.channel)
            .addField("Time", message.createdAt)
            .addField("Reason", bReason);

            let banchannel = message.guild.channels.find(`name`, "incidents")
            if(!banchannel) return message.channel.send(`Please create a channel called "incidents"`)

            message.guild.member(bUser).ban(bReason);
            banchannel.send(bembed);
    }

    module.exports.help = {
        name: "ban"
    }
