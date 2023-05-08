const { MessageEmbed, MessageActionRow, MessageButton } = require("discord.js");
const twentyfourseven = require("../../schema/twentyfourseven")

module.exports = {
  name: "resetdj",
  category: "settings",
  description: "Resets the djrole setup ",
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
    const role = args.join(" ")
    const dSchema = require('../../schema/djroleSchema.js');
    let data;
    try {
        data = await dSchema.findOne({
            guildID: message.guild.id
        })
        await data.delete();
    } catch(err) {
        console.log(err)
    }
    const embed = new MessageEmbed()
    .setColor(client.embedColor)
         .setDescription(`Reseted the dj role for this server.`)
         return await message.channel.send({ embeds : [embed]})
   }
}