const { MessageEmbed, CommandInteraction, Client } = require("discord.js")

module.exports = {
    name: "stop",
    description: "Stops the music",
    owner: false,
    player: true,
    inVoiceChannel: true,
    sameVoiceChannel: true,
    djonly :true,
    wl : true,

    /**
     * 
     * @param {Client} client 
     * @param {CommandInteraction} interaction 
     */

    run: async (client, interaction) => {
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
        const autoplay = player.get("autoplay")
        if (autoplay === true) {
            player.set("autoplay", false);
        }

        player.stop();
        player.queue.clear();
  
        const emojistop = client.emoji.stop;

		let thing = new MessageEmbed()
        .setColor(client.embedColor)
        .setDescription(`${ok} **Stopped the player and cleared the queue!**`)
        return interaction.editReply({embeds: [thing]});
	
  	}
};