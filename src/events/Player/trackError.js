const { MessageEmbed } = require("discord.js");

module.exports = async (client, player, track, payload) => {
    

    player.stop();
    const channel = client.channels.cache.get(player.textChannel);
    const thing = new MessageEmbed()
    .setColor("RED")
        .setDescription(`It seems to be a error while playing  - [${track.title}](https://www.youtube.com/watch?v=dQw4w9WgXcQ)\n Ig this song is banned/private in your country `)
    channel.send({embeds: [thing]});


    if (!player.voiceChannel) player.destroy();

}
