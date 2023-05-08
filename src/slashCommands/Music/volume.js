const { CommandInteraction, Client, MessageEmbed } = require("discord.js");

module.exports = {
    name: "volume",
    description: "Changes the volume of the currently playing track.",
    owner: false,
    player: true,
    inVoiceChannel: true,
    sameVoiceChannel: true,
    wl : true,
    options: [
      {
        name: "volume",
        description: "the new volume.",
        required: true,
        type: "NUMBER"
		}
	],
  votelock: true,

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
        
      const volume = interaction.options.getNumber("volume");
 
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
		
      if (!volume < 0 || volume > 100) { 
          let ething = new MessageEmbed()
      
         .setColor(client.embedColor)
          .setDescription(`${no} Please use a number between \`0\` - \`100\``)
          return await interaction.editReply({ embeds: [ething] });
      }
      player.setVolume(volume);
  
    let thing = new MessageEmbed()
      .setColor(client.embedColor)
      .setDescription(`${ok} The volume has been changed to **${volume}%**`)
    return await interaction.editReply({ embeds: [thing] });
     
       }
     };