const playPlaylist= require(`../../schema/playlists.js`)
const { MessageEmbed, MessageActionRow, MessageButton } = require("discord.js");
module.exports = {
    name: "pl-load",
    category: "playlists",
    aliases: ["playlist-load"],
    description: "Creates a playlist for you!",
    wl : true,
  
    execute: async (message, args, client, prefix) => {
          
       
    let ok = client.emoji.ok;
    let no = client.emoji.no;
    


        const Name = args[0];
    
    const data = await playPlaylist.findOne({ UserId: message.author.id, PlaylistName: Name });

    let name = Name;

    if (!data) {
      return message.reply({
        embeds: [
          new MessageEmbed()
            .setColor(client.embedColor)
            .setDescription(
              `Playlist not found. Please enter the correct playlist name\n\nDo ${prefix}list To see your Playlist`,
            ),
        ],
      });
    }
    const player = await client.manager.create({
        guild: message.guildId,
        textChannel: message.channelId,
        voiceChannel: message.member.voice.channelId,
        selfDeafen: true,
    });
    const { channel } = message.member.voice;
    if (!channel) {
                    const noperms = new MessageEmbed()
              
         .setColor(client.embedColor)
         .setAuthor(`Alex Music`, message.author.displayAvatarURL())
           .setDescription(`${no} You must be connected to a voice channel to use this command.`)
        return await message.channel.send({embeds: [noperms]});
    }
    if(message.member.voice.selfDeaf) {	
      let thing = new MessageEmbed()
       .setColor(client.embedColor)
       .setAuthor(`Alex Music`, message.author.displayAvatarURL())
     .setDescription(`${no} <@${message.member.id}> You cannot run this command while deafened.`)
       return await message.channel.send({embeds: [thing]});
     }

     const botchannel = message.guild.me.voice.channel;
     if(player && channel.id !== player.voiceChannel) {
       const noperms = new MessageEmbed()
           .setColor(client.embedColor)
           .setAuthor(`Alex Music`, message.author.displayAvatarURL())
.setDescription(`${no} You must be connected to ${botchannel}`)
 return await message.channel.send({embeds: [noperms]});
 }

    if (!player) return;
    let count = 0;
    const m = await message.reply({
      embeds: [
        new MessageEmbed()
          .setColor(client.embedColor)
          .setAuthor(`Alex Music`, message.author.displayAvatarURL())
          .setDescription(` ${ok} Attempting to load songs from  \`${data.PlaylistName}\` track(s) from your playlist **${name}** to the queue.`),
      ],
    });
    for (const track of data.Playlist) {
        const s =  await player.search(track.uri ? track.uri : track.title, message.author);
        if (s.loadType === `${no} LOAD_FAILED`) {
          if (player && !player.queue.current) player.destroy();
          return await message.channel.send({
            content: `${no} Error while Loading track.`
          }).catch(() => {});
      } else if (s.loadType === "NO_MATCHES") {
          if (player && !player.queue.current) player.destroy();
          return await message.channel.send({
            content: `${no} No results found, try to be specific as possible.`
          }).catch(() => {});
      } else if (s.loadType === "NO_MATCHES") {
          if (player && !player.queue.current) player.destroy();
          return await message.channel.send({
            content: `${no} No results found, try to be specific as possible.`
          }).catch(() => {});
      } else if (s.loadType === "TRACK_LOADED") {
          if (player && player.state !== "CONNECTED") player.connect();
          if (player) player.queue.add(s.tracks[0]);
          if (player && player.state === "CONNECTED" && !player.playing && !player.paused && !player.queue.size) player.play();
      } else if (s.loadType === "PLAYLIST_LOADED") {
          if (player && player.state !== "CONNECTED") player.connect();
          if (player) player.queue.add(s.tracks);
          if (player && player.state === "CONNECTED" && !player.playing && !player.paused && player.queue.totalSize === s.tracks.length) player.play();
      }
    }
    if (m)
      return await m.edit({
        embeds: [
          new MessageEmbed()
            .setColor(client.embedColor)
            .setAuthor(`Alex Music`, message.author.displayAvatarURL())
            .setDescription(`${ok} Loaded \`${name}\` playlist.`),
        ],
      });
  }
   
  
}

