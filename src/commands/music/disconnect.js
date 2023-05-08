const { MessageEmbed, MessageActionRow, MessageButton } = require('discord.js');

module.exports = {
  name: 'disconnect',
  category: 'music',
  aliases: ["dc","leave","leavevc","mingey"],
  description: 'leaves the voice channel',
  owner: false,
  djonly : true,
  wl : true,
  execute: async (message, args, client, prefix) => {
     
    let ok = client.emoji.ok;
    let no = client.emoji.no;
    
    const { channel } = message.member.voice;
    //
  
    //
  if (!channel) {
                  const noperms = new MessageEmbed()

       .setColor(client.embedColor)
         .setDescription(`${no} You must be connected to a voice channel to use this command.`)
      return await message.channel.send({embeds: [noperms]});
  }
  if(message.member.voice.selfDeaf) {	
    let thing = new MessageEmbed()
     .setColor(client.embedColor)
  
   .setDescription(` ${no} You cannot run this command while deafened.`)
     return await message.channel.send({embeds: [thing]});
   }
  const botchannel = message.guild.me.voice.channel;
  const player = client.manager.players.get(message.guild.id);
 
      player.destroy();
      try{
        player.get(`playingsongmsg`).delete()
        }catch(e) {}

      let thing = new MessageEmbed()
      .setColor(client.embedColor)
      .setDescription(`${ok} Destroyed the player and left ${botchannel}`)
      return message.channel.send({ embeds: [thing] });
      
      }
}