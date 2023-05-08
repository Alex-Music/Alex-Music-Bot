const { MessageEmbed, MessageActionRow, MessageButton } = require("discord.js");
const twentyfourseven = require("../../schema/twentyfourseven")

module.exports = {
  name: "autoplay",
  category: "settings",
  description: "Toggles autoplay mode",
  owner: false,
  votelock:true,
  djonly : true,
  wl : true,
  execute: async (message, args, client, prefix) => {  
    let ok = client.emoji.ok;
    let no = client.emoji.no;
    

    
    //
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
       const botchannel = message.guild.me.voice.channel;
       const player = client.manager.players.get(message.guild.id);
       if(!player || !botchannel || !player.queue.current) {
                       const noperms = new MessageEmbed()
 
            .setColor(client.embedColor)
            .setDescription(`${no} There is nothing playing in this server.`)
           return await message.channel.send({embeds: [noperms]});
       }
       if(player && channel.id !== player.voiceChannel) {
                                   const noperms = new MessageEmbed()
              .setColor(client.embedColor)
           .setDescription(`${no} You must be connected to the same voice channel as me.`)
           return await message.channel.send({embeds: [noperms]});
       }
         
     
       const autoplay = player.get("autoplay");
       if (autoplay === false) {
         const identifier = player.queue.current.identifier;
         player.set("autoplay", true);
         player.set("requester", message.member);
         player.set("identifier", identifier);
         const search = `https://www.youtube.com/watch?v=${identifier}&list=RD${identifier}`;
         res = await player.search(search, message.member);
         if (!res || res.loadType === 'LOAD_FAILED' || res.loadType !== 'PLAYLIST_LOADED') {
           let embed = new MessageEmbed()
           .setDescription(`Found nothing related for the latest song!`)
           .setColor(client.embedColor)
           try {
             client.channels.cache.get(player.textChannel).send({embeds: [embed]})
           } catch (e) {  }
         }
         player.queue.clear()
         player.queue.add(res.tracks[2])
         let thing = new MessageEmbed()
         .setColor(client.embedColor)
             .setDescription(`${ok} Starting to play recommended tracks.`)
             return await message.channel.send({embeds: [thing]});
     } else {
         player.set("autoplay", false);
         player.queue.clear();
         let thing = new MessageEmbed()
         .setColor(client.embedColor)
             .setDescription(`${ok} I have stopped to play recommended tracks.`)
            
             return await message.channel.send({embeds: [thing]});
         
     }
 
      
        }
}