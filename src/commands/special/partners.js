const { MessageEmbed, MessageActionRow, MessageButton } = require("discord.js");
module.exports = {
  name: "partners",
  category: "special",
  description: "Shows the partnered servers.",
  owner: false,
  votelock :true,
  execute: async (message, args, client, prefix) => {

    let ok = client.emoji.ok;
    let no = client.emoji.no;
    
            const embed = new MessageEmbed()
            .setThumbnail("https://cdn.discordapp.com/icons/855371828130217984/a_219d3c73b38d54a222a4c75046164e8c.gif?size=1024")
            .setAuthor(`Alex Music Partnered Server's`, client.user.displayAvatarURL())
           .setDescription(`\nServer Name : \`Alex Music Community\` \nOwner : \`- K A R T H I K🍁#2960\`\n Premium : \`Permanent\` \nPartnered Date : \`18-06-2022\`\n
           Server Name : \`AGENT'S ⚡ E-SPORTS\` \nOwner : \`TELUGU AGENT GAMING#9830\`\nPremium : \`Permanent\` \nPartnered Date : \`07-07-2022\`
           `)
                .setColor(client.embedColor)
message.channel.send({embeds : [embed]})
    }

}