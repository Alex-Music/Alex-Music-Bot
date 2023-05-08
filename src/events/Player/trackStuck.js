const { MessageEmbed } = require("discord.js");

module.exports = async (client, player, track, payload) => {

    player.stop();
	

    
    const channel = client.channels.cache.get(player.textChannel);
    const failed = new MessageEmbed()
    .setColor("RED")
        .setDescription(`Looks like something is wrong with - ${track.title} \n Please Report this to Developers they will sort out this issue`)
    channel.send({embeds: [failed]});


    player.get(`playingsongmsg`).delete().catch(e => { }) 
}
