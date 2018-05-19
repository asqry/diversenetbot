const botconfig = require("../botconfig.json");
const Discord = require("discord.js");
const fs = require("fs");
const ms = require("ms");
let warns = JSON.parse(fs.readFileSync("./warnings.json", "utf8"));
let green = (botconfig.green);
let blue = (botconfig.blue);
let red = (botconfig.red);


module.exports.run = async (bot, message, args) => {
    //--warn <user> <reason>
    if(!message.member.hasPermission("MANAGE_MESSAGES")) return message.channel.send("You do not have sufficient permissions.");
    let wUser = message.guild.member(message.mentions.users.first()) || message.guild.members.get(args[0]);
    if(!wUser) return message.channel.send("Couldn't find that user.")
if(wUser.hasPermission("MANAGE_MESSAGES")) return message.channel.send("You cannot warn this person.");
let reason = args.join(" ").slice(22);
if(!reason) return message.channel.send("Please provide a reason.")

if(!warns[wUser.id]) warns[wUser.id] = {
    warns: 0
    };

    warns[wUser.id].warns++;

    fs.writeFile("./warnings.json", JSON.stringify(warns), (err) => {
        if (err) console.log(err)
    });

    let wembed = new Discord.RichEmbed()
    .setDescription("Warn")
    .setAuthor(message.author.username)
    .setColor(red)
    .addField("Warned User", `<@${wUser.id}> with ID: ${wUser.id}`)
    .addField("Warned User", `<@${message.author.id}> with ID: ${message.author.id}`)
    .addField("Warned In", message.channel)
    .addField("Number Of Warnings", warns[wUser.id].warns)
    .addField("Reason", reason);

    message.channel.send(`<@${wUser.id}> has been warned by ${message.author}. ${wUser} now has ${warns[wUser.id].warns} warns.`);
    let warnchannel = message.guild.channels.find(`name`, "incidents");
    if(!warnchannel) return message.channel.send(`Please create a channel called "incidents"`);

    warnchannel.send(wembed);

    if(warns[wUser.id].warns == 3){
        let muterole = message.guild.roles.find(`name`, "muted");
        if(!muterole) return message.channel.send(`Please make sure your "muted" role is all lowercase.`);

        let mutetime = "10m";
        await(wUser.addRole(muterole.id));
        message.channel.send(`<@${wUser.id}> has been muted for ${mutetime}`);

        setTimeout(function(){
            wUser.removeRole(muterole.id);
            message.channel.send(`${wUser} has been unmuted`);
        }, ms(mutetime));

    }
    if(warns[wUser.id].warns == 5){
        let muterole = message.guild.roles.find(`name`, "muted");
        if(!muterole) return message.channel.send(`Please make sure your "muted" role is all lowercase.`);

        let mutetime = "30m";
        await(wUser.addRole(muterole.id));
        message.channel.send(`<@${wUser.id}> has been muted for ${mutetime}`);

        setTimeout(function(){
            wUser.removeRole(muterole.id);
            message.channel.send(`<@${wUser.id}> has been unmuted.`);
        }, ms(mutetime));
    }
    if(warns[wUser.id].warns == 10){
        message.guild.member(wUser).ban(reason);
        message.channel.send(`<@${wUser}> has been banned.`);
    }

}


module.exports.help = {
    name: "warn"
}
