const botconfig = require("../botconfig.json");
const Discord = require("discord.js");
let green = (botconfig.green);
let blue = (botconfig.blue);
let red = (botconfig.red);


module.exports.run = async (bot, message, args) => {
    //--addrole <@user> <rolename>
    if(!message.member.hasPermission("MANAGE_ROLES")) return message.channel.send("You do not have sufficient permissions.");
    let rMember = message.guild.member(message.mentions.users.first()) || message.guild.members.get(args[0]);
    if(!rMember) return message.channel.send("Couldn't find that user.");
    let role = args.join(" ").slice(22);
    if(!role) return message.channel.send("Please provide a role.");
    let gRole = message.guild.roles.find(`name`, role);
    if(!gRole) return message.channel.send("Couldn't find that role.");

    if(rMember.roles.has(gRole.id));
    await(rMember.addRole(gRole.id));

    try{
        await rMember.send(`Congratulations, you have been given the "${gRole.name}" role on ${message.guild.name}!`)
        }catch(e){
    message.channel.send(`Congratulations, <@${rMember.id}>, you have been given the ${gRole.name} role! Please unlock your DM's to server members to recieve further role updates!`);
    }
}

module.exports.help = {
    name: "addrole"
}
