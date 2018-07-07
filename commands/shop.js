const Discord = require('discord.js');
const request = require('request');

// Your token for fnbr - https://fnbr.co/api/docs
const fnbr_token = '7bfd6b4e-dcd4-4607-b99c-9a636aae9f28';

exports.run = async (client, message, args) =>{
    var options = {
        method: "GET",
        url: "https://fnbr.co/api/shop",
        headers: {
          'User-Agent': 'nodejs request',
          'x-api-key': fnbr_token
        }
    }

    request(options, function(error, response, body) {
        if (error) return;
        var responsedata = JSON.parse(body);

        data = responsedata["data"]
        daily = data["daily"]
        featured = data["featured"]
        date = data["date"]

        var item, i, embed;
        for (i=0;i<featured.length;i++) {
            item = featured[i];
            embed = new Discord.RichEmbed();
            embed.setColor('RED')
            embed.addField('Featured Item: ' + item.name, 'Price: ' + item.price + ' VBucks');
            embed.setThumbnail(item.images.icon);
            embed.setFooter(`Developed by Marshall ` + ' | API by: fnbr.co')
            message.channel.send(embed);
        }
        for (i=0;i<daily.length;i++) {
            item = daily[i];
            embed = new Discord.RichEmbed();
            embed.setColor('GREEN')
            embed.addField('Daily Item: ' + item.name, 'Price: ' + item.price + ' VBucks');
            embed.setThumbnail(item.images.icon);
            embed.setFooter(`Developed by Marshall ` + ' | API by: fnbr.co')
            message.channel.send(embed);
        }
    })
};

module.exports.help = {
  name: "shop"
}
