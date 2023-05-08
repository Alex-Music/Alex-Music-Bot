const { MessageEmbed, MessageActionRow, MessageButton } = require("discord.js");
const twentyfourseven = require("../../schema/twentyfourseven")

module.exports = {
  name: "movebot",
  category: "settings",
  description: "Moves the bot to your voice channel!",
  owner: false,
  wl : true,

  execute: async (message, args, client, prefix) => {
      
    let ok = client.emoji.ok;
    let no = client.emoji.no;
    
    const channel = message.member.voice.channel;
    if(channel.id === message.guild.me.voice.channel.id) {
        const ttt = new MessageEmbed()
        .setColor(client.embedColor)
        .setDescription(`${no} I am already in your channel`)
        return message.channel.send({embeds: [ttt]})
    }
const player = client.manager.players.get(message.guildId)
    const opop = new MessageEmbed()
    .setColor(client.embedColor)
    .setDescription(`${ok} Joining your channel`)
    await message.channel.send({embeds: [opop]}).then(async msg => {
        const tne = new MessageEmbed()
        .setColor(client.embedColor)
        .setDescription(` Trying to continue the player!`)
        msg.edit({embeds: [tne]}).then(async msg => {
            await message.guild.me.voice.setChannel(message.member.voice.channel, "Resume queue in new channel");
            if(channel.type === "stage") {
                await message.guild.me.voice.setSuppressed(false)
            }
            player.voiceChannel = message.member.voice.channel.id;
            const rrr = new MessageEmbed()
            .setColor(client.embedColor)
            .setDescription(`${ok} Successfully continued queue!`)
            msg.edit({embeds: [rrr]})
        })
    })
     }
}