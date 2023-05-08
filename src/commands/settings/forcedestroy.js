const { MessageEmbed, MessageActionRow, MessageButton } = require('discord.js');

module.exports = {
  name: 'forceplayerdestroy',
  category: 'settings',
  aliases: [],
  description: 'Forcely destroy the player for this guild.',
  owner: false,
  djonly : true,
  wl : true,
  execute: async (message, args, client, prefix) => {
     
    let ok = client.emoji.ok;
    let no = client.emoji.no;
    
    if (!message.member.permissions.has('MANNAGE_CHANNELS')) {
      const noperms = new MessageEmbed()
     .setColor(client.embedColor)
     .setDescription(`${no} You need this required Permissions: \`MANAGE_CHANNELS\` to run this command.`)
return await message.channel.send({embeds: [noperms]});
  }
    //
  


  const player = client.manager.players.get(message.guild.id);
 
      player.destroy();
      let thing = new MessageEmbed()
      .setColor(client.embedColor)
      .setDescription(`${ok} Forcely Destroyed the player for this guild!`)
      return message.channel.send({ embeds: [thing] });
      
      }
}