const { MessageEmbed, Message } = require("discord.js");
const { createBar } = require('../../functions.js')

module.exports = {
	name: "grab",
    description: "grab a song to your dms",
    owner: false,
    player: true,
    inVoiceChannel: true,
    sameVoiceChannel: true,
    votelock : true,
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

        const song = player.queue.current


      
  let embed = new MessageEmbed()
  .setTitle("Now playing")
.addField('Song', `[${song.title}](https://discord.gg/pCj2UBbwST)`)
.addField('Song By', `[ ${song.author} ]`)
.addField('Duration', `[ \`${!song.isStream ? `${new Date(song.duration).toISOString().slice(11, 19)}` : '◉ LIVE'}\` ]`) 
.addField(`Queue length: `,`${player.queue.length} Songs`) 
.addField(`Progress: `, createBar(player)) 
.setColor(client.embedColor)
            
            interaction.member.send({embeds: [embed]}).catch(e=>{
            return interaction.editReply({ content : `Couldn't send you a dm 
            
            Possible reasons:
          - Your Dm's are disabled
          - You have me blocked
          None of these helped? Join our [**Support Server**](https://discord.gg/pCj2UBbwST) for more help.`})
          })  
          return interaction.editReply({ content : "**📪 Check your DM's.**" })
       
         
            
    }
};