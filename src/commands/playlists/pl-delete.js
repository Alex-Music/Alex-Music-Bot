const playlistdelete = require(`../../schema/playlists.js`)
const { MessageEmbed, MessageActionRow, MessageButton } = require("discord.js");
const lodash = require('lodash');
module.exports = {
    name: "pl-delete",
    category: "playlists",
    aliases: ["playlist-delete"],
    description: "Deletes a specific playlist!",
    wl : true,
  
    execute: async (message, args, client, prefix) => {
          
       
    let ok = client.emoji.ok;
    let no = client.emoji.no;
    let star = client.emoji.star
    
    const Name = args[0];
    const data = await playlistdelete.findOne({ UserId: message.author.id, PlaylistName: Name });
    if (!data) {
      return message.reply({
        embeds: [
          new MessageEmbed()
          .setAuthor(`Alex Music`, message.author.displayAvatarURL())
            .setColor(client.embedColor)
            .setDescription(`${no} You don't have a playlist with \`${Name}\`. \n${star} Please enter a valid playlist name! `),
        ],
      });
    }
    if (data.length == 0) {
      return message.reply({
        embeds: [
          new MessageEmbed()
          .setAuthor(`Alex Music`, message.author.displayAvatarURL())
            .setColor(client.embedColor)
            .setDescription(`${no} You don't have a playlist with \`${Name}\`. \n${star} Please enter a valid playlist name! `),
        ],
      });
    }
    await data.delete();
    const embed = new MessageEmbed()
      .setColor(client.embedColor)
      .setAuthor(`Alex Music`, message.author.displayAvatarURL())
      .setDescription(`${ok} Successfully deleted \`${Name}\` playlist`);
    return message.channel.send({ embeds: [embed] });
  }
}
