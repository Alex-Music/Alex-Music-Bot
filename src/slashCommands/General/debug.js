const { MessageEmbed, CommandInteraction, Client } = require("discord.js")

module.exports = {
    name: "debug",
    description: "debug node info",
    wl : true,

    /**
     * 
     * @param {Client} client 
     * @param {CommandInteraction} interaction 
     */

    run: async (client, interaction) => {
        await interaction.deferReply({
          ephemeral: false
        });
          
    let ok = client.emoji.ok;
    let no = client.emoji.no;
    
        let state;
        try{
            state = client.manager.players.get(interaction.guild.id).state
        } catch(e){
            state = 'NOT_CONNECTED'
        }
         const embed = new MessageEmbed()
         .setTitle("Debug")
         .addField("Server Id", `\`\`\`js\n${interaction.guild.id}\`\`\``, true)
         .addField("Cluster Id", `\`\`\`js\n${interaction.guild.shard.id*1+1 }\`\`\``, true)
         .addField("Shard Id", `\`\`\`js\n${interaction.guild.shard.id*1+1 }\`\`\``, true)
         .addField("Guild Player state", `\`\`\`js\n${state}\`\`\``, true)
         .addField("Players", `\`\`\`js\n${client.manager.nodes.values().next().value.stats.playingPlayers}/${client.manager.nodes.values().next().value.stats.players}\`\`\``, true)
             .setColor(client.embedColor)
        await interaction.followUp({embeds: [embed]})
    }
}
