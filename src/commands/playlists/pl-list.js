const playlistlist = require(`../../schema/playlists.js`)
const { MessageEmbed, MessageActionRow, MessageButton } = require("discord.js");
const lodash = require('lodash');
module.exports = {
    name: "pl-list",
    category: "playlists",
    aliases: ["playlist-list"],
    description: "Shows the list of your playlists!!",
    wl : true,
  
    execute: async (message, args, client, prefix) => {
          
       let time = client.emoji.time
    let ok = client.emoji.ok;
    let no = client.emoji.no;
    let star = client.emoji.star;
    let queue = client.emoji.songs;
    
    let data = await playlistlist.find({ UserId: message.author.id });
    if (!data.length) {
      return message.reply({
        embeds: [
          new MessageEmbed()
            .setColor(client.embedColor)
            .setDescription(`${no} You Do Not Have Any Playlists\n Create a playlist: \`${prefix}pl-create [playlist name]\``),
        ],
      });
    }
    if (!args[0]) {
      let list = data.map(
        (x, i) => `\`${++i}\` ${star}  \`${x.PlaylistName}\` ${queue}   \`${x.Playlist.length}\` ${time} Created on  :  <t:${x.CreatedOn}>`,
      );
      const pages = lodash.chunk(list, 10).map((x) => x.join('\n\n'));
      let page = 0;
      let List = list.length;

      const embeds = new MessageEmbed()
        .setAuthor(`${message.member.user.username} Playlists. `,message.author.displayAvatarURL())
        .setDescription(pages[page])
        .setFooter({ text: `Total playlists (${List}) you can only use 10 playlists` })
        .setColor(client.embedColor);
      return await message.channel.send({ embeds: [embeds] });
    }
  }
}
