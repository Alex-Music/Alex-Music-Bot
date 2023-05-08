const { CommandInteraction, Client, MessageEmbed } = require("discord.js");
const {
    format,
    arrayMove
  } = require(`../../functions.js`);
module.exports = {
    name: "move",
    description: "Change the position of a track in the queue.",
    owner: false,
    player: true,
    inVoiceChannel: true,
    djonly :true,
    sameVoiceChannel: true,
    djonly :true,
    wl : true,
    options: [
      {
        name: "from",
        description: "the position",
        required: true,
        type: "NUMBER"
		},
        {
            name: "to",
            description: "the new position",
            required: true,
            type: "NUMBER"
            },
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
    
      const from = interaction.options.getNumber("from");
      const to = interaction.options.getNumber("to");
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
		
      if (from <= 1 || from > player.queue.length) {
        const eoer = new MessageEmbed()
        .setColor(client.embedColor)
        .setDescription(`${no} Your input must be a number greater then \`1\` and smaller than \`${player.queue.length}\``)
        return await interaction.editReply({embeds: [eoer]})
      }
      let song = player.queue[player.queue.length - 1];
        let QueueArray = arrayMove(player.queue, player.queue.length - 1, 0);
        player.queue.clear();
        for (const track of QueueArray)
          player.queue.add(track);
    let thing = new MessageEmbed()
      .setColor(client.embedColor)
      .setDescription(`${ok} Moved the track in the queue from position \`${from}\` to position \`${to}\``)    
      return await interaction.editReply({ embeds: [thing] });
     
       }
     };