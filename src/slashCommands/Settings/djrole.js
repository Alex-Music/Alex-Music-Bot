const { CommandInteraction, Client, MessageEmbed } = require("discord.js");

module.exports = {
    name: "djrole",
    description: "Enable or disable the DJ role.",
    owner: false,
    player: true,
    inVoiceChannel: true,
    sameVoiceChannel: true,
    votelock : true,
    wl : true,
    options: [
        {
          name: "role",
          description: "role for DJ",
          required: true,
          type: "ROLE"
          }
      ],
      votelock: true,


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
    
        if (!interaction.member.permissions.has('MANAGE_CHANNELS')) {
            const noperms = new MessageEmbed()
           .setColor(client.embedColor)
           .setDescription(`You need this required Permissions: \`MANAGE_CHANNELS\` to run this command.`)
           return await interaction.followUp({embeds: [noperms]});
        }
        const role = interaction.options.getRole("role");
        const dSchema = require('../../schema/djroleSchema.js');
        let data;
        try {
            data = await dSchema.findOne({
                guildID: interaction.guild.id
            })
            if(!data) {
                let newData = await dSchema.create({
                    guildID: interaction.guild.id,
                    Roleid: role.id,
                })
                newData.save();
            } else {
                await dSchema.findOneAndUpdate({
                    guildID: interaction.guild.id,
                    Roleid: role.id,
                })
            }
        } catch(err) {
            console.log(err)
        }
        const embed = new MessageEmbed()
        .setColor(client.embedColor)
             .setDescription(`${ok} DJ role mode is now **enabled** and set to <@&${role.id}>.`)
             return await interaction.editReply({ embeds : [embed]})
       }
     };