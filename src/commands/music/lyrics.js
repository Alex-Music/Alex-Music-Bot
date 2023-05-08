const { MessageEmbed, MessageActionRow, MessageButton } = require('discord.js');
const lyricsFinder = require("lyrics-finder");
module.exports = {
  name: 'lyrics',
  category: 'music',
  aliases: ["ly","lyr"],
  description: 'Gives the lyrics of the provided song.',
  owner: false,
  wl : true,
  execute: async (message, args, client, prefix) => {
     

    const song = args.join(" ")
    if (!song[0]) {
        const ppp = new MessageEmbed()
        .setDescription(`You need to give me a song name.`)
        return message.channel.send({embeds: [ppp]});
      }
      let res = await lyricsFinder(song) 
      if(!res) {
          let no = new MessageEmbed()
          .setDescription(`No results found.`)
            .setColor(client.embedColor)
            return await message.channel.send({ embeds : [no]})
      }


//page one pages len
length = 2
let lyricpage = []
const sudhi = new MessageEmbed()
.setDescription(lyricpage.join(""))
   // main page 
  
    for(let i = 0; i < res.length; i += 2048) {
      let lyrics = res.substring(i, Math.min(res.length, i + 2048))
      let mainpage1 = new MessageEmbed()
      .setTitle(` Alex Music |  Lyrics of ${song}`)
      .setDescription(lyrics)
      .setFooter(`Thanks For Choosing Alex Music `)
      .setThumbnail(client.user.displayAvatarURL())
      .setColor(client.embedColor)

  


  const m = await message.channel.send({ embeds: [mainpage1] });

 
    const collector = m.createMessageComponentCollector({
      filter: (b) =>
        b.user.id === message.author.id ? true : false && b.deferUpdate().catch(() => {}),
      time: 60000 * 5,
      idle: (60000 * 5) / 2,
    });
   
        


        collector.on('collect', async (b) => {
          if (!b.deferred) await b.deferUpdate().catch(() => {});
          if (b.customId === 'Previous') {

            for(let i = 0; i < res.length; i += 2048) {
              let lyrics1 = res.substring(i, Math.min(res.length, i + 2048))
              let page1 = new MessageEmbed()
              .setTitle(` Alex Music |  Lyrics of ${song}`)
              .setThumbnail(client.user.displayAvatarURL())
              .setDescription(lyrics1)
              .setColor(client.embedColor)
              .setFooter(`Developed with 💙 by ! SuDhi <3#0335`)
             lyricpage.push(page1)
              if (!m) return;
              return await m.edit({ embeds: [sudhi] });
            }
          
          } else if (b.customId === 'Next') {
            if (!b.deferred) await b.deferUpdate().catch(() => {})
                for(let i = 2048; i < res.length; i += 2048) {
        let lyrics2 = res.substring(i, Math.min(res.length, i + 2048))
        let page2 = new MessageEmbed()
        .setTitle(` Alex Music |  Lyrics of ${song}`)
        .setDescription(lyrics2)
        .setThumbnail(client.user.displayAvatarURL())
        .setColor(client.embedColor)
        .setFooter(`Developed with 💙 by ! SuDhi <3#0335`)
        if (!m) return;
        lyricpage.push(page2)
              return await m.edit({ embeds: [sudhi] });
          }
          
        } 
        });
      
   
      }
    }
  }
  