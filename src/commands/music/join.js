const { MessageEmbed, Message } = require("discord.js");
const { now } = require("mongoose");
const { convertTime } = require('../../utils/convert.js');
const { progressbar } = require('../../utils/progressbar.js')
module.exports = {
  name: 'join',
  category: 'music',
  aliases: ["vcdha","vcra","j"],
  description: 'grabs and send the current playing song data to your personal dms',
  owner: false,
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
    if(message.member.voice.selfDeaf) {	
      let thing = new MessageEmbed()
       .setColor(client.embedColor)
     .setDescription(`${no} <@${message.member.id}> You cannot run this command while deafened.`)
       return await message.channel.send({embeds: [thing]});
     }


     const player = client.manager.players.get(message.guild.id);
     if(!player) {
         
         const player = message.client.manager.create({
             guild: message.guild.id,
             voiceChannel: channel.id,
             textChannel: message.channel.id,
             selfDeafen: true,
         });

         player.connect();

         let thing = new MessageEmbed()
             .setColor(client.embedColor)
                         .setDescription(`${ok} Connected to \`${channel.name}\``)
                         return await message.channel.send({embeds: [thing]});

     } else if (message.guild.me.voice.channel !== channel) {

         let thing = new MessageEmbed()
 
               .setColor(client.embedColor)
             .setDescription(`${no} You must be in the same channel as me.`);
             return await message.channel.send({embeds: [thing]});
     }
     
     else if(player){
         const noperms = new MessageEmbed()
   
         .setColor(client.embedColor)
         .setDescription(`${no} I am already connected to a voice channel.`)
         return await message.channel.send({embeds: [noperms]});
     }

  }
}