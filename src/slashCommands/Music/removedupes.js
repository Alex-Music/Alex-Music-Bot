const { CommandInteraction, Client, MessageEmbed } = require("discord.js");

module.exports = {
    name: "removedupes",
    description: "removes all duplicated tracks in the queue.",
    owner: false,
    player: true,
    inVoiceChannel: true,
    sameVoiceChannel: true,
    votelock: true,
    djonly :true,
    wl : true,

    /**
     * @param {Client} client
     * @param {CommandInteraction} interaction
     */

    run: async (client, interaction, prefix ) => {
        await interaction.deferReply({
          ephemeral: false
        });
   //  
    let ok = client.emoji.ok;
    let no = client.emoji.no;
    
   
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
       return await interaction.followUp({ embeds : [new MessageEmbed().setDescription(`${ok} Removed all the duplicates songs from the queue.`)
      .setColor(client.embedColor)
]})
     
       }
     };