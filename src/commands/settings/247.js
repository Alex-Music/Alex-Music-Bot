const { MessageEmbed, MessageActionRow, MessageButton } = require("discord.js");
const twentyfourseven = require("../../schema/twentyfourseven")

module.exports = {
  name: "24/7",
  category: "settings",
  description: "Toggles 24/7 mode",
  owner: false,
  votelock:true,
  wl : true,
  execute: async (message, args, client, prefix) => {
      
    let ok = client.emoji.ok;
    let no = client.emoji.no;
    

    if (!message.member.permissions.has('MANAGE_CHANNELS')) {
        const noperms = new MessageEmbed()
       .setColor(client.embedColor)
       .setDescription(`${no} You need this required Permissions: \`MANAGE_CHANNELS\` to run this command.`)
  return await message.channel.send({embeds: [noperms]});
    }
    const { channel } = message.member.voice;
    if (!channel) {
                    const noperms = new MessageEmbed()
                   
         .setColor(client.embedColor)
           .setDescription(`${no} You must be connected to a voice channel to use this command.`)
        return await message.channel.send({embeds: [noperms]});
    }
   
      



  const player = client.manager.players.get(message.guild.id);
  if(!player){
    const jplayer = message.client.manager.create({
      guild: message.guild.id,
      voiceChannel: channel.id,
      textChannel: message.channel.id,
      selfDeafen: true,
  });
  await jplayer.connect();
  }
   let   data = await twentyfourseven.findOne({
          guildID: message.guild.id
      })
      if(!data) {
        const { channel } = message.member.voice;
          let newData = await twentyfourseven.create({
            guildID: message.guild.id,
            voiceChannel: channel.id,
            textChannel: message.channel.id
          })
          newData.save();
          const embed = new MessageEmbed()
          .setColor(message.client.embedColor)
          .setDescription(`${ok} 24/7 mode is now \`enabled\`.`)
          return await message.channel.send({ embeds : [embed]})
      }else{
            await  twentyfourseven.deleteMany({ guildID: message.guild.id });
            const embed = new MessageEmbed()
            .setColor(message.client.embedColor)
            .setDescription(`${ok} 24/7 mode is now \`disabled\`.`)
            return await message.channel.send({ embeds : [embed]})
        
      }
   
     }
}