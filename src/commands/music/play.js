const { MessageEmbed, MessageActionRow, MessageButton } = require('discord.js');
const track = require('../../schema/trackinfoSchema.js')
const spotify = require("@ksolo/spotify-search");
const clientID = "Spotify_ClientId";
const secretKey = "Spotify_Secret";
 spotify.setCredentials(clientID, secretKey);
 const fetch = require('isomorphic-unfetch');

const { getData, getPreview, getTracks, getDetails } = require('spotify-url-info')(fetch)

module.exports = {
  name: 'play',
  category: 'music',
  aliases: ["p","pla","baja","padu","patapettu"],
  description: 'plays some high quality music for you',
  owner: false,
  wl : true,
  execute: async (message, args, client, prefix) => {
     
 
    const query = args.join("  ")
    if (!query) return await message.channel.send({  embeds: [new MessageEmbed().setColor(client.embedColor)                     
      .setDescription("Please provide a search input to search.")]
      }).catch(() => {});
      const { channel } = message.member.voice;
      if (!channel) {
                      const noperms = new MessageEmbed()
                
           .setColor('#0xff0000')
           .setDescription(`You must be connected to a voice channel to use this command.`)
          return await message.reply({embeds: [noperms]});
      }
      if(message.member.voice.selfDeaf) {	
        let thing = new MessageEmbed()
         .setColor('#0xff0000')

       .setDescription(`You cannot run this command while deafened.`)
         return await message.reply({embeds: [thing]});
       }

    let player = client.manager.get(message.guildId);
    if(player && channel.id !== player.voiceChannel) {
      const noperms = new MessageEmbed()
          .setColor('#0xff0000')
.setDescription(`You must be connected to the same voice channel as me.`)
return await message.reply({embeds: [noperms]});
}



if(query.toLowerCase().includes("youtube.com")){
  const noperms = new MessageEmbed()
  .setColor('#0xff0000')
  .setAuthor('YouTube URL', client.user.displayAvatarURL({ dynamic: true}))
  .setDescription(`We no longer support YouTube, please use other platforms like Spotify, SoundCloud or Bandcamp. Otherwise use a search query to use our default system.`)
  return await message.channel.send({embeds: [noperms]});
}
if(query.toLowerCase().includes("youtu.be")){
  const noperms = new MessageEmbed()
  .setColor('#0xff0000')
  .setAuthor('YouTube URL', client.user.displayAvatarURL({ dynamic: true}))
  .setDescription(`We no longer support YouTube, please use other platforms like Spotify, SoundCloud or Bandcamp. Otherwise use a search query to use our default system.`)
  return await message.channel.send({embeds: [noperms]});
}
    if (!player) player = client.manager.create({
      guild: message.guildId,
      textChannel: message.channelId,
      voiceChannel: message.member.voice.channelId,
      selfDeafen: true,
    });
//link
if (query.startsWith('https://soundcloud.com/')) {
  const s = await player.search({
    query: query,
  source : 'youtube'
  }, message.member.user);
  if (s.loadType === "LOAD_FAILED") {
    if (player && !player.queue.current) player.destroy();
    return await message.channel.send({
      content: `Error while Loading track.`
    }).catch(() => {});
  } else if (s.loadType === "NO_MATCHES") {
    if (player && !player.queue.current) player.destroy();
    return await message.channel.send({
      content: `No results found, try to be specific as possible.`
    }).catch(() => {});
  } else if (s.loadType === "TRACK_LOADED") {
    if (player && player.state !== "CONNECTED") player.connect();
    if (player) player.queue.add(s.tracks[0]);
    if (player && player.state === "CONNECTED" && !player.playing && !player.paused && !player.queue.size) player.play();
    return await message.channel.send({
      embeds: [new MessageEmbed() .setColor(client.embedColor)
        .setDescription(`Queued ${s.tracks[0].title} [\`${s.tracks[0].requester.tag}\`]`)]
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
        .setDescription(`Queued ${s.tracks[0].title} [\`${s.tracks[0].requester.tag}\`]`)]
    }).catch(() => {});
  } else return await message.channel.send({
    content: `No results found, try to be specific as possible.`
  }).catch(() => {});

}
if (query.includes('bandcamp.com')) {
  const s = await player.search({
    query: query,
  }, message.member.user);
  if (s.loadType === "LOAD_FAILED") {
    if (player && !player.queue.current) player.destroy();
    return await message.channel.send({
      content: `Error while Loading track.`
    }).catch(() => {});
  } else if (s.loadType === "NO_MATCHES") {
    if (player && !player.queue.current) player.destroy();
    return await message.channel.send({
      content: `No results found, try to be specific as possible.`
    }).catch(() => {});
  } else if (s.loadType === "TRACK_LOADED") {
    if (player && player.state !== "CONNECTED") player.connect();
    if (player) player.queue.add(s.tracks[0]);
    if (player && player.state === "CONNECTED" && !player.playing && !player.paused && !player.queue.size) player.play();
    return await message.channel.send({
      embeds: [new MessageEmbed() .setColor(client.embedColor)
        .setDescription(`Queued ${s.tracks[0].title} [\`${s.tracks[0].requester.tag}\`]`)]
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
        .setDescription(`Queued ${s.tracks[0].title} [\`${s.tracks[0].requester.tag}\`]`)]
    }).catch(() => {});
  } else return await message.channel.send({
    content: `No results found, try to be specific as possible.`
  }).catch(() => {});

}
if (query.startsWith('https://soundcloud.com/')) {
  const s = await player.search({
    query: query,
  source : 'youtube'
  }, message.member.user);
  if (s.loadType === "LOAD_FAILED") {
    if (player && !player.queue.current) player.destroy();
    return await message.channel.send({
      content: `Error while Loading track.`
    }).catch(() => {});
  } else if (s.loadType === "NO_MATCHES") {
    if (player && !player.queue.current) player.destroy();
    return await message.channel.send({
      content: `No results found, try to be specific as possible.`
    }).catch(() => {});
  } else if (s.loadType === "TRACK_LOADED") {
    if (player && player.state !== "CONNECTED") player.connect();
    if (player) player.queue.add(s.tracks[0]);
    if (player && player.state === "CONNECTED" && !player.playing && !player.paused && !player.queue.size) player.play();
    return await message.channel.send({
      embeds: [new MessageEmbed() .setColor(client.embedColor)
        .setDescription(`Queued ${s.tracks[0].title} [\`${s.tracks[0].requester.tag}\`]`)]
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
        .setDescription(`Queued ${s.tracks[0].title} [\`${s.tracks[0].requester.tag}\`]`)]
    }).catch(() => {});
  } else return await message.channel.send({
    content: `No results found, try to be specific as possible.`
  }).catch(() => {});

}

    if (query.startsWith('https://open.spotify.com/track/')) {
    await  getPreview(`${query}`, {
            headers: {       
              'user-agent': 'googlebot'
            }
          }).then(async data => { 
            try{
            const infosearch = `${data.artist} - ${data.title}`
      
         
      
           const { Spotify } = require("spotify-info.js");
           const infos = new Spotify({
           clientID: clientID,
           clientSecret: secretKey,
           });
           await infos.searchArtist(data.artist).then(async nameinfo => { 
             
     
                      
           
            await   message.channel.send({
             embeds: [new MessageEmbed() .setColor(client.embedColor)
               .setDescription(`Queued [${data.title}](${data.link}) by [${data.artist}](${nameinfo[0].external_urls.spotify}) [\`${message.member.user.tag}\`]`)]
           }).catch(() => {});
           const s = await player.search({
             query: infosearch,
             source: [`youtube`]
           }, message.member);
           if (s.loadType === "LOAD_FAILED") {
             if (player && !player.queue.current) player.destroy();
             return await message.channel.send({
               content: `I ran into an error while playing this track if this continues contact us.`
             }).catch(() => {});
           } else if (s.loadType === "NO_MATCHES") {
             if (player && !player.queue.current) player.destroy();
             return await message.channel.send({
               content: `I ran into an error while playing this track if this continues contact us.`
             }).catch(() => {});
           } else if (s.loadType === "TRACK_LOADED") {
       
           let newData = await new track({
                      Soundcloudtracklink: s.tracks[0].uri,
                      Spotifytracklink: data.link,
                      Spotifytracktitle: data.title,
                      Artistlink: nameinfo[0].external_urls.spotify,
                      Artistname: data.artist,
                   })
                   newData.save();
           
       
             if (player && player.state !== "CONNECTED") player.connect();
             if (player) player.queue.add(s5.tracks[0]);
             if (player && player.state === "CONNECTED" && !player.playing && !player.paused && !player.queue.size) player.play();
          return;
           } else if (s.loadType === "SEARCH_RESULT") {
       
           let newData = await new track({
            Soundcloudtracklink: s.tracks[0].uri,
            Spotifytracklink: data.link,
            Spotifytracktitle: data.title,
            Artistlink: nameinfo[0].external_urls.spotify,
            Artistname: data.artist,
                   })
                   newData.save();
           
             if (player && player.state !== "CONNECTED") player.connect();
             if (player) player.queue.add(s.tracks[0]);
             if (player && player.state === "CONNECTED" && !player.playing && !player.paused && !player.queue.size) player.play();
             return;
           } else return await message.channel.send({
             content: `I ran into an error while playing this track if this continues contact us.`
           }).catch(() => {});
          })
        }catch(error){
          console.log(error)
          return await message.channel.send({
            content: `I ran into an error while playing this track if this continues contact us.`
          }).catch(() => {});
        }
        
    })
  
    return;
  }
  //link


  //playlist

  if (query.startsWith('https://open.spotify.com/playlist/')) {
    try{
    const tracks = await getTracks(query)
    var thing = new MessageEmbed()
    .setColor(client.embedColor)
    .setDescription(`Importing \`${tracks.length}\` items from spotify this may take a second.`)
 let msg =   await   message.channel.send({ embeds : [thing]})
 if (player && player.state !== "CONNECTED") player.connect();
tracks.map(async strack => { 
    const searchinfo = `${strack.artists[0].name} - ${strack.name}`

      const s = await player.search({
        query: searchinfo,
      source : 'youtube'
      }, message.member);
   
        const { Spotify } = require("spotify-info.js");
const infos = new Spotify({
clientID: clientID,
clientSecret: secretKey,
});
await infos.searchArtist(strack.artist).then(async nameinfo => { 
             await   player.queue.add(s.tracks[0]);
                let newData = await new track({
                  Soundcloudtracklink: s.tracks[0].uri,
                  Spotifytracklink: strack.external_urls.spotify,
                  Spotifytracktitle: strack.name,
                  Artistlink: nameinfo[0].external_urls.spotify,
                  Artistname: strack.artists[0].name,
               })
               newData.save();
           
})
  

})
var ething = new MessageEmbed()
.setColor(client.embedColor)
.setDescription(`Imported \`${tracks.length}\` items from spotify.\n\n Note : if any songs from the playlist didnt added in the queue its because that song is not available in our default streaming platform!`)
await msg.reply({embeds : [ething]})

if(!player.queue || !player.queue.current) {
  setTimeout(async () => {
      player.play()
  }, 2000);
}}catch(error){
  return await message.channel.send({
    content: `I ran into an error while playing this track if this continues contact us.`
  }).catch((error) => {
    console.log(error)
  });
}
return;
    }


  //playlist
    await spotify
    .search(query).then(async sres =>   {
      try{
        sres.tracks.items[0].name
      }catch{
        return await message.channel.send({
          content: `No results found, try to be specific as possible.`
        }).catch(() => {});
      }
    if(sres.tracks.items > 1){
      return await message.channel.send({
        content: `No results found, try to be specific as possible.`
      }).catch(() => {});
    }

     await   message.channel.send({
      embeds: [new MessageEmbed() .setColor(client.embedColor)
        .setDescription(`Queued [${sres.tracks.items[0].name}](${sres.tracks.items[0].external_urls.spotify}) by [${sres.tracks.items[0].artists[0].name}](${sres.tracks.items[0].artists[0].external_urls.spotify}) [\`${message.member.user.tag}\`]`)]
    }).catch(() => {});
        const info = `${sres.tracks.items[0].artists[0].name} - ${sres.tracks.items[0].name}`
    const s = await player.search({
      query: info,
    source : 'youtube'
    }, message.member);
    if (s.loadType === "LOAD_FAILED") {
      if (player && !player.queue.current) player.destroy();
      return await message.channel.send({
        content: `I ran into an error while playing this track if this continues contact us.`
      }).catch(() => {});
    } else if (s.loadType === "NO_MATCHES") {
      if (player && !player.queue.current) player.destroy();
      return await message.channel.send({
        content: `I ran into an error while playing this track if this continues contact us.`
      }).catch(() => {});
    } else if (s.loadType === "TRACK_LOADED") {

    let newData = await new track({
               Soundcloudtracklink: s.tracks[0].uri,
               Spotifytracklink: sres.tracks.items[0].external_urls.spotify,
               Spotifytracktitle: sres.tracks.items[0].name,
               Artistlink: sres.tracks.items[0].artists[0].external_urls.spotify,
               Artistname: sres.tracks.items[0].artists[0].name,
            })
            newData.save();
    

      if (player && player.state !== "CONNECTED") player.connect();
      if (player) player.queue.add(s5.tracks[0]);
      if (player && player.state === "CONNECTED" && !player.playing && !player.paused && !player.queue.size) player.play();
   return;
    } else if (s.loadType === "SEARCH_RESULT") {

    let newData = await new track({
               Soundcloudtracklink: s.tracks[0].uri,
               Spotifytracklink: sres.tracks.items[0].external_urls.spotify,
               Spotifytracktitle: sres.tracks.items[0].name,
               Artistlink: sres.tracks.items[0].artists[0].external_urls.spotify,
               Artistname: sres.tracks.items[0].artists[0].name,
            })
            newData.save();
    
      if (player && player.state !== "CONNECTED") player.connect();
      if (player) player.queue.add(s.tracks[0]);
      if (player && player.state === "CONNECTED" && !player.playing && !player.paused && !player.queue.size) player.play();
      return;
    } else return await message.channel.send({
      content: `I ran into an error while playing this track if this continues contact us.`
    }).catch(() => {});
  })
  }
}