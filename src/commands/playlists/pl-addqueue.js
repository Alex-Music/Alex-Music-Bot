const playlistqueue = require(`../../schema/playlists.js`)
const { MessageEmbed, MessageActionRow, MessageButton } = require("discord.js");
const lodash = require('lodash');
module.exports = {
    name: "pl-addqueue",
    category: "playlists",
    aliases: ["playlist-addqueue"],
    description: "Save the entire queue to your playlist!",
    wl : true,
  
    execute: async (message, args, client, prefix) => {
          
       
    let ok = client.emoji.ok;
    let no = client.emoji.no;
    const { channel } = message.member.voice;
    if (!channel) {
                    const noperms = new MessageEmbed()
              
         .setColor(client.embedColor)
           .setDescription(`${no} You must be connected to a voice channel to use this command.`)
        return await message.channel.send({embeds: [noperms]});
    }
    

    const player = client.manager.players.get(message.guild.id);
     const botchannel = message.guild.me.voice.channel;
     if(player && channel.id !== player.voiceChannel) {
       const noperms = new MessageEmbed()
           .setColor(client.embedColor)
.setDescription(`${no} You must be connected to ${botchannel}`)
 return await message.channel.send({embeds: [noperms]});
 }

    
    const Name = args[0];
    const mechannel = message.guild.me.voice.channel;
  
    if (!player.queue.current) {
      let thing = new MessageEmbed().setColor(client.embedColor).setDescription(`${no} There is no music playing.`);
      return message.reply({ embeds: [thing] });
    }
    const data = await playlistqueue.find({ UserId: message.author.id, PlaylistName: Name });
    if (!data) {
      return message.reply({
        embeds: [
          new MessageEmbed()
            .setColor(client.embedColor)
            .setDescription(`${no} Playlist not found. Please enter the correct playlist name`),
        ],
      });
    }
    if (mechannel && channel.id !== mechannel.id) {
      const wd = new MessageEmbed()
      .setAuthor(`Alex Music`, message.author.displayAvatarURL())
      .setColor(client.embedColor)
      .setDescription(`${no} You need to be in \`🔈 ${mechannel.name}\ to use this command`)
      return message.channel.send({embeds: [wd]});
    }
    if (data.length == 0) {
      return message.reply({
        embeds: [
          new MessageEmbed()
            .setColor(client.embedColor)
            .setAuthor(`Alex Music`, message.author.displayAvatarURL())
            .setDescription(`${no} Playlist not found. Please enter the correct playlist name`),
        ],
      });
    }
    const song = player.queue.current;
    const tracks = player.queue;

    let oldSong = data.Playlist;
    if (!Array.isArray(oldSong)) oldSong = [];
    const newSong = [];
    if (player.current) {
      newSong.push({
        title: song.title,
        uri: song.uri,
        author: song.author,
        duration: song.length,
      });
    }
    for (const track of tracks)
      newSong.push({
        title: track.title,
        uri: track.uri,
        author: track.author,
        duration: track.length,
      });
    const playlist = oldSong.concat(newSong);
    await playlistqueue.updateOne(
      {
        UserId: message.author.id,
        PlaylistName: Name,
      },
      {
        $set: {
          Playlist: playlist,
        },
      },
    );
    const embed = new MessageEmbed()
      .setDescription(`${ok} **Added** \`${playlist.length - oldSong.length}\`song in \`${Name}\``)
      .setAuthor(`Alex Music`, message.author.displayAvatarURL())
      .setColor(client.embedColor);
    return message.channel.send({ embeds: [embed] });
  }
}
