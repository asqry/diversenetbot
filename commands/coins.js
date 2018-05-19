const botconfig = require("../botconfig.json");
const Discord = require("discord.js");
let green = (botconfig.green);
let blue = (botconfig.blue);
let red = (botconfig.red);
let coins = require("../coins.json");

module.exports.run = async (bot, message, args) => {
    //--coins
    if(!coins[message.author.id]){
        coins[message.author.id] = {
            coins: 0
        };
    }
    let ucoins = coins[message.author.id].coins;

    let cembed = new Discord.RichEmbed()
    .setAuthor(message.author.username)
    .setColor(blue)
    .addField(":moneybag:", ucoins);

    message.channel.send(cembed).then(msg => {msg.delete(10000)});
}

module.exports.help = {
    name: "coins"
}
