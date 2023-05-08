const { CommandInteraction, Client, MessageEmbed } = require("discord.js");

module.exports = {
    name: "remove",
    description: "Remove song from the queue",
    owner: false,
    player: true,
    inVoiceChannel: true,
    sameVoiceChannel: true,
    djonly :true,
    wl : true,
    options: [
      {
        name: "number",
        description: "Number of the song in queue",
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
    
      const args = interaction.options.getNumber("number");
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

       const position = (Number(args) - 1);
       if (position > player.queue.size) {
         const number = (position + 1);
         let thing = new MessageEmbed()

           .setColor(client.embedColor)
         .setDescription(`${no} No songs at number \`${number}\`. Total songs\`${player.queue.size}```);
          return await interaction.editReply({ embeds: [thing] });
       }
     
    const song = player.queue[position]
    player.queue.remove(position);

    const emojieject = client.emoji.remove;
  
    let thing = new MessageEmbed()
      .setColor(client.embedColor)

      .setDescription(`${ok} **Removed that song from Queue**`)
    return await interaction.editReply({ embeds: [thing] });
     
       }
     };