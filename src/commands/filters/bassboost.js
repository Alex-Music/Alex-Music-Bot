const { MessageEmbed, MessageActionRow, MessageButton } = require("discord.js");


module.exports = {
  name: "bassboost",
  category: "filters",
  description: "Enables or disables the bassboost filter.",
  args: false,
  usage: "",
  djonly : true,
  votelock:true,
  wl : true,
  execute: async (message, args, client, prefix) => {

    let ok = client.emoji.ok;
    let no = client.emoji.no;
   
     //
        //
    const { channel } = message.member.voice;
    if (!channel) {
                    const noperms = new MessageEmbed()

         .setColor(client.embedColor)
         .setDescription(`${no} You must be connected to a voice channel to use this command.`)
        return await message.channel.send({embeds: [noperms] , ephemeral: true}).then(responce => {
          setTimeout(() => {
              try {
                  responce.delete().catch(() => {
                      return
                  })
              } catch(err) {
                  return
              }
          }, 12000)
      });;
    }
    if(message.member.voice.selfDeaf) {	
      let thing = new MessageEmbed()
       .setColor(client.embedColor)
     .setDescription(`${no} <@${message.member.id}> You cannot run this command while deafened.`)
       return await message.channel.send({embeds: [thing], ephemeral: true}).then(responce => {
        setTimeout(() => {
            try {
                responce.delete().catch(() => {
                    return
                })
            } catch(err) {
                return
            }
        }, 12000)
    });;
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
        return await message.channel.send({embeds: [noperms], ephemeral: true})
    }
        //
        if(!player.bassboost === true){
            player.bassboost = true;
       const noperms = new MessageEmbed()
       .setColor(client.embedColor)
       .setDescription(`${ok} Bassboost has been \`enabled\`.- <@${message.member.id}>`)
      
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
        else {
           if(player.bassboost === true){
            player.bassboost = false;
      const noperms = new MessageEmbed()
      .setColor(client.embedColor)
      .setDescription(`${ok} Bassboost has been \`disabled\`.- <@${message.member.id}>`)
     
     
     message.channel.send({ content: "⠀",embeds: [noperms]}).then(responce => {
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
}
       
