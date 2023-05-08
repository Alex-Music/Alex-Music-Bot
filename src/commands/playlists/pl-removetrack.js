const playlistremove = require(`../../schema/playlists.js`)
const { MessageEmbed, MessageActionRow, MessageButton } = require("discord.js");
const lodash = require('lodash');
module.exports = {
    name: "pl-removetrack",
    category: "playlists",
    aliases: ["playlist-removetrack"],
    description: "Removes a specific song from your playlist!",
    wl : true,
  
    execute: async (message, args, client, prefix) => {
          
       
    let ok = client.emoji.ok;
    let no = client.emoji.no;
    
    
    const Name = args[0];
    const data = await playlistremove.findOne({ UserId: message.author.id, PlaylistName: Name });
    if (!data) {
      return message.reply({
        embeds: [
          new MessageEmbed()
            .setColor(client.embedColor)
            .setAuthor(`Alex Music`, message.author.displayAvatarURL())
            .setDescription(`${no} You don't have a playlist with **${Name}** name`),
        ],
      });
    }
    if (data.length == 0) {
      return message.reply({
        embeds: [
          new MessageEmbed()
            .setColor(client.embedColor)
            .setAuthor(`Alex Music`, message.author.displayAvatarURL())
            .setDescription(`${no} You don't have a playlist with **${Name}** name`),
        ],
      });
    }
    const Options = args[1];
    if (!Options || isNaN(Options)) {
      return message.reply({
        embeds: [
          new MessageEmbed()
            .setColor(client.embedColor)
            .setAuthor(`Alex Music`, message.author.displayAvatarURL())
            .setDescription(
              ` ${no} You didn't entered track number (the Track you want to remove (ID OF IT))\nSee all your Tracks: ${prefix}info ${Name}`,
            ),
        ],
      });
    }
    let tracks = data.Playlist;
    if (Number(Options) >= tracks.length || Number(Options) < 0) {
      return message.reply({
        embeds: [
          new MessageEmbed()
          .setAuthor(`Alex Music`, message.author.displayAvatarURL())
            .setColor(client.embedColor)
            .setDescription(
              `${no} Your provided track number is out of Range (\`0\` - ${
                tracks.length - 1
              })\nSee all your Tracks: \`${prefix}info\` showdetails ${Name}`,
            ),
        ],
      });
    }
    await playlistremove.updateOne(
      {
        UserId: message.author.id,
        PlaylistName: Name,
      },
      {
        $pull: {
          Playlist: data.Playlist[Options],
        },
      },
    );
    const embed = new MessageEmbed()
      .setColor(client.embedColor)
      .setAuthor(`Alex Music`, message.author.displayAvatarURL())
      .setDescription(` ${ok} Removed \`${tracks[Options].title}\` from \`${Name}\``);
    return message.channel.send({ embeds: [embed] });
  }
}
