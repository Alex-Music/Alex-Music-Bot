const { MessageEmbed, MessageActionRow, MessageButton } = require('discord.js');

module.exports = {
  name: 'addprevious',
  category: 'music',
  aliases: ["previ"],
  description: 'adds the previous song to the queue',
  owner: false,
  votelock:true,
  wl : true,
  execute: async (message, args, client, prefix) => {
   
    let ok = client.emoji.ok;
    let no = client.emoji.no;

    if (!message.replied) await message.channel.send().catch(() => {});
    const { channel } = message.member.voice;
    if (!channel) {
                    const noperms = new MessageEmbed()
              
         .setColor(client.embedColor)
           .setDescription(`${no} You must be connected to a voice channel to use this command.`)
        return await message.channel.send({embeds: [noperms]});
    }
    if(message.member.voice.selfDeaf) {	
      let thing = new MessageEmbed()
       .setColor(client.embedColor)

     .setDescription(`${no} <@${message.member.id}> You cannot run this command while deafened.`)
       return await message.channel.send({embeds: [thing]});
     }

  let player = client.manager.get(message.guildId);
  if(player && channel.id !== player.voiceChannel) {
    const noperms = new MessageEmbed()
        .setColor(client.embedColor)
.setDescription(`${no} You must be connected to the same voice channel as me.`)
return await message.channel.send({embeds: [noperms]});
}

  if (!player) player = client.manager.create({
    guild: message.guildId,
    textChannel: message.channelId,
    voiceChannel: message.member.voice.channelId,
    selfDeafen: true,
  });


  if (!player.queue.previous) {
      const noperms = new MessageEmbed()

      .setColor(client.embedColor)
.setDescription(`No previous songs found`)
return await message.channel.send({embeds: [noperms]});
}

  const s = await player.search(player.queue.previous.uri, message.user);
  if (s.loadType === "LOAD_FAILED") {
    if (player && !player.queue.current) player.destroy();
    return await message.channel.send({
      content: `${no} Error while Loading track.`
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
    return await message.channel.send({
      embeds: [new MessageEmbed() .setColor(client.embedColor)
        .setDescription(`Queued [${s.tracks[0].title}](https://www.youtube.com/watch?v=dQw4w9WgXcQ) `)]
    }).catch(() => {});
  } else if (s.loadType === "PLAYLIST_LOADED") {
    if (player && player.state !== "CONNECTED") player.connect();
    if (player) player.queue.add(s.tracks);
    if (player && player.state === "CONNECTED" && !player.playing && !player.paused && player.queue.totalSize === s.tracks.length) player.play();

    return await message.channel.send({
      embeds: [new MessageEmbed().setColor(client.embedColor)
      .setDescription(`Queued **${s.tracks.length}** tracks from **${s.playlist.name}**`)]
    }).catch(() => {})
  } else if (s.loadType === "SEARCH_RESULT") {
    if (player && player.state !== "CONNECTED") player.connect();
    if (player) player.queue.add(s.tracks[0]);
    if (player && player.state === "CONNECTED" && !player.playing && !player.paused && !player.queue.size) player.play();
    return await message.channel.send({
      embeds: [new MessageEmbed().setColor(client.embedColor)
        .setDescription(`Queued [${s.tracks[0].title}](https://www.youtube.com/watch?v=dQw4w9WgXcQ) `)]
    }).catch(() => {});
  } else return await message.channel.send({
    content: `${no} No results found, try to be specific as possible.`
  }).catch(() => {});
}
   
}