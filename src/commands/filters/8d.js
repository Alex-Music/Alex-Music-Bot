const { MessageEmbed, MessageActionRow, MessageButton } = require("discord.js");


module.exports = {
  name: "8d",
  category: "filters",
  description: "Enables or disables the 8d",
  args: false,
  usage: "",
  djonly : true,
  votelock:true,
  wl : true,

  execute: async (message, args, client, prefix) => {

   let ok = client.emoji.ok;
   let no = client.emoji.no;
     // This command requires you to have <@&${djdata.Roleid}> or the \`MANAGE_MESSAGES\` permission.
    
   
       
   const { channel } = message.member.voice;
   if (!channel) {
                   const noperms = new MessageEmbed()

        .setColor(client.embedColor)
        .setDescription(`${no} <@${message.member.id}> You must be connected to a voice channel to use this command.`)
       return await message.channel.send({embeds: [noperms], ephemeral: true});
       
   }
   if(message.member.voice.selfDeaf) {	
     let thing = new MessageEmbed()
      .setColor(client.embedColor)
    .setDescription(`${no} <@${message.member.id}> You cannot run this command while deafened.`)
      return await message.channel.send({embeds: [thing], ephemeral: true});
    }
   const botchannel = message.guild.me.voice.channel;
   const player = client.manager.players.get(message.guild.id);
   if(!player || !botchannel || !player.queue.current) {
                   const noperms = new MessageEmbed()
        .setColor(client.embedColor)
        .setDescription(`${no} There is nothing playing in this server.`)
       return await message.channel.send({embeds: [noperms], ephemeral: true});
   }
   if(player && channel.id !== player.voiceChannel) {
                               const noperms = new MessageEmbed()
      .setColor(client.embedColor)
        .setDescription(`${no} You must be connected to the same voice channel as me.`)
       return await message.channel.send({embeds: [noperms], ephemeral: true});
   }
       //
       if(!player.eightD === true){
           player.eightD = true;
     const noperms = new MessageEmbed()
     .setColor(client.embedColor)
           .setDescription(`${ok} 8D has been \`enabled\`.- <@${message.member.id}>`)
     message.channel.send({embeds: [noperms]}).then(responce => {
       setTimeout(() => {
           try {
               responce.delete().catch(() => {
                   return
               })
           } catch(err) {
               return
           }
       }, 30000)
   });
       }  else{
          if(player.eightD === true){
           player.eightD = false;
           const noperms = new MessageEmbed()
      .setColor(client.embedColor)
           .setDescription(`${ok} 8D has been \`disabled\`.- <@${message.member.id}>`)
       
     message.channel.send({embeds: [noperms]}).then(responce => {
       setTimeout(() => {
           try {
               responce.delete().catch(() => {
                   return
               })
           } catch(err) {
               return
           }
       }, 30000)
   });
}
       }
  }
}
       
