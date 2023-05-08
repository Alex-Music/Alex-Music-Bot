const { MessageEmbed } = require("discord.js");
const delay = require("delay");
const db = require("quick.db");

module.exports = async (client, oldState, newState) => {

    const channel = newState.guild.channels.cache.get(
        newState.channel?.id ?? newState.channelId
    )
		// Only keep the bot in the voice channel by its self for 3 minutes
		const player = client.manager?.players.get(newState.guild.id)

		if (!player) return;
		if (!newState.guild.members.cache.get(client.user.id).voice.channelId){
			player.destroy()
		}
		

		// Check for stage channel audience change
		if (newState.id == client.user.id && channel?.type == 'GUILD_STAGE_VOICE') {
			if (!oldState.channelId) {
				try {
					await newState.guild.me.voice.setSuppressed(false)
				} catch (err) {
					player.pause(true)
				}
			} else if (oldState.suppress !== newState.suppress) {
				player.pause(newState.suppress)
			}
		}

		if (oldState.id === client.user.id) return
		if (!oldState.guild.members.cache.get(client.user.id).voice.channelId) return
const vcDontleaveSchema = require('../../schema/twentyfourseven.js');
		const isactivated = await vcDontleaveSchema.findOne({ guildID: oldState.guild.id });

		if (isactivated) return;

		// Make sure the bot is in the voice channel that 'activated' the event
		if (oldState.guild.members.cache.get(client.user.id).voice.channelId === oldState.channelId) {
			if (
				oldState.guild.me.voice?.channel &&
				oldState.guild.me.voice.channel.members.filter((m) => !m.user.bot).size === 0
			) {
				const vcName = oldState.guild.me.voice.channel.id

await delay(180000)
				// times up check if bot is still by themselves in VC (exluding bots)
				const vcMembers = oldState.guild.me.voice.channel?.members.size
				if (!vcMembers || vcMembers === 2 || player) {
					const newPlayer = client.manager?.players.get(newState.guild.id)
					const cguild = client.guilds.cache.get(player.guild)
	
await player.destroy()
player.get(`playingsongmsg`).delete().catch(e => { }) 

			
					const embed = new MessageEmbed()
					
					.setDescription(`I have left the voice channel due to inactivity. Enable [24/7](https://top.gg/bot/898941398538158080/vote) to disable this!`)
					.setColor(client.embedColor)
					try {
						const c = client.channels.cache.get(player.textChannel)
						if (c)
							c.send({ embeds: [embed] })
					} catch (err) {

					}
				
			}
		}
	}

    
};
