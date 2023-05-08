const { MessageEmbed, MessageActionRow, MessageButton } = require('discord.js');

module.exports = {
  name: 'removedupes',
  category: 'music',
  aliases: ["removedp","removeduplicate","remdupe"],
  description: 'removes all duplicated tracks in the queue.',
  owner: false,
  votelock:true,
  wl : true,
  djonly : true,
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
         
 
       let tracks = player.queue;
       const newtracks = [];
       for (let i = 0; i < tracks.length; i++) {
         let exists = false; 
         for (j = 0; j < newtracks.length; j++) {
           if (tracks[i].uri === newtracks[j].uri) {
             exists = true;
             break;
           }
         }//removedupes
         if (!exists) {
           newtracks.push(tracks[i]);
         }
       }
       //clear the Queue
       player.queue.clear();
       //now add every not dupe song again
       for (const track of newtracks)
         player.queue.add(track);
       //Send Success Message
        return await message.channel.send({ embeds : [new MessageEmbed().setDescription(`${ok} Removed all the duplicates songs from the queue.`)
       .setColor(client.embedColor)
 ]})
      
        }
}