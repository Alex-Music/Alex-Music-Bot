const savePlaylist = require(`../../schema/playlists.js`)
const { MessageEmbed, MessageActionRow, MessageButton } = require("discord.js");
module.exports = {
    name: "pl-create",
    category: "playlists",
    aliases: ["playlist-create"],
    description: "Creates a playlist for you!",
    wl : true,
  
    execute: async (message, args, client, prefix) => {
          
       
    let ok = client.emoji.ok;
    let no = client.emoji.no;
    let star = client.emoji.star
    
    const Name = args[0];
    if (!Name) {
        const eod = new MessageEmbed()
         .setColor(client.embedColor)
         .setAuthor(`Alex Music`, message.author.displayAvatarURL()) //.setDescription(`${emoji.msg.ERROR} You didn't entered a playlist name\nUsage: \`${prefix}pl-create <playlist name>\`\nName Information:\n\`Can be anything with maximum of 10 Letters\``)
        .addField(`Specify a Playlist Name`,`Usage: \`${prefix}pl-create <playlist name>\``)
        .addField(`\u200b`,`**Note : Name Information : ** \n\`Can be anything with maximum of 10 Letters\``)
        return message.channel.send({ embeds: [eod] });
      }
    if (Name.length > 10) {
      return message.reply({
        embeds: [
          new MessageEmbed()
            .setColor(client.embedColor)
            .setAuthor(`Alex Music`, message.author.displayAvatarURL())
            .setAuthor(`${no} <@${message.member.id}> Your playlist name is too long! \nIt can be anything with maximum of 10 Letters.`,`https://cdn.discordapp.com/emojis/914361341744132166.png`),
        ],
      });
    }
    let data = await savePlaylist.find({
      UserId: message.author.id,
      PlaylistName: Name,
    });

    if (data.length > 0) {
      return message.reply({
        embeds: [
          new MessageEmbed()
            .setColor(client.embedColor)
            .setDescription(`Playlist Already Exists`)
            .setAuthor(`Alex Music`, message.author.displayAvatarURL())
            .addField(`Playlist Delete`,`\`${prefix}pl-delete ${Name}\``)
            .addField(`Playlist info`,`\`${prefix}pl-info ${Name}\``)
        ],
      });
    }
    let userData = savePlaylist.find({
      UserId: message.member.id,
    });
    if (userData.length >= 10) {
      return message.reply({
        embeds: [
          new MessageEmbed()
            .setColor(client.embedColor)
            .setAuthor(`Alex Music`, message.author.displayAvatarURL())
            .setDescription(`${no} <@${message.member.id}> You are only allowed to save more than **10** playlists`),
        ],
      });
    }
    else{

    const newData = new savePlaylist({
      UserName: message.author.tag,
      UserId: message.author.id,
      PlaylistName: Name,
      CreatedOn: Math.round(Date.now() / 1000),
    });
    await newData.save();
    const embed = new MessageEmbed()
    .setAuthor(`Alex Music`,message.member.user.displayAvatarURL())
    .addField(`Created Playlist`,`${ok} \`${Name}\``)
    .addField(`Current Queue`,`${star} Add Current queue \`${prefix}pl-addqueue ${Name}\``)
    .addField(`Current Track`,`${star} Add Current track \`${prefix}pl-addcurrent ${Name}\``)
      .addField(`Playlists`,`${star} check your playlists \`${prefix}pl-list ${Name}\``)
      .addField(`Info`,`${star} check your playlist info  \`${prefix}pl-info ${Name}\``)
      .setColor(client.embedColor);
    return message.channel.send({ embeds: [embed] });
    }
  }
}
