const { MessageEmbed, MessageActionRow, MessageButton } = require("discord.js");
const twentyfourseven = require("../../schema/twentyfourseven")

module.exports = {
  name: "moveme",
  category: "settings",
  description: "Moves you to the bots voice channel!",
  owner: false,
  wl : true,

  execute: async (message, args, client, prefix) => {
      
    let ok = client.emoji.ok;
    let no = client.emoji.no;
    
    let channel = message.member.voice.channel;
        let botchannel = message.guild.me.voice.channel;
        if(!botchannel) {
          const ifkf = new MessageEmbed()
          .setColor(client.embedColor)
          .setDescription(`${ok} I am connected nowhere`)
          return message.channel.send({embeds: [ifkf]})
        }
        if(!channel) {
          const dd = new MessageEmbed()
          .setColor(client.embedColor)
          .setDescription(`${no} Please Connect to a voice channel first`)
          return message.channel.send({embeds: [dd]})
        }
        if(botchannel.userLimit >= botchannel.members.length) {
          const idkd = new MessageEmbed()
          .setColor(client.embedColor)
          .setDescription(`${no} Sorry my channel is full, I cant move you`)
          return message.channel.send({embeds: [idkd]})
        }
        if(botchannel.id == channel.id) {
          const tt = new MessageEmbed()
          .setColor(client.embedColor)
          .setDescription(`${no} You are already in my channel `)
          return message.channel.send({embeds: [tt]})
        }
        message.member.voice.setChannel(botchannel);
        const ioop = new MessageEmbed()
        .setColor(client.embedColor)
        .setDescription(`${ok} moved you to: \`${botchannel.name}\``)
        return message.channel.send({embeds: [ioop]});
      }
     }
