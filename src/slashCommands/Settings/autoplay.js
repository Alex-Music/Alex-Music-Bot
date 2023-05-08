const { CommandInteraction, Client, MessageEmbed } = require("discord.js");
;
module.exports = {
    name: "autoplay",
    description: "Toggle music autoplay.",
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
		
    
      const autoplay = player.get("autoplay");
      if (autoplay === false) {
        const identifier = player.queue.current.identifier;
        player.set("autoplay", true);
        player.set("requester", interaction.member);
        player.set("identifier", identifier);
        const search = `https://www.youtube.com/watch?v=${identifier}&list=RD${identifier}`;
        res = await player.search(search, interaction.member);
        if (!res || res.loadType === 'LOAD_FAILED' || res.loadType !== 'PLAYLIST_LOADED') {
          let embed = new MessageEmbed()
          .setDescription(`${no} Found nothing related for the latest song!`)
          .setColor(client.embedColor)
          try {
            client.channels.cache.get(player.textChannel).send({embeds: [embed]})
          } catch (e) {  }
        }
        player.queue.clear()
        player.queue.add(res.tracks[2])
        let thing = new MessageEmbed()
        .setColor(client.embedColor)
            .setDescription(`${ok} Starting to play recommended tracks.`)
            return await interaction.editReply({embeds: [thing]});
    } else {
        player.set("autoplay", false);
        player.queue.clear();
        let thing = new MessageEmbed()
        .setColor(client.embedColor)
            .setDescription(`${ok} I have stopped to play recommended tracks.`)
           
            return await interaction.editReply({embeds: [thing]});
        
    }

     
       }
     };