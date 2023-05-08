const { MessageEmbed, MessageActionRow, MessageButton } = require("discord.js");


module.exports = {
  name: "slowmo",
  category: "filters",
  description: "Enables or disables the slowmo filter.",
  args: false,
  usage: "",
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
       //
    
       const db = require('quick.db')
       const filted = await db.get(`slowmo_${message.guild.id}`)
if(!filted) {
 db.push(`slowmo_${message.guild.id}`, true)
 player.node.send({
   op: "filters",
   guildId: message.guild.id,
   equalizer: player.bands.map((gain, index) => {
     var Obj = {
       "band": 0,
       "gain": 0,
     };
     Obj.band = Number(index);
     Obj.gain = Number(gain)
     return Obj;
   }),
   timescale: {
     "speed": 0.5,
     "pitch": 1.0,
     "rate": 0.8
   },
 });
 player.set("filter", "⏱ Slowmode");
        const noperms = new MessageEmbed()
   .setColor(client.embedColor)
        .setDescription(`${ok} Slowmode has been \`enabled\`.- <@${message.member.id}>`)
       
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
     });;
       }else{
         db.delete(`slowmo_${message.guild.id}`)
         player.clearEQ();
         player.node.send({
           op: "filters",
           guildId: message.guild.id,
           equalizer: player.bands.map((gain, index) => {
             var Obj = {
               "band": 0,
               "gain": 0,
             };
             Obj.band = Number(index);
             Obj.gain = Number(gain)
             return Obj;
           }),
         });
         player.set("eq", "💣 None");
         player.set("filter", "💣 None");
         const noperms = new MessageEmbed()
    .setColor(client.embedColor)
         .setDescription(`${ok} Slowmode has been \`disabled\`.- <@${message.member.id}>`)
       
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
       });;
       }

   }
}
       
