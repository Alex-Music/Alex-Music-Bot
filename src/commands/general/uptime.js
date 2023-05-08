const { MessageEmbed, MessageActionRow, MessageButton } = require("discord.js");
const moment = require('moment');

module.exports = {
  name: "uptime",
  category: "general",
  description: "Shows the uptime of the bot!",
  owner: false,
  wl : true,
  execute: async (message, args, client, prefix) => {

   

    const d = moment.duration(client.uptime);
      const days = (d.days() == 1) ? `${d.days()} day` : `${d.days()} days`;
      const hours = (d.hours() == 1) ? `${d.hours()} hour` : `${d.hours()} hours`;
      const minutes = (d.minutes() == 1) ? `${d.minutes()} minute` : `${d.minutes()} minutes`;
      const seconds = (d.seconds() == 1) ? `${d.seconds()} second` : `${d.seconds()} seconds`;
      const up = `Uptime  :: ${days}, ${hours}, ${minutes}, and ${seconds}`;

      const upEmbed = new MessageEmbed()
      .setColor(client.embedColor)
.setDescription(`\`\`\`asciidoc\n${up}\n\`\`\``)
.setAuthor(`|  Uptime`,  message.author.displayAvatarURL({ dynamic: true }))
      message.channel.send({embeds: [upEmbed]});

     // message.reply(up);
    }
    }
