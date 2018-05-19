const botconfig = require("../botconfig.json");
const Discord = require("discord.js");
const fs = require("fs");
let green = (botconfig.green);
let blue = (botconfig.blue);
let red = (botconfig.red);
let coins = require("../coins.json");


module.exports.run = async (bot, message, args) => {
    //--pay <@user> <amt>
    if(!coins[message.author.id]){
        return message.channel.send("You do not have any coins");
    }

    let puser = message.guild.member(message.mentions.members.first() || message.guild.members.get(args[0]));
    if(!puser) return message.channel.send("Couldn't find that user.");

    if(!coins[puser.id]){
        coins[puser.id] = {
            coins: 0
        };
    }

    let pcoins = coins[puser.id].coins;
    let scoins = coins[message.author.id].coins;

    if(scoins < args[0]) return message.channel.send("You do not have enough coins.");

    coins[message.author.id] = {
        coins: scoins - parseInt(args[1])
    };

    coins[puser.id] = {
        coins: pcoins + parseInt(args[1])
    };

    message.channel.send(`${message.author} has given ${puser} ${args[1]} coins!`);

    fs.writeFile("./coins.json", JSON.stringify(coins), (err) => {
        if(err) console.log(err)
    });
}

module.exports.help = {
    name: "pay"
}
