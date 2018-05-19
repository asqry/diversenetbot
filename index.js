const botconfig = require("./botconfig.json");
const Discord = require("discord.js");
let green = (botconfig.green);
let blue = (botconfig.blue);
let red = (botconfig.red);
let purple = (botconfig.purple);
let cooldown = new Set();
let cdseconds = 5;
let xp = require("./xp.json");
const fs = require("fs");
const bot = new Discord.Client({disableEveryone: false})
bot.commands = new Discord.Collection();
let coins = require("./coins.json");

fs.readdir("./commands", (err, files) => {
    if(err) console.log(err);

    let jsfile = files.filter(f => f.split(".").pop() === "js")
    if(jsfile.length <= 0){
        console.log("Couldn't find commands.");
        return;
    }

    jsfile.forEach((f, i) => {
        let props = require(`./commands/${f}`);
        console.log(`${f} loaded!`);
        bot.commands.set(props.help.name, props);
    });

});


bot.on("ready", async() => {
    console.log(`${bot.user.username} is online on ${bot.guilds.size} servers.`);
    bot.user.setActivity("Diverse Network is the best! | --botinfo", {type: "Watching"})
});

bot.on("guildMemberAdd", async member => {
    console.log(`${member.id} has joined the server.`);

    let welcomechannel = member.guild.channels.find(`name`, "welcome");
    welcomechannel.send(`Welcome to Diverse Network, ${member}! Have a great time here!`)

    member.addRole(member.guild.roles.find(`name`, "Member"))
});

bot.on("guildMemberRemove", async member => {
    console.log(`${member.id} has left the server.`);

    let welcomechannel = member.guild.channels.find(`name`, "welcome");
    welcomechannel.send(`${member} has left Diverse Network.`)
});

bot.on("channelCreate", async channel => {
    console.log(`${channel.name} has been created`);

    let logchannel = channel.guild.channels.find(`name`, "dnet-logs");
    logchannel.send(`The channel "${channel}" has been created.`)
});

bot.on("channelDelete", async channel => {
    console.log(`${channel.name} has been deleted`);

    let logchannel = channel.guild.channels.find(`name`, "dnet-logs");
    logchannel.send(`The channel "${channel.name}" has been deleted.`)
});

bot.on("message", async message => {
    if(message.author.bot) return;
    if(message.channel.type === "dm") return;

    if(!coins[message.author.id]){
        coins[message.author.id] = {
            coins: 0
        };
    }

    let coinamt = Math.floor(Math.random() * 15) + 1;
    let baseamt = Math.floor(Math.random() * 15) + 1;
    console.log(`${coinamt} ; ${baseamt}`);

    if(coinamt === baseamt){
        coins[message.author.id] = {
            coins: coins[message.author.id].coins + coinamt
        };
        fs.writeFile("./coins.json", JSON.stringify(coins), (err) => {
            if(err) console.log(err)
        });
        let cembed = new Discord.RichEmbed()
        .setAuthor(message.author.username)
        .setColor(blue)
        .addField(":moneybag:", `+ ${coinamt} coins!`);

        message.channel.send(cembed).then(msg => {msg.delete(5000)});
    }

    let xpadd = Math.floor(Math.random() * 7) + 8;

    if(!xp[message.author.id]){
        xp[message.author.id] = {
            xp: 0,
            level: 1
        };
    }


    let curxp = xp[message.author.id].xp;
    let curlvl = xp[message.author.id].level;
    let nxtlvl = xp[message.author.id].level * 300;
    xp[message.author.id].xp = curxp + xpadd;
    if(nxtlvl <= xp[message.author.id].xp){
        xp[message.author.id].level = curlvl + 1;

        let lvlup = new Discord.RichEmbed()
        .setTitle(":up: Level Up!")
        .setColor(purple)
        .addField("New Level", curlvl + 1);

        message.channel.send(lvlup).then(msg => {msg.delete(10000)});
        //embed divider----------------------------------------------
        let plusxp = new Discord.RichEmbed()
        .setAuthor(message.author.username)
        .setColor(purple)
        .addField(":thumbsup:", `+ ${xpadd} XP!`);

        message.channel.send(plusxp).then(msg => {msg.delete(3000)});
    }
    fs.writeFile("./xp.json", JSON.stringify(xp), (err) => {

        if(err) console.log(err)
        console.log(xpadd);
        console.log(`${message.author.username} is now level ${xp[message.author.id].level}`);
    });

    let prefix = botconfig.prefix;
    if(!message.content.startsWith(prefix)) return;
    if(cooldown.has(message.author.id)){
        message.delete();
        return message.channel.send("You must wait 5 seconds between commands.")
    }
    if(!message.member.hasPermission("ADMINISTRATOR")){
        cooldown.add(message.author.id);
    }

    let messageArray = message.content.split(" ");
    let cmd = messageArray[0];
    let args = messageArray.slice(1);

    let commandfile = bot.commands.get(cmd.slice(prefix.length));
    if(commandfile) commandfile.run(bot, message, args);

    setTimeout(() => {
        cooldown.delete(message.author.id)
    }, cdseconds * 1000)

    //Non-Command Handler commands go here...

});

bot.login(botconfig.token);
