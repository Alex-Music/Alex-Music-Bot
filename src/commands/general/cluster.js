const { MessageEmbed, MessageActionRow, MessageButton } = require("discord.js");
const { mem, cpu, os } = require('node-os-utils');
const { stripIndent } = require('common-tags');
const moment = require('moment');
const Discord = require("discord.js")
const bytes = require("bytes")

module.exports = {
  name: "cluster",
  category: "general",
  description: "Shows the current cluster details!.",
  owner: false,
  wl : true,
  execute: async (message, args, client, prefix) => {

   
    let ok = client.emoji.ok;
    let no = client.emoji.no;
    let star = client.emoji.star

    let users = await client.cluster.broadcastEval(c => c.guilds.cache.reduce((acc, guild) => acc + guild.memberCount, 0));
    let servers = await client.cluster.fetchClientValues('guilds.cache.size');
    let totalMembers = users.reduce((acc, memberCount) => acc + memberCount, 0);
    let totalServers = servers.reduce((prev, val) => prev + val);
   
   
    const memusage = process.memoryUsage();
    const { totalMemMb, usedMemMb } = await mem.info();
    
    const d = moment.duration(client.uptime);
      const days = (d.days() == 1) ? `${d.days()}d` : `${d.days()}d`;
      const hours = (d.hours() == 1) ? `${d.hours()}h` : `${d.hours()}h`;
      const minutes = (d.minutes() == 1) ? `${d.minutes()}m` : `${d.minutes()}m`;
      const seconds = (d.seconds() == 1) ? `${d.seconds()}s` : `${d.seconds()}s`;
      const up = `${days}, ${hours}, ${minutes}, and ${seconds}`;

        
        const statsEmbed = new MessageEmbed()
        .setColor(client.embedColor)
        .setAuthor(`This Cluster Details`, message.member.user.displayAvatarURL({ dynamic: true}))
           
     
        .addFields (
            { name: `   Servers  `, value: `\`\`\`Total: ${client.guilds.cache.size} servers\`\`\``, inline: true },
            { name: `   Users  `, value: `\`\`\`Total: ${client.users.cache.size} users\`\`\``, inline: true },
            { name: `   Memory  `, value: `\`\`\`${Math.round(memusage.heapUsed / 1024 / 1024)}/${Math.round(memusage.heapTotal / 1024 / 1024)}mb\`\`\``, inline: true },
            { name: `   Uptime  `, value: `\`\`\`${up}\`\`\``, inline: true },
            { name: `   Cluster Ping  `, value: `\`\`\`${client.ws.ping}ms\`\`\``, inline: true },
            { name: `   Shard Id  `, value: `\`\`\`\n${message.guild.shardId}\n\`\`\``, inline: true },

          
        
        )
        .setFooter("Developed with ❤️ by Alex Team",client.user.displayAvatarURL())
message.channel.send({embeds : [statsEmbed]})
    }
}