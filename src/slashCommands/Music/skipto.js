const { CommandInteraction, Client, MessageEmbed } = require("discord.js");

module.exports = {
    name: "skipto",
    description: "Skips to a certain track.",
    owner: false,
    player: true,
    inVoiceChannel: true,
    sameVoiceChannel: true,
    djonly :true,
    wl : true,
    options: [
      {
        name: "number",
        description: "Number of song in queue",
        required: true,
        type: "NUMBER"
		}
	],

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
        
      const number = interaction.options.getNumber("number");
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
      const position = number;

      if (position < 0 || position > player.queue.size) { 
          let ething = new MessageEmbed()
          .setColor(client.embedColor)
          .setDescription(`${no} Track not found`)
          return await interaction.editReply({ embeds: [ething] });
      }
     

    player.queue.remove(0, position - 1);
    player.stop();
    let thing = new MessageEmbed()
    .setDescription(`${ok} Skipped **${position}** track(s).`)
    .setColor(interaction.client.embedColor)
    return await interaction.editReply({ embeds: [thing] });

       }
     };