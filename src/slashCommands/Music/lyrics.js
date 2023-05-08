const { CommandInteraction, Client, MessageEmbed } = require("discord.js");
const db = require("quick.db")
const lyricsFinder = require("lyrics-finder");
const _ = require("lodash");
module.exports = {
  name: "lyrics",
  description: "Shows the lyrics of the song searched.",
  owner: false,
  player: false,
  inVoiceChannel: true,
  sameVoiceChannel: false,
  wl : true,
  options: [
    {
      name: "name",
      description: "Song Name",
      required: true,
      type: "STRING"
		}
	],

  

  /**
   * @param {Client} client
   * @param {CommandInteraction} interaction
   */

  run: async (client, interaction,) => {
   await interaction.deferReply({
            ephemeral: false
        });
          
    let ok = client.emoji.ok;
    let no = client.emoji.no;
    
        const song = interaction.options.getString("name");

    
        let pages = []
    
       
    
    
        let res = await lyricsFinder(song) 
        if(!res) {
            let no = new MessageEmbed()
            .setDescription(`No results found.`)
              .setColor(client.embedColor)
              return await interaction.followUp({ embeds : [no]})
        }
    
        for(let i = 0; i < res.length; i += 2048) {
            let lyrics = res.substring(i, Math.min(res.length, i + 2048))
            let page = new MessageEmbed()
            .setDescription(lyrics)
            .setColor(client.embedColor)
    
            pages.push(page)
            
            return await interaction.followUp({ embeds : [page]})
        
        }
  }
}