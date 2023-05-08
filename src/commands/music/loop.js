const { MessageEmbed, MessageActionRow, MessageButton } = require('discord.js');

module.exports = {
  name: 'loop',
  category: 'music',
  aliases: [],
  description: 'enables / disables the track loop or queue loop',
  owner: false,
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
       const validoptions = ["song","queue","disable"];
    if(!validoptions.includes(args[0])) {
        const noperms = new MessageEmbed()
         .setColor(client.embedColor)
         .setDescription(`${no} **Please specify a loop method\n 
         Ex: \`loop queue\` , \`loop song\`,\`loop disable\`**`)
         return message.channel.send({embeds: [noperms]});
    
       }
      
    
         else
     
       if (['track', 'song'].includes(args[0])) {
     player.setTrackRepeat(!player.trackRepeat);
     const trackRepeat = player.trackRepeat ? "enabled" : "disabled";
     let thing = new MessageEmbed()
     .setColor(message.client.embedColor)   
     .setDescription(`${ok} Looping the track is now \`${trackRepeat}\``)
     return await message.channel.send({embeds: [thing]});
 
 }
 else
 if (['q', 'queue'].includes(args[0])) {
     player.setQueueRepeat(!player.queueRepeat);
     const queueRepeat = player.queueRepeat ? "enabled" : "disabled";
     let thing = new MessageEmbed()
     .setColor(message.client.embedColor)
     .setDescription(`${ok} Looping the queue is now \`${queueRepeat}\``)
     return await message.channel.send({embeds: [thing]});
 
 }
 else
 if (['stop', 'disable'].includes(args[0])) {
     player.setQueueRepeat(false);
     player.setTrackRepeat(false);
     let thing = new MessageEmbed()
     .setColor(message.client.embedColor)
     .setDescription(`${ok} Disabled all looping options.`)
     return await message.channel.send({embeds: [thing]});
 
 }
        }
}