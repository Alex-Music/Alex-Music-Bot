const { MessageEmbed, MessageActionRow, MessageButton } = require("discord.js");


module.exports = {
  name: "premium",
  category: "general",
  description: "Gives the link to  vote the bot.",
  owner: false,
  wl : true,

  execute: async (message, args, client, prefix) => {

   
    let ok = client.emoji.ok;
    let no = client.emoji.no;
    const buttonbolte = new MessageActionRow()
    .addComponents(
      new MessageButton()
  .setLabel("Premium")
  .setStyle("LINK")
  .setURL(`https://www.patreon.com/alexmusicbot/membership`),
    );

        const mainPage = new MessageEmbed()
        .setDescription(`Help me by buying premium :)`) 
        .setColor(client.embedColor)
message.channel.send({embeds : [mainPage], components : [buttonbolte]})
    }
}