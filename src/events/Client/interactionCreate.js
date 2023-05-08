const { MessageEmbed, CommandInteraction, Client, MessageButton , MessageActionRow} = require("discord.js")
const { queuepaginationEmbed } = require('../../utils/pagination.js');
const blacklist = require("../../schema/blacklistSchema.js")
const { convertTime } = require('../../utils/convert.js');
const ownerids = [""]
const spstats = require("../../schema/premium-user.js");
const upstats = require("../../schema/premium-guild.js")
let chunk = require('chunk');
    module.exports = async (client, interaction) => {
          
    let ok = client.emoji.ok;
    let no = client.emoji.no;

    if(interaction.isCommand()) {
        const SlashCommands = client.sls.get(interaction.commandName);
        if(!SlashCommands) return;
    if(SlashCommands.djonly){
    const djSchema = require('../../schema/djroleSchema')
    let djdata = await djSchema.findOne({
        guildID: interaction.guild.id,
    });
        if(djdata && !interaction.member.roles.cache.has(djdata.Roleid) ) {

      const embed = new MessageEmbed()
           .setColor(client.embedColor)
       .setDescription(`<@${interaction.member.id}> This command requires you to have ${djdata.Roleid}.`)
           return await interaction.reply({embeds: [embed], ephemeral: true});
     }
    }
    
}

if(interaction.isCommand()) {
    const SlashCommands = client.sls.get(interaction.commandName);
    if(!SlashCommands) return;
if(SlashCommands.wl){
    const nooo = await blacklist.findOne({
        UserID : interaction.member.id,
      })
    if (nooo && !ownerids.includes(interaction.member.id)) {
      //Blacklisted user
      const embed = new interacctionEmbed()
      .setColor(client.embedColor)
      .setDescription(`<@${interaction.member.id}> You are blacklisted from using the bot! \n For appeals join [support server](https://discord.gg/pCj2UBbwST) and contact owners or staff members!`)
       return await interaction.reply({embeds: [embed], ephemeral: true});
 }
}

}
        if (interaction.customId === 'evaldelete') {
            await interaction.deferReply({
                ephemeral: true
              });
           
            if(!ownerids.includes(interaction.member.id)) {
                const noperms = new MessageEmbed()
         .setColor(client.embedColor)
         .setDescription(`🍣 Dude stop using this button.`)
         return interaction.editReply({embeds: [noperms]});
               }
       return interaction.message.delete()
        }

        // loop track 
        if (interaction.customId === 'looptrack') {

            await interaction.deferUpdate();
            const djSchema = require('../../schema/djroleSchema')
            let djdata = await djSchema.findOne({
                guildID: interaction.guild.id,
            })
                if(djdata && !interaction.member.roles.cache.has(djdata.Roleid)) {
         
              const embed = new MessageEmbed()
                   .setColor(client.embedColor)
               .setDescription(`<@${interaction.member.id}> This command requires you to have ${djdata.Roleid}.`)
                   return await interaction.followUp({embeds: [embed],ephemeral: true});
             }

            const { channel } = interaction.member.voice;
            if (!channel) {
                            const noperms = new MessageEmbed()
            
                .setColor(client.embedColor)
                  .setDescription(`You must be connected to a voice channel to use this button`)
                return await interaction.followUp({embeds: [noperms], ephemeral: true})
            }
            const botchannel = interaction.guild.me.voice.channel;
            const player = client.manager.players.get(interaction.guild.id);
            if(!player || !botchannel || !player.queue.current) {
                            const noperms = new MessageEmbed()
            
                .setColor(client.embedColor)
                .setDescription(`There is nothing playing in this server.`)
                return await interaction.followUp({embeds: [noperms], ephemeral: true})
            }
            if(player && channel.id !== player.voiceChannel) {
                                        const noperms = new MessageEmbed()
        .setColor(client.embedColor)
               .setDescription(`You must be connected to the same voice channel as me.`)
                return await interaction.followUp({embeds: [noperms], ephemeral: true})
            }
            player.setQueueRepeat(!player.queueRepeat);
            const trackRepeat = player.queueRepeat ? "enabled" : "disabled";
            let thing = new MessageEmbed()
                .setColor(client.embedColor)
                .setDescription(`looping the queue is now \`${trackRepeat}\`. -  <@!${interaction.member.id}>`)
                return await interaction.channel.send({embeds: [thing]}).then(responce => {
                    setTimeout(() => {
                        try {
                            responce.delete().catch(() => {
                                return
                            })
                        } catch(err) {
                            return
                        }
                    }, 5000)
                });

        }


        //shuffle
        if (interaction.customId === 'shuffle') {
    
            await interaction.deferUpdate();
            const djSchema = require('../../schema/djroleSchema')
            let djdata = await djSchema.findOne({
                guildID: interaction.guild.id,
            })
                if(djdata && !interaction.member.roles.cache.has(djdata.Roleid)) {
         
              const embed = new MessageEmbed()
                   .setColor(client.embedColor)
               .setDescription(`<@${interaction.member.id}> This command requires you to have ${djdata.Roleid}.`)
                   return await interaction.followUp({embeds: [embed],ephemeral: true});
             }
            const { channel } = interaction.member.voice;
            if (!channel) {
                            const noperms = new MessageEmbed()
                .setColor(client.embedColor)
                  .setDescription(` You must be connected to a voice channel to use this button`)
                return await interaction.followUp({embeds: [noperms], ephemeral: true})
            }
            if(interaction.member.voice.selfDeaf) {	
            let thing = new MessageEmbed()
              .setColor(client.embedColor)
            .setDescription(` <@${interaction.member.id}> You cannot use this button while deafened.`)
            return await interaction.followUp({embeds: [thing], ephemeral: true})
            }
            const botchannel = interaction.guild.me.voice.channel;
            const player = client.manager.players.get(interaction.guild.id);
            if(!player || !botchannel || !player.queue.current) {
                            const noperms = new MessageEmbed()

                .setColor(client.embedColor)
                .setDescription(` Nothing is playing in the server`)
                return await interaction.followUp({embeds: [noperms], ephemeral: true})
            }
            if(player && channel.id !== player.voiceChannel) {
                                        const noperms = new MessageEmbed()
                .setColor(client.embedColor)
               .setDescription(` You must be connected to the same voice channel as me.`)
                return await interaction.followUp({embeds: [noperms], ephemeral: true})
            }
            player.queue.shuffle();
            let thing = new MessageEmbed()
        
                .setDescription(`Queue has been shuffled. - <@!${interaction.member.id}>`)
                .setColor(client.embedColor)
                return await interaction.channel.send({embeds: [thing]}).then(responce => {
                    setTimeout(() => {
                        try {
                            responce.delete().catch(() => {
                                return
                            })
                        } catch(err) {
                            return
                        }
                    }, 5000)
                });
                
        }




            //volume down
        if (interaction.customId === 'voldown') {
    
            await interaction.deferUpdate();
            const djSchema = require('../../schema/djroleSchema')
            let djdata = await djSchema.findOne({
                guildID: interaction.guild.id,
            })
                if(djdata && !interaction.member.roles.cache.has(djdata.Roleid)) {
         
              const embed = new MessageEmbed()
                   .setColor(client.embedColor)
               .setDescription(`<@${interaction.member.id}> This command requires you to have ${djdata.Roleid}.`)
                   return await interaction.followUp({embeds: [embed],ephemeral: true});
             }
   //
  
      const { channel } = interaction.member.voice;
      if (!channel) {
                      const noperms = new MessageEmbed()
                     
           .setColor(client.embedColor)
             .setDescription(` You must be connected to a voice channel to use this button`)
          return await interaction.followUp({embeds: [noperms],ephemeral: true});
      }
      if(interaction.member.voice.selfDeaf) {	
        let thing = new MessageEmbed()
         .setColor(client.embedColor)

       .setDescription(` <@${interaction.member.id}> You cannot use this button while deafened.`)
         return await interaction.followUp({embeds: [thing],ephemeral: true});
       }
      const botchannel = interaction.guild.me.voice.channel;
      const player = client.manager.players.get(interaction.guild.id);
      if(!player || !botchannel || !player.queue.current) {
                      const noperms = new MessageEmbed()

           .setColor(client.embedColor)
           .setDescription(` There is nothing playing in this server.`)
          return await interaction.followUp({embeds: [noperms],ephemeral: true});
      }
      if(player && channel.id !== player.voiceChannel) {
                                  const noperms = new MessageEmbed()
             .setColor(client.embedColor)
          .setDescription(` You must be connected to the same voice channel as me.`)
          return await interaction.followUp({embeds: [noperms],ephemeral: true});
      }
		
     
      player.setVolume(player.volume - 10);
      let thing = new MessageEmbed()
      .setColor(client.embedColor)
      .setDescription(`layer volume set to ${player.volume}%`)
    return await interaction.channel.send({ embeds: [thing] }).then(responce => {
        setTimeout(() => {
            try {
                responce.delete().catch(() => {
                    return
                })
            } catch(err) {
                return
            }
        }, 5000)
    });
                
        }
        

        //volume up
        if (interaction.customId === 'volup') {
    
            await interaction.deferUpdate();
            const djSchema = require('../../schema/djroleSchema')
            let djdata = await djSchema.findOne({
                guildID: interaction.guild.id,
            })
                if(djdata && !interaction.member.roles.cache.has(djdata.Roleid)) {
         
              const embed = new MessageEmbed()
                   .setColor(client.embedColor)
               .setDescription(`<@${interaction.member.id}> This command requires you to have ${djdata.Roleid}.`)
                   return await interaction.followUp({embeds: [embed],ephemeral: true});
             }
   //
  
      const { channel } = interaction.member.voice;
      if (!channel) {
                      const noperms = new MessageEmbed()
                     
           .setColor(client.embedColor)
             .setDescription(` You must be connected to a voice channel to use this button`)
          return await interaction.followUp({embeds: [noperms],ephemeral: true});
      }
      if(interaction.member.voice.selfDeaf) {	
        let thing = new MessageEmbed()
         .setColor(client.embedColor)

       .setDescription(` <@${interaction.member.id}> You cannot use this button while deafened.`)
         return await interaction.followUp({embeds: [thing],ephemeral: true});
       }
      const botchannel = interaction.guild.me.voice.channel;
      const player = client.manager.players.get(interaction.guild.id);
      if(!player || !botchannel || !player.queue.current) {
                      const noperms = new MessageEmbed()

           .setColor(client.embedColor)
           .setDescription(` There is nothing playing in this server.`)
          return await interaction.followUp({embeds: [noperms],ephemeral: true});
      }
      if(player && channel.id !== player.voiceChannel) {
                                  const noperms = new MessageEmbed()
             .setColor(client.embedColor)
          .setDescription(` You must be connected to the same voice channel as me.`)
          return await interaction.followUp({embeds: [noperms],ephemeral: true});
      }
		
     
      player.setVolume(player.volume + 10);
      let thing = new MessageEmbed()
      .setColor(client.embedColor)
      .setDescription(`layer volume set to ${player.volume}%`)
    return await interaction.channel.send({ embeds: [thing] }).then(responce => {
        setTimeout(() => {
            try {
                responce.delete().catch(() => {
                    return
                })
            } catch(err) {
                return
            }
        }, 5000)
    });
                
     }


        //pause and play
    
        if (interaction.customId === 'prtrack') {

            await interaction.deferUpdate();
            const djSchema = require('../../schema/djroleSchema')
            let djdata = await djSchema.findOne({
                guildID: interaction.guild.id,
            })
                if(djdata && !interaction.member.roles.cache.has(djdata.Roleid)) {
         
              const embed = new MessageEmbed()
                   .setColor(client.embedColor)
               .setDescription(`<@${interaction.member.id}> This command requires you to have ${djdata.Roleid}.`)
                   return await interaction.followUp({embeds: [embed],ephemeral: true});
             }
            const { channel } = interaction.member.voice;
            if (!channel) {
                            const noperms = new MessageEmbed()
                    
                .setColor(client.embedColor)
                  .setDescription(` You must be connected to a voice channel to use this button`)
                return await interaction.followUp({embeds: [noperms], ephemeral: true})
            }
            if(interaction.member.voice.selfDeaf) {	
            let thing = new MessageEmbed()
              .setColor(client.embedColor)
        
            .setDescription(` <@${interaction.member.id}> You cannot use this button while deafened.`)
            return await interaction.followUp({embeds: [thing], ephemeral: true})
            }
            const botchannel = interaction.guild.me.voice.channel;
            const player = client.manager.players.get(interaction.guild.id);
            if(!player || !botchannel || !player.queue.current) {
                            const noperms = new MessageEmbed()
                
                .setColor(client.embedColor)
                .setDescription(` There is nothing playing in this server.`)
                return await interaction.followUp({embeds: [noperms], ephemeral: true})
            }
            if(player && channel.id !== player.voiceChannel) {
                const noperms = new MessageEmbed()
        
            .setColor(client.embedColor)
               .setDescription(`You must be connected to the same voice channel as me.`)
                return await interaction.followUp({embeds: [noperms], ephemeral: true})
            }
            const song = player.queue.current;

            if (player.paused) {
                player.pause(false);
   
                let thing = new MessageEmbed()
                
                .setDescription(`<@${interaction.member.id}> has resumed the player.`)
                .setColor(client.embedColor)
                return await interaction.channel.send({embeds: [thing]}).then(responce => {
                    setTimeout(() => {
                        try {
                            responce.delete().catch(() => {
                                return
                            })
                        } catch(err) {
                            return
                        }
                    }, 5000)
                });
            }
            if (!player.paused) {
            
                player.pause(true);
                let thing = new MessageEmbed()

                .setDescription(` <@!${interaction.member.id}> has paused the player.`)
                .setColor(client.embedColor)
                return await interaction.channel.send({embeds: [thing]}).then(responce => {
                    setTimeout(() => {
                        try {
                            responce.delete().catch(() => {
                                return
                            })
                        } catch(err) {
                            return
                        }
                    }, 5000)
                });
            }

        }



        //skip
        if (interaction.customId === 'skiptrack') {
    
            await interaction.deferUpdate();
            const djSchema = require('../../schema/djroleSchema')
            let djdata = await djSchema.findOne({
                guildID: interaction.guild.id,
            })
                if(djdata && !interaction.member.roles.cache.has(djdata.Roleid)) {
         
              const embed = new MessageEmbed()
                   .setColor(client.embedColor)
               .setDescription(`<@${interaction.member.id}> This command requires you to have ${djdata.Roleid}.`)
                   return await interaction.followUp({embeds: [embed],ephemeral: true});
             }
            const { channel } = interaction.member.voice;
            if (!channel) {
                            const noperms = new MessageEmbed()

                .setColor(client.embedColor)
                  .setDescription(` You must be connected to a voice channel to use this button`)
                return await interaction.followUp({embeds: [noperms], ephemeral: true})
            }
            if(interaction.member.voice.selfDeaf) {	
            let thing = new MessageEmbed()
              .setColor(client.embedColor)
    
            .setDescription(` <@${interaction.member.id}> You cannot use this button while deafened.`)
            return await interaction.followUp({embeds: [thing], ephemeral: true})
            }
            const botchannel = interaction.guild.me.voice.channel;
            const player = client.manager.players.get(interaction.guild.id);
            if(!player || !botchannel || !player.queue.current) {
                            const noperms = new MessageEmbed()
    
                .setColor(client.embedColor)
                .setDescription(` There is nothing playing in this server.`)
                return await interaction.followUp({embeds: [noperms], ephemeral: true})
            }
            if(player && channel.id !== player.voiceChannel) {
                                        const noperms = new MessageEmbed()
                .setColor(client.embedColor)
               .setDescription(` You must be connected to the same voice channel as me.`)
                return await interaction.followUp({embeds: [noperms], ephemeral: true})
            }

            const song = player.queue.current;
            const autoplay = player.get("autoplay");
            if (autoplay === false) {
                player.stop();
            } else {
                player.stop();
    
            }       
        
            let thing = new MessageEmbed()

    .setDescription(`Skipping to the next track. -  <@!${interaction.member.id}>`)
                .setColor(client.embedColor)
                return await interaction.channel.send({embeds: [thing]}).then(responce => {
                    setTimeout(() => {
                        try {
                            responce.delete().catch(() => {
                                return
                            })
                        } catch(err) {
                            return
                        }
                    }, 5000)
                });
            

        }

            //forward
        if (interaction.customId === 'forward') {

            await interaction.deferUpdate();
            const djSchema = require('../../schema/djroleSchema')
            let djdata = await djSchema.findOne({
                guildID: interaction.guild.id,
            })
                if(djdata && !interaction.member.roles.cache.has(djdata.Roleid)) {
         
              const embed = new MessageEmbed()
                   .setColor(client.embedColor)
               .setDescription(`<@${interaction.member.id}> This command requires you to have ${djdata.Roleid}.`)
                   return await interaction.followUp({embeds: [embed],ephemeral: true});
             }
            const { channel } = interaction.member.voice;
            if (!channel) {
                            const noperms = new MessageEmbed()
                        
                .setColor(client.embedColor)
                  .setDescription(` You must be connected to a voice channel to use this button`)
                return await interaction.followUp({embeds: [noperms], ephemeral: true})
            }
            if(interaction.member.voice.selfDeaf) {	
            let thing = new MessageEmbed()
              .setColor(client.embedColor)

            .setDescription(` <@${interaction.member.id}> You cannot use this button while deafened.`)
            return await interaction.followUp({embeds: [thing], ephemeral: true})
            }
            const botchannel = interaction.guild.me.voice.channel;
            const player = client.manager.players.get(interaction.guild.id);
            if(!player || !botchannel || !player.queue.current) {
                            const noperms = new MessageEmbed()
            
                .setColor(client.embedColor)
                .setDescription(` There is nothing playing in this server.`)
                return await interaction.followUp({embeds: [noperms], ephemeral: true})
            }
            if(player && channel.id !== player.voiceChannel) {
                                        const noperms = new MessageEmbed()
                .setColor(client.embedColor)
               .setDescription(` You must be connected to the same voice channel as me.`)
                return await interaction.followUp({embeds: [noperms], ephemeral: true})
            }
            const time = ("10s");
            const etime = require('ms')(time)
            let seektime = Number(player.position) + Number(etime) ;
    if (Number(seektime) >= player.queue.current.duration) seektime = player.queue.current.duration - 1000;
    player.seek(Number(seektime))
     let thing = new MessageEmbed()
       .setColor(client.embedColor)
       .setDescription(`Forwarded to \`${convertTime(player.position)}\``)
                return await interaction.channel.send({embeds: [thing]}).then(responce => {
                    setTimeout(() => {
                        try {
                            responce.delete().catch(() => {
                                return
                            })
                        } catch(err) {
                            return
                        }
                    }, 5000)
                });

        }

        if (interaction.customId === 'rewind') {

            await interaction.deferUpdate();
            const { channel } = interaction.member.voice;
            if (!channel) {
                            const noperms = new MessageEmbed()
                        
                .setColor(client.embedColor)
                  .setDescription(` You must be connected to a voice channel to use this button`)
                return await interaction.followUp({embeds: [noperms], ephemeral: true})
            }
            if(interaction.member.voice.selfDeaf) {	
            let thing = new MessageEmbed()
              .setColor(client.embedColor)

            .setDescription(` <@${interaction.member.id}> You cannot use this button while deafened.`)
            return await interaction.followUp({embeds: [thing], ephemeral: true})
            }
            const botchannel = interaction.guild.me.voice.channel;
            const player = client.manager.players.get(interaction.guild.id);
            if(!player || !botchannel || !player.queue.current) {
                            const noperms = new MessageEmbed()
            
                .setColor(client.embedColor)
                .setDescription(` There is nothing playing in this server.`)
                return await interaction.followUp({embeds: [noperms], ephemeral: true})
            }
            if(player && channel.id !== player.voiceChannel) {
                                        const noperms = new MessageEmbed()
                .setColor(client.embedColor)
               .setDescription(` You must be connected to the same voice channel as me.`)
                return await interaction.followUp({embeds: [noperms], ephemeral: true})
            }
            const time = ("10s");
            const etime = require('ms')(time)
            let seektime = Number(player.position) - Number(etime) ;
    if (Number(seektime) >= player.queue.current.duration) seektime = player.queue.current.duration - 1000;
    player.seek(Number(seektime))
     let thing = new MessageEmbed()
       .setColor(client.embedColor)
       .setDescription(`Rewinded to \`${convertTime(player.position)}\``)
                return await interaction.channel.send({embeds: [thing]}).then(responce => {
                    setTimeout(() => {
                        try {
                            responce.delete().catch(() => {
                                return
                            })
                        } catch(err) {
                            return
                        }
                    }, 5000)
                });

        }

            //previous 
        if (interaction.customId === 'previous') {

            await interaction.deferUpdate();
            const djSchema = require('../../schema/djroleSchema')
            let djdata = await djSchema.findOne({
                guildID: interaction.guild.id,
            })
                if(djdata && !interaction.member.roles.cache.has(djdata.Roleid)) {
         
              const embed = new MessageEmbed()
                   .setColor(client.embedColor)
               .setDescription(`<@${interaction.member.id}> This command requires you to have ${djdata.Roleid}.`)
                   return await interaction.followUp({embeds: [embed],ephemeral: true});
             }
            if (!interaction.replied) await interaction.deferReply().catch(() => {});
            const { channel } = interaction.member.voice;
            if (!channel) {
                            const noperms = new MessageEmbed()
                      
                 .setColor(client.embedColor)
                   .setDescription(` You must be connected to a voice channel to use this button`)
                return await interaction.followUp({embeds: [noperms]});
            }
            if(interaction.member.voice.selfDeaf) {	
              let thing = new MessageEmbed()
               .setColor(client.embedColor)
      
             .setDescription(` <@${message.member.id}> You cannot use this button while deafened.`)
               return await interaction.followUp({embeds: [thing]});
             }
      
          let player = client.manager.get(interaction.guildId);
          if(player && channel.id !== player.voiceChannel) {
            const noperms = new MessageEmbed()
                .setColor(client.embedColor)
      .setDescription(` You must be connected to the same voice channel as me.`)
      return await interaction.followUp({embeds: [noperms]});
      }
      
          if (!player) player = client.manager.create({
            guild: interaction.guildId,
            textChannel: interaction.channelId,
            voiceChannel: interaction.member.voice.channelId,
            selfDeafen: true,
          });
      
      
          if (!player.queue.previous) {
              const noperms = new MessageEmbed()
      
              .setColor(client.embedColor)
        .setDescription(`No previous songs found`)
        return await interaction.followUp({embeds: [noperms]}).then(responce => {
            setTimeout(() => {
                try {
                    responce.delete().catch(() => {
                        return
                    })
                } catch(err) {
                    return
                }
            }, 5000)
        });;
        }
      
          const s = await player.search(player.queue.previous.uri, interaction.user);
          if (s.loadType === "LOAD_FAILED") {
            if (player && !player.queue.current) player.destroy();
            return await interaction.followUp({
              content: `Error while Loading track.`
            }).catch(() => {});
          } else if (s.loadType === "NO_MATCHES") {
            if (player && !player.queue.current) player.destroy();
            return await interaction.followUp({
              content: `No results found, try to be specific as possible.`
            }).catch(() => {});
          } else if (s.loadType === "TRACK_LOADED") {
            if (player && player.state !== "CONNECTED") player.connect();
            if (player) player.queue.add(s.tracks[0]);
            if (player && player.state === "CONNECTED" && !player.playing && !player.paused && !player.queue.size) player.play();
            return await interaction.followUp({
              embeds: [new MessageEmbed() .setColor(client.embedColor)
                .setDescription(`Queued [${s.tracks[0].title}](https://www.youtube.com/watch?v=dQw4w9WgXcQ) - [${interaction.member.user.tag}] `)]
            }).catch(() => {});
          } else if (s.loadType === "PLAYLIST_LOADED") {
            if (player && player.state !== "CONNECTED") player.connect();
            if (player) player.queue.add(s.tracks);
            if (player && player.state === "CONNECTED" && !player.playing && !player.paused && player.queue.totalSize === s.tracks.length) player.play();
      
            return await interaction.followUp({
              embeds: [new MessageEmbed().setColor(client.embedColor)
              .setDescription(`Queued **${s.tracks.length}** tracks from **${s.playlist.name}** - [${interaction.member.user.tag}]`)]
            }).catch(() => {})
          } else if (s.loadType === "SEARCH_RESULT") {
            if (player && player.state !== "CONNECTED") player.connect();
            if (player) player.queue.add(s.tracks[0]);
            if (player && player.state === "CONNECTED" && !player.playing && !player.paused && !player.queue.size) player.play();
            return await interaction.followUp({
              embeds: [new MessageEmbed().setColor(client.embedColor)
                .setDescription(`Queued [${s.tracks[0].title}](https://www.youtube.com/watch?v=dQw4w9WgXcQ) [\`${interaction.member.user.tag}\`]`)]
            }).then(responce => {
                setTimeout(() => {
                    try {
                        responce.delete().catch(() => {
                            return
                        })
                    } catch(err) {
                        return
                    }
                }, 5000)
            });
        }

        }





            //stop
        if (interaction.customId === 'stop') {

            await interaction.deferUpdate();
            const djSchema = require('../../schema/djroleSchema')
            let djdata = await djSchema.findOne({
                guildID: interaction.guild.id,
            })
                if(djdata && !interaction.member.roles.cache.has(djdata.Roleid)) {
         
              const embed = new MessageEmbed()
                   .setColor(client.embedColor)
               .setDescription(`<@${interaction.member.id}> This command requires you to have ${djdata.Roleid}.`)
                   return await interaction.followUp({embeds: [embed],ephemeral: true});
             }
            const { channel } = interaction.member.voice;
            if (!channel) {
                            const noperms = new MessageEmbed()
                        
                .setColor(client.embedColor)
                  .setDescription(` You must be connected to a voice channel to use this button`)
                return await interaction.followUp({embeds: [noperms], ephemeral: true})
            }
            if(interaction.member.voice.selfDeaf) {	
            let thing = new MessageEmbed()
              .setColor(client.embedColor)

            .setDescription(` <@${interaction.member.id}> You cannot use this button while deafened.`)
            return await interaction.followUp({embeds: [thing], ephemeral: true})
            }
            const botchannel = interaction.guild.me.voice.channel;
            const player = client.manager.players.get(interaction.guild.id);
            if(!player || !botchannel || !player.queue.current) {
                            const noperms = new MessageEmbed()
            
                .setColor(client.embedColor)
                .setDescription(` There is nothing playing in this server.`)
                return await interaction.followUp({embeds: [noperms], ephemeral: true})
            }
            if(player && channel.id !== player.voiceChannel) {
                                        const noperms = new MessageEmbed()
                .setColor(client.embedColor)
               .setDescription(` You must be connected to the same voice channel as me.`)
                return await interaction.followUp({embeds: [noperms], ephemeral: true})
            }
            const song = player.queue.current;
            const autoplay = player.get("autoplay")
            if (autoplay === true) {
                player.set("autoplay", false);
            }
            player.stop();
            player.queue.clear();
            let thing = new MessageEmbed()
                .setColor(client.embedColor)
                .setDescription(`${ok} Stopped the player and cleared the queue - <@!${interaction.member.id}>`)
                return await interaction.channel.send({embeds: [thing]}).then(responce => {
                    setTimeout(() => {
                        try {
                            responce.delete().catch(() => {
                                return
                            })
                        } catch(err) {
                            return
                        }
                    }, 5000)
                });

        }
        //show queue
        if (interaction.customId === 'showqueue') {

            await interaction.deferUpdate();
            const { channel } = interaction.member.voice;
            if (!channel) {
                            const noperms = new MessageEmbed()
            
                .setColor(client.embedColor)
                  .setDescription(` You must be connected to a voice channel to use this button`)
                return await interaction.followUp({embeds: [noperms], ephemeral: true})
            }
            if(interaction.member.voice.selfDeaf) {	
            let thing = new MessageEmbed()
              .setColor(client.embedColor)

            .setDescription(` <@${interaction.member.id}> You cannot use this button while deafened.`)
            return await interaction.followUp({embeds: [thing], ephemeral: true})
            }
            const botchannel = interaction.guild.me.voice.channel;
            const player = client.manager.players.get(interaction.guild.id);
            if(!player || !botchannel || !player.queue.length) {
                            const noperms = new MessageEmbed()
            
                .setColor(client.embedColor)
                .setDescription(`There is nothing playing in this server or there is no songs in the queue.`)
                return await interaction.followUp({embeds: [noperms], ephemeral: true})
            }
            if(player && channel.id !== player.voiceChannel) {
                                        const noperms = new MessageEmbed()
        .setColor(client.embedColor)
               .setDescription(` You must be connected to the same voice channel as me.`)
                return await interaction.followUp({embeds: [noperms], ephemeral: true})
            }
            const dbtrack = require('../../schema/trackinfoSchema.js')
   let   data = await dbtrack.findOne({
     Soundcloudtracklink: player.queue.current.uri,
 })
 if(data){
  const queue = player.queue.map((track, i) => { 
         return `${++i}. ${track.title}` 
  
  
})
            const chunked = chunk(queue, 10);
            const embeds = [];
            for (let i = 1; i <= chunked.length; ++i)
                embeds.push(new MessageEmbed().setColor(client.embedColor).setTitle(`${interaction.guild.name} Music Queue`).setDescription(`**Now playing**\n[${data.Spotifytracktitle}](${data.Spotifytracklink}) by [${data.Artistname}](${data.Artistlink})\n\n**Upcoming tracks**\n ${chunked[i - 1].join('\n')}`).setFooter(`Page ${i + 1}/${i.length}`));
            const button1 = new MessageButton().setCustomId('first').setLabel('First').setStyle('SECONDARY');
            const button2 = new MessageButton().setCustomId('back').setLabel('Back').setStyle('SECONDARY');
            const button3 = new MessageButton().setCustomId('next').setLabel('Next').setStyle('SECONDARY');
            const button4 = new MessageButton().setCustomId('last').setLabel('Last').setStyle('SECONDARY');
            const buttonList = [button1, button2, button3, button4];
            queuepaginationEmbed(interaction, embeds, buttonList, interaction.member.user, 30000);

   

    }else{
        const queue = player.queue.map((track, i) => { 
            return `${++i}. ${track.title} - \`${!track.isStream ? `${new Date(track.duration).toISOString().slice(11, 19)}` : '◉ LIVE'}\` `
     
     
    })
          
          
          
          const chunked = chunk(queue, 10);
          const embeds = [];
          for (let i = 1; i <= chunked.length; ++i)
              embeds.push(new MessageEmbed().setColor(client.embedColor).setTitle(`${interaction.guild.name} Music Queue`).setDescription(`**Now playing**\n${player.queue.current.title} -   \`${!player.queue.current.isStream ? `${new Date(player.queue.current.duration).toISOString().slice(11, 19)}` : '◉ LIVE'}\`\n\n**Upcoming tracks**\n ${chunked[i - 1].join('\n')}`).setFooter(`Page ${i + 1}/${i.length}`));
          const button1 = new MessageButton().setCustomId('first').setLabel('First').setStyle('SECONDARY');
          const button2 = new MessageButton().setCustomId('back').setLabel('Back').setStyle('SECONDARY');
          const button3 = new MessageButton().setCustomId('next').setLabel('Next').setStyle('SECONDARY');
          const button4 = new MessageButton().setCustomId('last').setLabel('Last').setStyle('SECONDARY');
          const buttonList = [button1, button2, button3, button4];
          queuepaginationEmbed(interaction, embeds, buttonList, interaction.member.user, 30000);
        }

        }
      
        //
              
            
            
            
              
                //user premium // guild premium //hasVoted
                if(interaction.isCommand()) {
                    
                    const SlashCommands = client.sls.get(interaction.commandName);
                    if(!SlashCommands) return;
                    if(SlashCommands.votelock){
                        const up = await upstats.findOne({
                            GuildID : interaction.guild.id,
                          })
                          const sp = await spstats.findOne({
                            UserID : interaction.member.id,
                          });
                          const voteok = await client.topgg.hasVoted(interaction.member.id);
                          if(!up && !sp && !voteok){
                            const row = new MessageActionRow()
                             .addComponents(
                             new MessageButton()   
                         .setLabel("Vote me")
                         .setStyle("LINK")
                        .setURL(`https://top.gg/bot/898941398538158080/vote`),
                      new MessageButton()   
                         .setLabel("Get Premium")
                         .setStyle("LINK")
                         .setURL(`https://www.patreon.com/alexmusicbot/membership`),
                            );
                                 const embed = new MessageEmbed()
                                .setAuthor("Vote me", interaction.member.user.displayAvatarURL({ dynamic: true}))
                                  .setColor(client.embedColor)                            
                       .setDescription(`You must [vote](https://top.gg/bot/898941398538158080/vote) me to use this button If you want to disable this [click here](https://www.patreon.com/alexmusicbot/membership) to buy premium and listen to 24/7 high quality without any restrictions.`)
                            return interaction.reply({embeds: [embed] , components: [row] ,ephemeral: true});
                        
                            
                        }
                        }


                        //slash command owneronly
                        if(SlashCommands.owneronly){
                            if(!ownerids.includes(interaction.member.id)){
                                const embed = new MessageEmbed()
                            .setAuthor("No Access", interaction.member.user.displayAvatarURL({ dynamic: true}))
                            .setColor(client.embedColor)
                                 .setDescription(`**Sorry You Can't Use This Command.**`)
                            return interaction.reply({embeds: [embed] ,ephemeral: true});
                            }
                        }
            
                        await SlashCommands.run(client, interaction)
                    }


        
    
            
            
    }

