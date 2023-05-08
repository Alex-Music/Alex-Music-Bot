const { CommandInteraction, Client, MessageEmbed } = require("discord.js");
const twentyfourseven = require("../../schema/twentyfourseven")
module.exports = {
    name: "247",
    description: "Stays 24/7 in voice channel with the options to enable or disable it.",
    owner: false,
    player: true,
    inVoiceChannel: true,
    sameVoiceChannel: true,
    votelock: true,
    djonly :true,
    wl : true,

    /**
     * @param {Client} client
     * @param {CommandInteraction} interaction
     */

    run: async (client, interaction, prefix ) => {
        await interaction.deferReply({
          ephemeral: false
        });
          
    let ok = client.emoji.ok;
    let no = client.emoji.no;
    
        if (!interaction.member.permissions.has('MANAGE_CHANNELS')) {
          const noperms = new MessageEmbed()
         .setColor(client.embedColor)
         .setDescription(`${no} You need this required Permissions: \`MANAGE_CHANNELS\` to run this command.`)
    return await interaction.followUp({embeds: [noperms]});
      }
      const { channel } = interaction.member.voice;
      if (!channel) {
                      const noperms = new MessageEmbed()
                     
           .setColor(client.embedColor)
             .setDescription(`${no} You must be connected to a voice channel to use this command.`)
          return await interaction.followUp({embeds: [noperms]});
      }
     
		



    const player = client.manager.players.get(interaction.guild.id);
    if(!player){
      const jplayer = interaction.client.manager.create({
        guild: interaction.guild.id,
        voiceChannel: channel.id,
        textChannel: interaction.channel.id,
        selfDeafen: true,
    });
    await jplayer.connect();
    }
     let   data = await twentyfourseven.findOne({
            guildID: interaction.guild.id
        })
        if(!data) {
          const { channel } = interaction.member.voice;
            let newData = await twentyfourseven.create({
              guildID: interaction.guild.id,
              voiceChannel: channel.id,
              textChannel: interaction.channel.id
            })
            newData.save();
            const embed = new MessageEmbed()
            .setColor(interaction.client.embedColor)
            .setDescription(`${ok} 24/7 mode is now \`enabled\`.`)
            return await interaction.editReply({ embeds : [embed]})
        }else{
              await  twentyfourseven.deleteMany({ guildID: interaction.guild.id });
              const embed = new MessageEmbed()
              .setColor(interaction.client.embedColor)
              .setDescription(`${ok} 24/7 mode is now \`disabled\`.`)
              return await interaction.editReply({ embeds : [embed]})
          
        }
     
       }
     };