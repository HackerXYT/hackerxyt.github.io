/**
 * MADE BY HACKERX
 * jingis bot version 1.0
 */
const express = require("express")
const Discord = require('discord.js')
require('log-timestamp');
const client = new Discord.Client()
const memberCount = require('./member-count')
const privateMessage = require('./private-message')
const firstMessage = require('./first-message')
const poll = require('./poll')
const ann = require('./ann')
require('discord-reply')
require('discord-buttons')(client);
const { MessageButton, MessageActionRow } = require('discord-buttons')
const app = express()
//constants
const VERSION = '0.1.1';
//const TOKEN = 'TOKEN GOES HERE';
const CHANNEL = 'log-town';
app.use(express.static(__dirname + "/public/"), (_, res, next) => {
  res.status(404)
  res.sendFile(__dirname + "/404.html")
});

const prefix = '!';

app.listen(8080);

app.get("/", (req, res) => {
  res.send("online")
})
app.listen(3000, () => {
	console.log("----------------")
  console.log("Please Wait")
})

client.on("guildMemberAdd", member => {
		let roleID = "900366471249657887";
    let welcome = new Discord.MessageEmbed()
  .setThumbnail(member.user.avatarURL())
.setAuthor(`Members Updated!`)
.setDescription(`Καλωσόρισες ${member} ` + process.env.smile)
.addFields(
		{ name: 'Ξεκίνα Πηγαίνοντας Εδώ:', value: '<#900363843732135949>' }
)
.setTimestamp()
.setColor("6600FF");
member.guild.channels.cache.get("908846408466038804").send(welcome)
		console.log('Jingis: ' + member.user.username + ' has joined the server!');
    var role = member.guild.roles.cache.find(role => role.id === "900366471249657887");
    member.roles.add(role);
})
client.on("ready", function() {
	console.log('[META][INFO] Connected to Discord API Service');
				client.user.setPresence({ activity: { name: `help` }, status: "dnd" })
				console.log("No Errors Detected");
    })

client.on("message", message => { 
	Msg = message.content.slice(0);
	console.log(`${message.author.username} said: `+Msg)
if(message.content === "pinggt") {
  console.log("requested!")
}

if(message.content.startsWith(`!dm`)){
 const whattosend = message.content.slice("".length).trim().split(/ +/);
whattosend.shift().toLowerCase().split(" ")[1]
const member = message.mentions.members.first() || message.guild.members.cache.get(whattosend[0])
if(!member) return message.channel.send('Provide a user!')
if(!whattosend[1]) return message.channel.send('What do you want to send to them?')
member.send(whattosend.slice(1).join(" "))
.catch(e => {

        // Oh no, it errored! Let's log it to console :)
        console.error(e);
    });
console.log("Sent: " + whattosend.slice(1).join(" ") + ` to: ` + member)
} 

if(message.content === `!help`) {
	let embed = new Discord.MessageEmbed()
	.setColor('#0099ff')
	.setTitle('Help')
	.setDescription('!status, !test1, !dm, !meme')
	.setTimestamp()
	message.channel.send(embed)
}

const https = require('https');
 const url = 'https://www.reddit.com/r/memes/hot/.json?limit=100';

 if (message.content.startsWith(`${prefix}meme`)) {
 https.get(url, result => {
 var body = '';
 result.on('data', chunk => {
 body += chunk;
 });

 result
 .on('end', () => {
 var response = JSON.parse(body);
 var index =
 response.data.children[Math.floor(Math.random() * 99) + 1].data;

 var link = 'https://reddit.com' + index.permalink;

 if (index.post_hint !== 'image') {
 var text = index.selftext;
 const textembed = new Discord.MessageEmbed()
 .setTitle(`${title}`)
 .setColor('RANDOM')
 .setURL(link);

 message.channel.send(textembed);
 }

 var image = index.preview.images[0].source.url.replace('&amp;', '&');
 var title = index.title;
 var subRedditName = index.subreddit_name_prefixed;

 if (index.post_hint !== 'image') {
 const textembed = new Discord.MessageEmbed()
 .setTitle(`${title}`)
 .setColor('RANDOM')
 .setURL(link);

 message.channel.send(textembed);
 }
 const imageembed = new Discord.MessageEmbed()
 .setTitle(`${title}`)
 .setImage(image)
 .setColor('RANDOM')
 .setURL(link);
 message.channel.send(imageembed);
 })
 .on('error', function(e) {
 console.log('Got an error: ', e);
 });
 });
 }


if(message.content === `${prefix}test1`) {
    let welcome = new Discord.MessageEmbed()
  .setThumbnail(message.author.avatarURL())
.setAuthor(`jingis`)
.setDescription(`Καλωσόρισες ${message.author} ` + process.env.smile)
.setTimestamp()
.addFields(
		{ name: 'Ξεκίνα Πηγαίνοντας Εδώ:', value: '<#900363843732135949>' }
)
.setColor("6600FF");
client.channels.cache.get("913527625744539718").send(welcome)
		console.log('Jingis: ' + message.author.username + ' has joined the server!');
		client.channels.cache.get("913527625744539718").send(`${message.author} **joined the server!**`)
}

if(message.content === `${prefix}status`) {
	message.channel.send(`Usage: **!status <your-status> <dnd/idle/invisible>`)
}
if(message.content.startsWith(`!status`)) {
	 mentionMessage = message.content.slice(7);
	 client.user.setPresence({ activity: { name: `${mentionMessage}` }, status: "dnd" })
	 const textembed = new Discord.MessageEmbed()
 .setTitle(`Success!`)
 .setDescription(`Success, ${message.author} You Just Changed <@703137833157656638> Status To**` + mentionMessage + ` **for 10 minutes *(600000 milliseconds)*!`)
 .setColor('PURPLE')
 console.log(`${message.author} changed status to ` + mentionMessage)
 message.channel.send(textembed);
	 setTimeout(function(){
		client.user.setPresence({ activity: { name: `help` }, status: "dnd" })
}, 600000); //time (1800000) for status to change back to default
		}
})


client.login(process.env.token)
