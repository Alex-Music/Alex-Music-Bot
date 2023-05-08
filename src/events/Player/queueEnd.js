const delay = require("delay");

const ms = require('ms');
const { MessageEmbed, MessageActionRow, MessageButton } = require("discord.js");
module.exports = async (client, player) => {
	const channel = client.channels.cache.get(player.textChannel);
	player.get(`playingsongmsg`).delete().catch({ }) 

	let queue_end = new MessageEmbed()// fuck off , madaercod , gandu , lawda ,tere makichut, ne pelam ni denga , ne jati pukku lo na moda,and much more to @SARKAR & @AD 

	.setColor(client.embedColor)
	.setAuthor(`Queue More Songs/Enable Autoplay!`,client.user.displayAvatarURL(),`https://top.gg/bot/898941398538158080/vote`)
	channel.send({embeds : [queue_end]});// toh guys this is queue end embed 

}
