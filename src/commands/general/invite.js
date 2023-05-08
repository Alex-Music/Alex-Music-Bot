const { MessageEmbed, MessageActionRow, MessageButton } = require("discord.js");


module.exports = {
  name: "invite",
  category: "general",
  description: "Gives the invite links of the bots.",
  owner: false,
  wl : true,
  execute: async (message, args, client, prefix) => {

    let ok = client.emoji.ok;
    let no = client.emoji.no;
   
    const row = new MessageActionRow()
    .addComponents(
    new MessageButton()
  .setLabel("Alex Music")
  .setStyle("LINK")
  .setURL(`https://discord.com/api/oauth2/authorize?client_id=898941398538158080&permissions=37088600&redirect_uri=https%3A%2F%2Fdiscord.gg%2FpCj2UBbwST&response_type=code&scope=bot%20applications.commands%20identify`),
  new MessageButton()
  .setLabel("Alex Music 2")
  .setStyle("LINK")
  .setURL(`https://discord.com/api/oauth2/authorize?client_id=955499830732546128&permissions=37088600&redirect_uri=https%3A%2F%2Fdiscord.gg%2FpCj2UBbwST&response_type=code&scope=bot%20applications.commands%20identify`),
  new MessageButton()
  .setLabel("Alex Music 3")
  .setStyle("LINK")
  .setURL(`https://discord.com/api/oauth2/authorize?client_id=955505051340775455&permissions=37088600&redirect_uri=https%3A%2F%2Fdiscord.gg%2FpCj2UBbwST&response_type=code&scope=bot%20applications.commands%20identify`),
  new MessageButton()
  .setLabel("Alex Staging")
  .setStyle("LINK")
  .setURL(`https://discord.com/api/oauth2/authorize?client_id=955509682972270602&permissions=37088600&redirect_uri=https%3A%2F%2Fdiscord.gg%2FpCj2UBbwST&response_type=code&scope=bot%20applications.commands%20identify`),
  new MessageButton()
  .setLabel("Support Server")
  .setStyle("LINK")
  .setURL(`https://discord.gg/pCj2UBbwST`),
    );
   
            const embed = new MessageEmbed()
            
           .setDescription(` [Click here](https://discord.gg/pCj2UBbwST) to join the support server!
           
           `)
                .setColor(client.embedColor)
message.channel.send({embeds : [embed], components : [row]})
    }

}