const botconfig = require("../botconfig.json");
const Discord = require("discord.js");
const ms = require("ms");
let green = (botconfig.green);
let blue = (botconfig.blue);
let red = (botconfig.red);


module.exports.run = async (bot, message, args) => {
    //--tempmute <@user> <time s/m/h/d>

    let tomute = message.guild.member(message.mentions.members.first() || message.guild.members.get(args[0]));
    if(!tomute) return message.channel.send("Couldn't find that user.");
    if(tomute.hasPermission("MANAGE_MESSAGES")) return message.channel.send("Cannot mute this user.");
    if(!message.member.hasPermission("KICK_MEMBERS")) return message.channel.send("You can't use that command.");
    let muterole = message.guild.roles.find(`name`, "muted");
    if(!muterole){
        try{
            muterole = await message.guild.createRole({
                name: "muted",
                color: red,
                permissions: []
            })
            message.guild.channels.forEach(async (channel, id)=> {
                await channel.overwritePermissions(muterole, {
                    SEND_MESSAGES: false,
                    ADD_REACTIONS: false
                });
            });
        }catch(e){
            console.log(e.stack);
        }
    }

    let mutetime = args[1];
    if(!mutetime) return message.channel.send("Please provide an amount of time");

    await(tomute.addRole(muterole.id));
    message.channel.send(` ${message.author} has muted <@${tomute.id}> for ${ms(ms(mutetime))}`);

    setTimeout(function(){
        tomute.removeRole(muterole.id);
        message.channel.send(`<@${tomute.id}> has been unmuted.`);
    }, ms(mutetime));

}

module.exports.help = {
    name: "tempmute"
}
