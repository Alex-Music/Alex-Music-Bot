const { MessageEmbed, MessageActionRow, MessageButton } = require("discord.js");


module.exports = {
    name: "support",
    description: "Support Server link.",
    wl : true,
   
    run: async (client, interaction) => {

        await interaction.deferReply({
              ephemeral: false
          });  
          let ok = client.emoji.ok;
          let no = client.emoji.no;
          
          const row = new MessageActionRow()
          .addComponents(
            new MessageButton()
        .setLabel("Support Server")
        .setStyle("LINK")
        .setURL(`https://discord.gg/pCj2UBbwST`),
          );
      
              const mainPage = new MessageEmbed()
              .setDescription(`[Click here](https://discord.gg/pCj2UBbwST) to join our support server.`)
              .setColor(client.embedColor)
          return interaction.followUp({embeds: [mainPage], components: [row]})
   
  },
};
