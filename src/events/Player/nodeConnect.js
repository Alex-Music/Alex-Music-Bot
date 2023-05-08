module.exports = async (client, player) => {
    const join = async (client, vcchannel, text, guildid) => {
        const channel = client.channels.cache.get(vcchannel)
        if(channel) {
        const eplayer  = client.manager.create({
            guild: guildid,
            voiceChannel: vcchannel,
            textChannel: text,
            volume: 100,
            selfDeafen: true,
        })
        eplayer.connect()
        if(channel.type === "stage") {
            try { await client.guilds.cache.get(channel.guild.id).me.voice.setSuppressed(false) } catch {/* */}
          }
    }
    }
  console.log("LAVALINK => [STATUS] successfully connected.")
  const twentyfourseven = require("../../schema/twentyfourseven")
  var guilds = client.guilds.cache.map(i => i.id);

for (var i = 0; i < guilds.length; i++) {
  var guild = client.guilds.cache.get(guilds[i]);
  if(guild) {
    var data = await twentyfourseven.findOne({ guildID: guild.id });
    if(data){
    var guildid =  guild.id
    var text = data.textChannel
    var vcchannel = data.voiceChannel
    await join(client, vcchannel, text, guildid);
    }
  }
};


}
