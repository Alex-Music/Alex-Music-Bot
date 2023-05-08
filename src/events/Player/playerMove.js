const { MessageEmbed, MessageActionRow, MessageButton, Collection } = require("discord.js");
module.exports = async (client, player, oldChannel, newChannel) => {
	
	const guild = client.guilds.cache.get(player.guild)
	if(!guild) return;
	const channel = guild.channels.cache.get(player.textChannel);
	  if(oldChannel === newChannel) return;
	  if(newChannel === null || !newChannel) {
	  if(!player) return;
	  if(channel) {
		  
		try{
		player.get(`playingsongmsg`).delete()
		}catch(e)
		{
		
			return player.destroy();
		}

	  player.setQueueRepeat(false);
	   return player.destroy();
	  }
	 
	} else {
	  player.voiceChannel = newChannel
	  setTimeout( () => {	       	  player.pause(false)   }, 100)
    
	}
	let denginde = new MessageEmbed()// fuck off , madaercod , gandu , lawda ,tere makichut, ne pelam ni denga , ne jati pukku lo na moda,and much more to @SARKAR & @AD 

	.setColor(client.embedColor)
	.setTitle(`Player has been moved`)
	.setDescription(`I have been moved from <#${oldChannel}> to <#${newChannel}>`)
	channel.send({embeds : [denginde]}).then(msg => { setTimeout(() => { msg.delete() }, 10000) });
}
