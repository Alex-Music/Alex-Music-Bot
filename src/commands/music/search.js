const { MessageEmbed, MessageActionRow, MessageButton } = require("discord.js");


module.exports = {
  name: "search",
  category: "music",
  description: "searches a song.",
  args: false,
  usage: "",
  wl : true,
  userPrams: [],
  botPrams: ['EMBED_LINKS'],
  owneronly: true,
  execute: async (message, args, client, prefix) => {

   
    let ok = client.emoji.ok;
    let no = client.emoji.no;

      const msg = await message.channel.send({ content: `Hey 👋 ${message.member.user.tag}! This command is currently disabled by the developers, Consider Using /search.`})
     
    }
}