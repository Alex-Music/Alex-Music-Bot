var {
    MessageEmbed,
    MessageActionRow,
    MessageSelectMenu,
    createMessageComponentCollector
  } = require("discord.js")
  var {
    format,
    delay,
    arrayMove
  } = require("../../functions")
module.exports = {
  name: "search",
  description: "Searches a track from bandcamp.",
  owner: false,
  player: false,
  inVoiceChannel: true,
  sameVoiceChannel: false,
  wl : true,
  options: [
    {
      name: "query",
      description: "Song / URL",
      required: true,
      type: "STRING"
		}
	],

  

  /**
   * @param {Client} client
   * @param {CommandInteraction} interaction
   */

  run: async (client, interaction) => {
   await interaction.deferReply({
            ephemeral: false
        });
  
        let ok = client.emoji.ok;
        let no = client.emoji.no;
        
    const search = interaction.options.getString("query");
 
      const { channel } = interaction.member.voice;
      if (!channel) {
                      const noperms = new MessageEmbed()
                
           .setColor(client.embedColor)
             .setDescription(`${no} You must be connected to a voice channel to use this command.`)
          return await interaction.followUp({embeds: [noperms]});
      }
      if(interaction.member.voice.selfDeaf) {	
        let thing = new MessageEmbed()
         .setColor(client.embedColor)

       .setDescription(`${no} <@${message.member.id}> You cannot run this command while deafened.`)
         return await interaction.followUp({embeds: [thing]});
       }

    let player = client.manager.get(interaction.guildId);
    if(player && channel.id !== player.voiceChannel) {
      const noperms = new MessageEmbed()
          .setColor(client.embedColor)
.setDescription(`${no} You must be connected to the same voice channel as me.`)
return await interaction.followUp({embeds: [noperms]});
}

try {
    var res;

    if (!player) {
      player = await client.manager.create({
        guild: interaction.guild.id,
        voiceChannel: interaction.member.voice.channel.id,
        textChannel: interaction.channel.id,
        selfDeafen: true,
      });
      if (player && player.node && !player.node.connected) await player.node.connect()
    }
    let state = player.state;
    if (state !== "CONNECTED") {

      player.connect();
      player.stop();
    }
    if(search.toLowerCase().includes("youtube.com")){
      const noperms = new MessageEmbed()
      .setColor(client.embedColor)
      .setAuthor('YouTube URL', client.user.displayAvatarURL({ dynamic: true}))
      .setDescription(`We no longer support YouTube, please use other platforms like Spotify, SoundCloud or Bandcamp. Otherwise use a search query to use our default system.`)
      return await interaction.editReply({embeds: [noperms]});
    }
    if(search.toLowerCase().includes("youtu.be")){
      const noperms = new MessageEmbed()
      .setColor(client.embedColor)
      .setAuthor('YouTube URL', client.user.displayAvatarURL({ dynamic: true}))
      .setDescription(`We no longer support YouTube, please use other platforms like Spotify, SoundCloud or Bandcamp. Otherwise use a search query to use our default system.`)
      return await interaction.editReply({embeds: [noperms]});
    }
    try {
      
      res = await client.manager.search({
        query: search,
        source: 'soundcloud'
      }, interaction.member.user);

      if (res.loadType === "LOAD_FAILED") throw res.exception;
      else if (res.loadType === "PLAYLIST_LOADED") throw {
        message: `${ok} Playlists are not supported with this command. Use   ?playlist  `
      };
    } catch (e) {
      console.log(e)
       return await interaction.editReply({
        embeds: [new MessageEmbed()
          .setTitle('e')
        ]
      }).catch(() => {})
    }


    var max = 10;
    var collected;
    var cmduser = interaction.member.user;
    if (res.tracks.length < max) max = res.tracks.length;
    var track = res.tracks[0]
    var theresults = res.tracks
      .slice(0, max)
    var results = theresults.map((track, index) => `**${++index})** [\`${String(track.title).substr(0, 60).split("[").join("{").split("]").join("}")}\`](https://www.youtube.com/watch?v=dQw4w9WgXcQ) - \`${format(track.duration).split("")[0]}\``)
      .join('\n');
      if (!res.tracks[0]) {
        return await interaction.editReply({embeds : [new MessageEmbed() 
          .setDescription(`${ok} No results found.`)
          .setColor(client.embedColor)]})
        }

    const emojiarray = ["1️⃣", "2️⃣", "3️⃣", "4️⃣", "5️⃣", "6️⃣", "7️⃣", "8️⃣", "9️⃣", "🔟"]
    first_layer()
    async function first_layer() {
      var songoptions = [...emojiarray.slice(0, max).map((emoji, index) => {
          return {
            value: `Add ${index + 1}. Track`.substr(0, 25),
            label: `${res.tracks[index].title}`.substr(0, 50),
            description: `Author: ${res.tracks[index].author} - Duration: ${format(res.tracks[index].duration)} `.substr(0, 80)
          }
        }),
        {
          value: `Cancel`,
          label: `Cancel`,
          description: `${ok} Cancel the Searching Process`,
        }
      ];
      let Selection = new MessageSelectMenu()
        .setCustomId('MenuSelection').setMaxValues(emojiarray.slice(0, max).length)
        .setPlaceholder('Select all Songs you want to add')
        .addOptions(songoptions)
      let menumsg;

        menumsg =  await interaction.editReply({
          embeds: [
            new MessageEmbed()
           
            .setColor(interaction.client.embedColor)
            .setDescription(`
            Select the tracks you want to add to the queue.`)
      
          ],
          components: [
            new MessageActionRow().addComponents(Selection)
          ]
        }).catch(() => {});
      const message = interaction
      
      const collector = menumsg.createMessageComponentCollector({
        filter: i => i.isSelectMenu() && i.message.author.id == client.user.id && i.user,
        time: 90000
      })
      
      collector.on('collect', async menu => {
        console.log('e')
        if (menu.user.id === cmduser.id) {
          collector.stop();
          menu.deferUpdate();
          if (menu.values[0] == "Cancel") {
            menumsg.delete()
            return await interaction.editReply({embeds : [new MessageEmbed()
              
                .setColor(message.client.embedColor)
                .setDescription("${ok} Cancelled")
                ]});
          }
          var picked_songs = [];
          let toAddTracks = [];
          for (const value of menu.values) {
            let songIndex = songoptions.findIndex(d => d.value == value);
            var track = res.tracks[songIndex]
            toAddTracks.push(track)
            picked_songs.push(`[${track.title}](https://www.youtube.com/watch?v=dQw4w9WgXcQ)`)
          }
          menumsg.edit({
            embeds: [menumsg.embeds[0].setDescription('Queued:\n' + picked_songs.join("\n"))],
            components: [],
  
          })
          if (player.state !== "CONNECTED") {
            
            player.connect();
            
            player.queue.add(toAddTracks);
    
            player.play();
            player.pause(false);

          } else if (!player.queue || !player.queue.current) {
           
            player.queue.add(toAddTracks);
            player.play();
            player.pause(false);
          } else {
            player.queue.add(toAddTracks);
            var track = toAddTracks[0]
  
          }
  

        } else menu.reply({
          content: `❌ You are not allowed to do that! Only: <@${cmduser.id}>`,
          ephemeral: true
        });
      });
      collector.on('end', collected => {});
    }


  } catch (e) {
      console.log(e)
       return await interaction.editReply({embeds : [new MessageEmbed() 
    .setDescription(`No results found.`)
  .setColor("RED")]})
  }
   
  }
}