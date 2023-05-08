const { MessageEmbed, MessageActionRow, MessageButton } = require("discord.js");


module.exports = {
  name: "ping",
  category: "general",
  description: "Check Ping Bot",
  args: false,
  wl : true,


 
 
  userPrams: [],
  botPrams: ['EMBED_LINKS'],
  execute: async (message, args, client, prefix) => {

   
    let ok = client.emoji.ok;
    let no = client.emoji.no;
const embed = new MessageEmbed()
      .setDescription('`Pinging...`')
 .setColor(client.embedColor)
      const msg = await message.channel.send({embeds: [embed]});
      const timestamp = (message.editedTimestamp) ? message.editedTimestamp : message.createdTimestamp; // Check if edited
      const latency = `  ${Math.floor(msg.createdTimestamp - timestamp)- 600} ms`;
      const apiLatency = `  ${message.client.ws.ping } ms`;
      embed.setDescription(`\`\`\`nim\nWebsocket Latency :: ${latency}\nAPI Latency       :: ${apiLatency}\`\`\``)
      .setAuthor(client.user.username, client.user.displayAvatarURL())
 .setColor(client.embedColor)
      msg.edit({embeds: [embed]});    
}
}