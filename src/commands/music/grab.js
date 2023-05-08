const { MessageEmbed, Message } = require("discord.js");
const { createBar } = require('../../functions.js')
module.exports = {
  name: 'grab',
  category: 'music',
  aliases: ["lagu","savedm","grb","dmchey"],
  description: 'grabs and send the current playing song data to your personal dms',
  owner: false,
  wl : true,
  votelock:true,
  execute: async (message, args, client, prefix) => {
     
    let ok = client.emoji.ok;
    let no = client.emoji.no;
    
    const { channel } = message.member.voice;
    if (!channel) {
                    const noperms = new MessageEmbed()
     
         .setColor(client.embedColor)
           .setDescription(`${no} You must be connected to a voice channel to use this command.`)
        return await message.channel.send({embeds: [noperms]});
    }
    if(message.member.voice.selfDeaf) {	
      let thing = new MessageEmbed()
       .setColor(client.embedColor)

     .setDescription(`${no} <@${message.member.id}> You cannot run this command while deafened.`)
       return await message.channel.send({embeds: [thing]});
     }
    const botchannel = message.guild.me.voice.channel;
    const player = client.manager.players.get(message.guild.id);
    if(!player || !botchannel || !player.queue.current) {
                    const noperms = new MessageEmbed()
       
         .setColor(client.embedColor)
         .setDescription(`${no} There is nothing playing in this server.`)
        return await message.channel.send({embeds: [noperms]});
    }
    if(player && channel.id !== player.voiceChannel) {
                                const noperms = new MessageEmbed()
          .setColor(client.embedColor)
        .setDescription(`${no} You must be connected to the same voice channel as me.`)
        return await message.channel.send({embeds: [noperms]});
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
      
      message.member.send({embeds: [embed]}).catch(e=>{
      return message.channel.send({ content : ` ${no} Couldn't send you a dm 
      
      Possible reasons:
    - Your Dm's are disabled
    - You have me blocked
    None of these helped? Join our [**Support Server**](https://discord.gg/pCj2UBbwST) for more help.`})
    })  
    return message.channel.send({ content : "**📪 Check your DM's.**" })
 
   
      
}
}