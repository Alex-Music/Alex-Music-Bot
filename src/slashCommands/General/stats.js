const { MessageEmbed, MessageActionRow, MessageButton } = require("discord.js");
const { mem, cpu, os } = require('node-os-utils');
const { stripIndent } = require('common-tags');
const Discord = require("discord.js")
const bytes = require("bytes")


module.exports = {
    name: "stats",
    description: "Returns the stats of  the bot",
    owneronly : false,
    wl : true,
   
    run: async (client, interaction) => {

        await interaction.deferReply({
              ephemeral: false
          });  
          let ok = client.emoji.ok;
          let no = client.emoji.no;
          
          let users = await client.cluster.broadcastEval(c => c.guilds.cache.reduce((acc, guild) => acc + guild.memberCount, 0));
          let servers = await client.cluster.fetchClientValues('guilds.cache.size');
          let totalMembers = users.reduce((acc, memberCount) => acc + memberCount, 0);
          let totalServers = servers.reduce((prev, val) => prev + val);
         
         
          const memusage = process.memoryUsage();
          const { totalMemMb, usedMemMb } = await mem.info();
          
        
       

      
                const clmao = stripIndent`
             Total Servers       :: ${totalServers} guilds
             Total Users         :: ${totalMembers} users
             Server Uptime       :: ${require('pretty-ms')(require('os').uptime() * 1000)}
             Ping                :: ${client.ws.ping}
             Used Memory         :: ${Math.round(memusage.heapUsed / 1024 / 1024)}/${Math.round(memusage.heapTotal / 1024 / 1024)}mb
             Platform            :: ${await os.oos()}
             CPU                 :: ${cpu.model()}
             System Used         :: ${bytes(bytes(`${usedMemMb}MB`))}
             Platform            :: ${process.platform}
             Total Streams       :: ${client.manager.nodes.values().next().value.stats.players}
              `;
            
              const statsEmbed = new MessageEmbed()
              .setColor(client.embedColor)
              .setAuthor(`Alex Music Stats`, interaction.member.user.displayAvatarURL({ dynamic: true}))

            .setDescription(`\`\`\`asciidoc\n${clmao}\n\`\`\``)
          return interaction.followUp({embeds: [statsEmbed]})
        
  },
};
