const Discord = require("discord.js");
const botconfig = require("../botconfig.json");
let green = (botconfig.green);
let blue = (botconfig.blue);
let red = (botconfig.red);

module.exports.run = async (bot, message, args) => {

    let replies = ["1", "2", "3", "4", "5"];

    let result = Math.floor((Math.random() * replies.length));

    message.reply(`Your number is ${replies[result]}.`)
}

module.exports.help = {
    name: "rng"
}
