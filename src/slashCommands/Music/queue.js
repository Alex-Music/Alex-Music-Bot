const { MessageEmbed, CommandInteraction, Client, MessageButton } = require("discord.js")
const { intpaginationEmbed } = require('../../utils/pagination.js');
let chunk = require('chunk');
module.exports = {
  name: "queue",
  description: "Show the music queue and now playing.",
  owner: false,
  player: true,
  inVoiceChannel: false,
  wl : true,
  sameVoiceChannel: false,
 

  /**
   * 
   * @param {Client} client 
   * @param {CommandInteraction} interaction 
   */

  run: async (client, interaction) => {
  
    let ok = client.emoji.ok;
    let no = client.emoji.no;
    
    const { channel } = interaction.member.voice;
    if (!channel) {
                    const noperms = new MessageEmbed()
                  
         .setColor(client.embedColor)
           .setDescription(`${no} You must be connected to a voice channel to use this command.`)
        return await interaction.reply({embeds: [noperms]});
    }
    if(interaction.member.voice.selfDeaf) {	
      let thing = new MessageEmbed()
       .setColor(client.embedColor)
     .setDescription(`${no} <@${message.member.id}> You cannot run this command while deafened.`)
       return await interaction.reply({embeds: [thing]});
     }
    const botchannel = interaction.guild.me.voice.channel;
    const player = client.manager.players.get(interaction.guild.id);
    if(!player || !botchannel || !player.queue.current || !player.queue.length) {
                    const noperms = new MessageEmbed()
      
         .setColor(client.embedColor)
         .setDescription(`There is nothing playing in this server or there is no songs in the queue.`)
        return await interaction.reply({embeds: [noperms]});
    }
    if(player && channel.id !== player.voiceChannel) {
                                const noperms = new MessageEmbed()
         .setColor(client.embedColor)
        .setDescription(`${no} You must be connected to the same voice channel as me.`)
        return await interaction.reply({embeds: [noperms]});
    }
   //
   const dbtrack = require('../../schema/trackinfoSchema.js')
   let   data = await dbtrack.findOne({
     Soundcloudtracklink: player.queue.current.uri,
 })
 if(data){
  const queue = player.queue.map((track, i) => { 
         return `${++i}. ${track.title}` 
  
  
})
            const chunked = chunk(queue, 10);
            const embeds = [];
            for (let i = 1; i <= chunked.length; ++i)
                embeds.push(new MessageEmbed().setColor(client.embedColor).setTitle(`${interaction.guild.name} Music Queue`).setDescription(`**Now playing**\n[${data.Spotifytracktitle}](${data.Spotifytracklink}) by [${data.Artistname}](${data.Artistlink})\n\n**Upcoming tracks**\n ${chunked[i - 1].join('\n')}`).setFooter(`Page ${i + 1}/${i.length}`));
            const button1 = new MessageButton().setCustomId('first').setLabel('First').setStyle('SECONDARY');
            const button2 = new MessageButton().setCustomId('back').setLabel('Back').setStyle('SECONDARY');
            const button3 = new MessageButton().setCustomId('next').setLabel('Next').setStyle('SECONDARY');
            const button4 = new MessageButton().setCustomId('last').setLabel('Last').setStyle('SECONDARY');
            const buttonList = [button1, button2, button3, button4];
            intpaginationEmbed(interaction, embeds, buttonList, interaction.member.user, 30000);

   

    }else{
      const queue = player.queue.map((track, i) => { 
        return `${++i}. ${track.title} - \`${!track.isStream ? `${new Date(track.duration).toISOString().slice(11, 19)}` : '◉ LIVE'}\` `
 
 
})
      
      
      
      const chunked = chunk(queue, 10);
      const embeds = [];
      for (let i = 1; i <= chunked.length; ++i)
          embeds.push(new MessageEmbed().setColor(client.embedColor).setTitle(`${interaction.guild.name} Music Queue`).setDescription(`**Now playing**\n${player.queue.current.title} -   \`${!player.queue.current.isStream ? `${new Date(player.queue.current.duration).toISOString().slice(11, 19)}` : '◉ LIVE'}\`\n\n**Upcoming tracks**\n ${chunked[i - 1].join('\n')}`).setFooter(`Page ${i + 1}/${i.length}`));
      const button1 = new MessageButton().setCustomId('first').setLabel('First').setStyle('SECONDARY');
      const button2 = new MessageButton().setCustomId('back').setLabel('Back').setStyle('SECONDARY');
      const button3 = new MessageButton().setCustomId('next').setLabel('Next').setStyle('SECONDARY');
      const button4 = new MessageButton().setCustomId('last').setLabel('Last').setStyle('SECONDARY');
      const buttonList = [button1, button2, button3, button4];
      intpaginationEmbed(interaction, embeds, buttonList, interaction.member.user, 30000);
    }
  }
  };
