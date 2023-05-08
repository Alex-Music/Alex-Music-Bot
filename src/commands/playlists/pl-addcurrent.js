const savePlaylist = require(`../../schema/playlists.js`)
const { MessageEmbed, MessageActionRow, MessageButton } = require("discord.js");
module.exports = {
    name: "pl-addcurrent",
    category: "playlists",
    aliases: ["playlist-addcurrent"],
    description: "Adds the current playing song to specified playlist!",
    wl : true,
  
    execute: async (message, args, client, prefix) => {
          
       
    let ok = client.emoji.ok;
    let no = client.emoji.no;
    let star = client.emoji.star;
    const { channel } = message.member.voice;
    const Name = args[0];
    const data = await savePlaylist.findOne({ UserId: message.author.id, PlaylistName: Name });
    const player = client.manager.players.get(message.guild.id);
    const mechannel = message.guild.me.voice.channel;

    if (!player.queue.current) {
      let thing = new MessageEmbed().setColor(client.embedColor).setDescription(`There is nothing playing in this server.`)  .setAuthor(`Alex Music`, message.author.displayAvatarURL());
      return message.reply({ embeds: [thing] });
    }
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
    if (mechannel && channel.id !== mechannel.id) {
      const wd = new MessageEmbed()
      .setColor(client.embedColor)
      .setAuthor(`Alex Music`, message.author.displayAvatarURL())
      .setDescription(`${no} You need to be in \`🔈 ${mechannel.name}\ to use this command`)
      return message.channel.send({embeds: [wd]});
    }
    if (data.length == 0) {
      return message.reply({
        embeds: [
          new MessageEmbed()
            .setColor(client.embedColor)
            .setAuthor(`Alex Music`, message.author.displayAvatarURL())
            .setDescription(`You don't have a playlist with **${Name}*. \n ${star} Please enter the correct playlist name`),
        ],
      });
    }

    const song = player.queue.current;
    let oldSong = data.Playlist;
    if (!Array.isArray(oldSong)) oldSong = [];
    oldSong.push({
      title: song.title,
      uri: song.uri,
      author: song.author,
      duration: song.length,
    });
    await savePlaylist.updateOne(
      {
        UserId: message.author.id,
        PlaylistName: Name,
      },
      {
        $push: {
          Playlist: {
            title: song.title,
            uri: song.uri,
            author: song.author,
            duration: song.length,
          },
        },
      },
    );
    const embed = new MessageEmbed()
    .setAuthor(`Alex Music`, message.author.displayAvatarURL())
      .setColor(client.embedColor)
      .setDescription(`${ok} Added ${song.title.substr(0, 256)} in \`${Name}\``);
    return message.channel.send({ embeds: [embed] });

  }
}
