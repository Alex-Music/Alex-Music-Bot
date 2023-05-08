const { MessageEmbed, MessageActionRow, MessageButton } = require("discord.js");
const twentyfourseven = require("../../schema/twentyfourseven")

module.exports = {
  name: "setdj",
  category: "settings",
  description: "Toggles djrole mode",
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
    const role = message.mentions.roles.first();
    const dSchema = require('../../schema/djroleSchema.js');
    let data;
    try {
        data = await dSchema.findOne({
            guildID: message.guild.id
        })
        if(!data) {
            let newData = await dSchema.create({
                guildID: message.guild.id,
                Roleid: role,
            })
            newData.save();
        } else {
            await dSchema.findOneAndUpdate({
                guildID: message.guild.id,
                Roleid: role,
            })
        }
    } catch(err) {
        console.log(err)
    }
    const embed = new MessageEmbed()
    .setColor(client.embedColor)
         .setDescription(`DJ role mode is now **enabled** and set to ${role}.`)
         return await message.channel.send({ embeds : [embed]})
   }
}