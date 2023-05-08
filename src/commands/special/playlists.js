const { MessageEmbed, MessageActionRow, MessageButton } = require("discord.js");


module.exports = {
  name: "playlist",
  category: "special",
  description: "Shows the playlists commands!",
  owner: false,
  wl : true,
  execute: async (message, args, client, prefix) => {

    let ok = client.emoji.ok;
    let no = client.emoji.no;
    const row = new MessageActionRow()
    .addComponents(
      new MessageButton()   
  .setLabel("Vote Me")
  .setStyle("LINK")
  .setURL(`https://top.gg/bot/898941398538158080/vote`),
  new MessageButton()   
  .setLabel("Get Premium")
  .setStyle("LINK")
  .setURL(`https://www.patreon.com/alexmusicbot/membership`),
    );
   
            const embed = new MessageEmbed()
           .setAuthor(`Playlists Help`,message.author.displayAvatarURL())
           .addField(`!pl-create [playlist name]`,`Creates a playlist with the provided name.\n \`[Premium]\``)
           .addField(`!pl-show [playlist name]`,`Shows the songs within the provided playlist.\n \`[Premium]\``)
           .addField(`!pl-list [playlist name]`,`Shows the list of your playlists.\n \`[Premium]\``)
           .addField(`!pl-delete [playlist name]`,`Delete the provided saved playlist.\n \`[Premium]\``)
           .addField(`!pl-removetrack [playlist name] [Track position in the playlist]`,`Removes a specific song from the provided playlist.\n \`[Premium]\``)
           .addField(`!pl-addcurrent [playlist name]`,`Saves the current playing song to your playlist.\n \`[Premium]\``)
           .addField(`!pl-addqueue [playlist name]`,`Saves the queue to your playlist.\n \`[Premium]\``)
           .setFooter(`You can get 12 hours of premium by voting to the bot on top.gg!`)
                .setColor(client.embedColor)
message.channel.send({embeds : [embed], components : [row]})
    }

}