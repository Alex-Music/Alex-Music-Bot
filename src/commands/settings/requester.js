const { MessageEmbed, MessageActionRow, MessageButton } = require("discord.js");
const twentyfourseven = require("../../schema/twentyfourseven")

module.exports = {
  name: "requester",
  category: "settings",
  description: "Toggles nowplaying messages.",
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
    const Schema = require('../../schema/requesterSchema.js'); 

    let   data = await Schema.findOne({
        guildID: message.guild.id
    })
    if(data) {
      await  Schema.deleteMany({ guildID: message.guild.id });
    
        const embed = new MessageEmbed()
        .setColor(message.client.embedColor)
         .setDescription(`${ok} Requester will be shown on each track.`)
         return await message.channel.send({embeds: [embed]});
       
    }
    if(!data) {
      const savev =  await  Schema.create({
        guildID: message.guild.id,
        enabled: true,
      })
      
      savev.save();

        const embed = new MessageEmbed()
        .setColor(message.client.embedColor)
         .setDescription(`${ok} Requester will now not be shown on each track.`)
         return await message.channel.send({embeds: [embed]});
    }
       
   },
}