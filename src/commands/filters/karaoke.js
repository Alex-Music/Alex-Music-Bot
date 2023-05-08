const { MessageEmbed, MessageActionRow, MessageButton } = require("discord.js");


module.exports = {
  name: "karaoke",
  category: "filters",
  description: "Enables or disables the karaoke filter.",
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
      
        if(!player.karaoke === true){
            player.karaoke = true;
            const noperms = new MessageEmbed()
       .setColor(client.embedColor)
            .setDescription(`${ok} Karaoke has been \`enabled\`.- <@${message.member.id}>`)
         
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
        }    else {
    
        if(player.karaoke === true){
            player.karaoke = false;
            const noperms = new MessageEmbed()
       .setColor(client.embedColor)
            .setDescription(`${ok} Karaoke has been \`disabled\`.- <@${message.member.id}>`)
          
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
       
