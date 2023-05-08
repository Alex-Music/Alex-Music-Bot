module.exports = async (client, player) => {
	let eguild = client.guilds.cache.get(player.guild);
	console.log(`LAVALINK => [STATUS] player created in ${eguild.name} (${eguild.id}).`)

	const Schema = require('../../schema/defaultvolumeSchema')
    let volumedata = await Schema.findOne({
        guildID: player.guild,
    })
	if(volumedata){
		const volumetoset = volumedata.Volume
		player.setVolume(volumetoset);
		return;
	}
	if(!volumedata){
		const volumetoset = 100
		player.setVolume(volumetoset);
		return;
	}

}

//dm chey endhuk/u tesano chepta