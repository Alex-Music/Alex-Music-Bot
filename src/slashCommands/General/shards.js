const { MessageEmbed, MessageActionRow, MessageButton } = require("discord.js");
const { mem, cpu, os } = require('node-os-utils');
const { stripIndent } = require('common-tags');
const moment = require('moment');
const Discord = require("discord.js")
const bytes = require("bytes")

module.exports = {
    name: "shards",
    description: "shows the Alexmusics shards",
    wl : true,
   
    run: async (client, interaction) => {

        await interaction.deferReply({
              ephemeral: false
          });  
          let ok = client.emoji.ok;
          let no = client.emoji.no;
          
          const emee = new MessageEmbed()
          emee.setColor(client.embedColor)
          const { totalMemMb, usedMemMb } = await mem.info();
          let users = await client.cluster.broadcastEval(c => c.guilds.cache.reduce((acc, guild) => acc + guild.memberCount, 0));
          let servers = await client.cluster.fetchClientValues('guilds.cache.size');
          let ping = await client.cluster.fetchClientValues('ws.ping');
          let uptime = await client.cluster.fetchClientValues('uptime');
          let memoryUsage = await (process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2);
          let memory = await client.cluster.broadcastEval(async () => process.memoryUsage().rss);
                  const d = moment.duration(client.uptime);
                  const days = (d.days() == 1) ? `${d.days()}d` : `${d.days()}d`;
                  const hours = (d.hours() == 1) ? `${d.hours()}h` : `${d.hours()}h`;
                  const minutes = (d.minutes() == 1) ? `${d.minutes()}m` : `${d.minutes()}m`;
                  const seconds = (d.seconds() == 1) ? `${d.seconds()}s` : `${d.seconds()}s`;
                  const up = `${days}${hours}${minutes}${seconds}`;

                  for (let i = 0; i < client.cluster.info.TOTAL_SHARDS; i++) {
                    const status = client.cluster.mode === 'process' ? '<:online:968819259683770389>' : '<:dnd:968819300611817532>';
                    emee.addField(`${status} Shard ${i === interaction.guild.shardId ? i + '   <:location_alex:997428426380161024>' : i}`,
                        `\`\`\`ml\nServers: ${servers[i] || 'null'}\nUsers  : ${users[i] || 'null'}\nPing   : ${ping[i]}\nUptime : ${require('pretty-ms')(uptime[i]) || 'null'}\nMemory : ${Number(memoryUsage).toLocaleString()}mb\`\`\``, true);
                }
                let totalMembers = users.reduce((acc, memberCount) => acc + memberCount, 0);
                let totalServers = servers.reduce((prev, val) => prev + val);

                let totalMemory = memory.reduce((prev, val) => prev + val);
                let pingMedia = ping.reduce((prev, val) => prev + val);
                let media = pingMedia / client.cluster.info.TOTAL_SHARDS;
                emee.addField('<:idle:968819647170347048> Total', `\`\`\`ml\nTotalServers: ${totalServers}\nTotalMembers: ${totalMembers}\nTotalPlayers: ${client.manager.nodes.values().next().value.stats.players} \nTotalMemory : ${bytes(bytes(`${usedMemMb}MB`))}\nPing        : ${Math.round(media)}\`\`\``);
      
          return interaction.followUp({embeds: [emee]})
   
  },
};
