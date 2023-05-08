const { CommandInteraction, Client, MessageEmbed } = require("discord.js");
const { convertTime } = require('../../utils/convert.js')
const ms = require('ms');

module.exports = {
    name: "replay",
    description: "restart the currently playing song",
    owner: false,
    player: true,
    djonly :true,
    inVoiceChannel: true,
    sameVoiceChannel: true,
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


        player.seek(0);
               
        let thing = new MessageEmbed()

            .setColor(client.embedColor)
            .setDescription(`${ok} Restarting [${player.queue.current.title}](https://www.youtube.com/watch?v=dQw4w9WgXcQ)`);
        return  await interaction.editReply({embeds: [thing]});

        
	
    }
};
