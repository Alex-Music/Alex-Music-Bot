const { MessageEmbed } = require("discord.js");

module.exports = {
    name: "pop",
    category: "FILTERS",
    description: "Enables/disables the pop filter.",
    votelock: true,
    djonly : true,
    wl : true,
   /**
   * 
   * @param {Client} client 
   * @param {CommandInteraction} interaction 
   */

    run: async (client, interaction) => {
      await interaction.deferReply({
        ephemeral: true
      });
         
    let ok = client.emoji.ok;
    let no = client.emoji.no;
    
     //
    
        //
    const { channel } = interaction.member.voice;
    if (!channel) {
                    const noperms = new MessageEmbed()

         .setColor(client.embedColor)
           .setDescription(`${no} You must be connected to a voice channel to use this command.`)
        return await interaction.followUp({embeds: [noperms]});
    }
    if(interaction.member.voice.selfDeaf) {	
      let thing = new MessageEmbed()
       .setColor(client.embedColor)
     .setDescription(`${no} <@${message.member.id}> You cannot run this command while deafened.`)
       return await interaction.followUp({embeds: [thing]});
     }
    const botchannel = interaction.guild.me.voice.channel;
    const player = client.manager.players.get(interaction.guild.id);
    if(!player || !botchannel || !player.queue.current) {
                    const noperms = new MessageEmbed()
         .setColor(client.embedColor)
         .setDescription(`${no} There is nothing playing in this server.`)
        return await interaction.followUp({embeds: [noperms]});
    }
    if(player && channel.id !== player.voiceChannel) {
                                const noperms = new MessageEmbed()
       .setColor(client.embedColor)
        .setDescription(`${no} You must be connected to the same voice channel as me.`)
        return await interaction.followUp({embeds: [noperms]});
    }
        //
        if(!player.pop === true){
            player.pop = true;
                     const noperms = new MessageEmbed()
                .setColor(client.embedColor)
                     .setDescription(`${ok} Pop has been \`enabled\`. - <@!${interaction.member.id}>`)
                     const noperms1 = new MessageEmbed()
                     .setColor(client.embedColor)
                           .setDescription(`${ok} Applying the \`pop\` Filter (*It might take up to 5 seconds until you hear the Filter*)`)
      return await interaction.followUp({embeds: [noperms1]}),
      interaction.channel.send({embeds: [noperms]}).then(responce => {
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
       if(player.pop === true){
            player.pop = false;
                    const noperms = new MessageEmbed()
               .setColor(client.embedColor)
                    .setDescription(`${ok} Pop has been \`disabled\`. - <@!${interaction.member.id}>`)
                    const noperms1 = new MessageEmbed()
                    .setColor(client.embedColor)
                          .setDescription(`${ok} Removing the \`pop\` Filter(*It might take up to 5 seconds to remove the filter.*)`)
      return await interaction.followUp({embeds: [noperms1]}),
      interaction.channel.send({embeds: [noperms]}).then(responce => {
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

