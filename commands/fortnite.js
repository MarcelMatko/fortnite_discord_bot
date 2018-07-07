const Discord = require("discord.js");
const config = require("../botconfig.json");
const apikey = require("../keys.json");

exports.run = async (client, message, args) => {
  let username = args[0];
  let platform = args[1] || "pc";

  if (!username) return message.reply('Please provide a username');

  const Fortnite = require('fortnite');
  const fortnite = new Fortnite('81e84f99-070d-4343-ac2a-ff72f7fc380e')

 fortnite.user(username, platform).then(data => {

    let kills = data.stats.lifetime[10]['Kills']
    let score = data.stats.lifetime[6]['Score']
    let matchesPlayed = data.stats.lifetime[7]['Matches Played']
    let minutesPlayed = data.stats.lifetime[12]['Minutes Played']
    let wins = data.stats.lifetime[8]['Wins']
    let winPercent = data.stats.lifetime[9]['Win%']
    let KD = data.stats.lifetime[11]['K/d']
    let Top5s = data.stats.lifetime[1]['Top 5s']

    const embed = new Discord.RichEmbed()
    .setAuthor(`${data.username}'s Fortnite stats on ${data.platform} | Lifetime Stats`)
    .setThumbnail('https://cdn2.unrealengine.com/Fortnite%2Fsearch-for-survivors%2FsignupBanner-155x221-7d1f31411baf91e6cadf490c6f60f98a72b38b4c.png')
    .setColor('RANDOM')
    .addField('Kills', kills, true)
    .addField('Score', score, true)
    .addField('Wins', `${wins} (${winPercent})`, true)
    .addField('K/D Ratio', KD, true)
    .addField('Top 5s', Top5s, true)
    .addField('Matches Played', matchesPlayed, true)
    .addField('Minutes Played', minutesPlayed, true)
    .setFooter(`Requested by: ${message.author.username} `, message.author.avatarURL)
    .setTimestamp()

    message.channel.send(embed);


    }).catch(e => {
        console.log(e)
        return message.reply('Invalid Search - An error occured');
    });
};

module.exports.help = {
  name: "stats"
}
