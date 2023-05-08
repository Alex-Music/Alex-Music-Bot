const { MessageEmbed, MessageActionRow, MessageButton } = require('discord.js');

module.exports = {
  name: 'volume',
  category: 'music',
  aliases: ["vo","vol","volum"],
  description: 'plays some high quality music for you',
  owner: false,
  votelock:true,
  wl : true,
  execute: async (message, args, client, prefix) => {
      
    let ok = client.emoji.ok;
    let no = client.emoji.no;
    
   
    const volume = args.join(" ")
   //
   const djSchema = require('../../schema/djroleSchema')
   let djdata = await djSchema.findOne({
       guildID: message.guild.id,
   })
       if(djdata && !message.member.roles.cache.has(djdata.Roleid)) {

     const embed = new MessageEmbed()
          .setColor(client.embedColor)
      .setDescription(`${no} This command requires you to have <@&${djdata.Roleid}>.`)
          return await message.channel.send({embeds: [embed]});
    }
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
		
      if (!volume < 0 || volume > 100) { 
          let ething = new MessageEmbed()
      
          .setColor("RED")
          .setDescription(`${ok} Please use a number between \`0\` - \`100\``)
          return await message.channel.send({ embeds: [ething] });
      }
      player.setVolume(volume);
  
    let thing = new MessageEmbed()
      .setColor(client.embedColor)
      .setDescription(`${ok} The volume has been changed to **${volume}%**`)
    return await message.channel.send({ embeds: [thing] });
     
       }
}