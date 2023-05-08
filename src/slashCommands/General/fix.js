const { MessageEmbed, CommandInteraction, Client } = require("discord.js")
const { convertTime } = require('../../utils/convert.js');

module.exports = {
  name: "fix",
  description: "Tries to fix the lag or other audio issues forcefully by changing server region.",
  owner: false,
  player: true,
  inVoiceChannel: false,
  sameVoiceChannel: false,
  votelock : true,
  wl : true,
  options: [
    {
      name: "region",
      description: "The Region you want to set to",
      required: false,
      type: "STRING"
	  	}
	],
  votelock: true,

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
    
    if (!interaction.member.permissions.has('MANAGE_CHANNELS')) {
      const noperms = new MessageEmbed()
     .setColor(client.embedColor)
     .setDescription(`You need this required Permissions: \`MANAGE_CHANNELS\` to run this command.`)
     await interaction.followUp({embeds: [noperms]});
  }
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
    const args = interaction.options.getString("region");


      
      if(args){
        const guild = client.guilds.cache.get(interaction.guild.id);
        const voiceChannel = guild.channels.cache.get(player.voiceChannel);
        const validregions = ['us-west', 'brazil', 'hongkong', 'india', 'japan', 'rotterdam', 'russia', 'singapore', 'south-korea', 'southafrica', 'sydney', 'us-central', 'us-east', 'us-south'];
    if(!validregions.includes(interaction.options.getString("region"))) {
        const noperms = new MessageEmbed()
         .setColor(client.embedColor)
         .setDescription(`**This Is An Invalid Region Please Select A Valid Region**. \n\n Available regions - \`brazil\`, \`hongkong\`, \`india\`, \`japan\`, \`rotterdam\`, \`russia\`, \`singapore\`, \`south-korea\`, \`southafrica\`, \`sydney\`, \`us-central\`, \`us-east\`, \`us-south\`, \`us-west\``)
       return interaction.editReply({embeds: [noperms]}).then(responce => {
        setTimeout(() => {
            try {
                responce.delete().catch(() => {
                    return
                })
            } catch(err) {
                return
            }
        }, 12000)
    });
       ;
    
       }
    
        try {
            const channelOpts = {
                rtcRegion: args,
            };
    
            voiceChannel.edit(channelOpts, `Fix command`);
  
              const noperms = new MessageEmbed()
              .setColor(client.embedColor)
               .setDescription(`Voice Region is now set to \`${args}\`.`)
               return await interaction.editReply({ embeds: [noperms] })
            
    }catch(e){
        return await interaction.editReply({ content: `Unable to change the voice region make sure I have the \`MANAGE_CHANNELS\` permission and make sure you specified a vaild voicechannel region.`})
     }
     return;
    }
            
    
    const guild = client.guilds.cache.get(interaction.guild.id);
    const voiceChannel = guild.channels.cache.get(player.voiceChannel);
    const Responses = ['us-west', 'brazil', 'hongkong', 'india', 'japan', 'rotterdam', 'russia', 'singapore', 'south-korea', 'southafrica', 'sydney', 'us-central', 'us-east', 'us-south'];
    const rc = Math.floor(Math.random() * Responses.length);
    const validregions = ['us-west', 'brazil', 'hongkong', 'india', 'japan', 'rotterdam', 'russia', 'singapore', 'south-korea', 'southafrica', 'sydney', 'us-central', 'us-east', 'us-south'];
    if(!validregions.includes(interaction.options.getString("region"))) {
        const noperms = new MessageEmbed()
         .setColor(client.embedColor)
         .setDescription(`This Is An Invalid Region Please Select A Correct Region. \n Available regions - us-west, brazil, hongkong, india, japan, rotterdam\n russia, singapore, south-korea, southafrica, sydney, us-central, us-east, us-south `)
         return interaction.editReply({embeds: [noperms]});
    
       }

    try {
        const channelOpts = {
            rtcRegion: Responses[rc],
        };
    
        voiceChannel.edit(channelOpts, `Fix command`);
      
        const noperms = new MessageEmbed()
        .setColor(client.embedColor)
         .setDescription(`Voice Region is now set to \`${Responses[rc]}\`.`)
         return await interaction.editReply({ embeds: [noperms] })
    }catch(e){
        return await interaction.editReply({ content: `Unable to change the voice region make sure I have the \`MANAGE_CHANNELS\` permission and try again.` })
    }
  
     
   

    }

  };
