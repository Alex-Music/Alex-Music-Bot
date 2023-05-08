const { MessageEmbed, MessageActionRow, MessageButton } = require("discord.js");
const { mem, cpu, os } = require('node-os-utils');
const { stripIndent } = require('common-tags');
const moment = require('moment');
const Discord = require("discord.js")
const bytes = require("bytes")

module.exports = {
  name: "stats",
  category: "general",
  description: "Shows the stasts of the bot.",
  owner: false,
  wl : true,
  execute: async (message, args, client, prefix) => {

   
    let ok = client.emoji.ok;
    let no = client.emoji.no;

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

        
          const clmao = stripIndent`
       Total Servers       :: ${totalServers} guilds
       Total Users         :: ${totalMembers} users
       Server Uptime       :: ${require('pretty-ms')(require('os').uptime() * 1000)}
       Ping                :: ${client.ws.ping}
       Used Memory         :: ${Math.round(memusage.heapUsed / 1024 / 1024)}/${Math.round(memusage.heapTotal / 1024 / 1024)}mb
       Platform            :: ${await os.oos()}
       CPU                 :: ${cpu.model()}
       System Used         :: ${bytes(bytes(`${usedMemMb}MB`))}
       Total Streams       :: ${client.manager.nodes.values().next().value.stats.players}
        `;
        
        const statsEmbed = new MessageEmbed()
        .setColor(client.embedColor)
        .setAuthor(`Alex Music Stats`, message.member.user.displayAvatarURL({ dynamic: true}))
         .addFields (
          { name: `   Servers  `, value: `\`${totalServers}\``, inline: true },
          { name: `   Users  `, value: `\`${totalMembers}\``, inline: true },
          { name: `   Shard Servers  `, value: `\`${client.guilds.cache.size}\``, inline: true },
          { name: `   Server Uptime  `, value: `\`${require('pretty-ms')(require('os').uptime() * 1000)}\``, inline: true },
          { name: `   Bot Memory  `, value: `\`${Math.round(memusage.heapUsed / 1024 / 1024)}/${Math.round(memusage.heapTotal / 1024 / 1024)}mb\``, inline: true },
          { name: `   Uptime  `, value: `\`${up}\``, inline: true },
          { name: `   System Memory  `, value: `\`${bytes(bytes(`${usedMemMb}MB`))}\``, inline: true },
          { name: `   Cluster Ping  `, value: `\`${client.ws.ping}ms\``, inline: true },
          { name: `   Players  `, value: `\`${client.manager.nodes.values().next().value.stats.players}\``, inline: true },
          { name: `   Shard Id  `, value: `\`${message.guild.shardId}\``, inline: true },
          { name: `   Node  `, value: `\`Alex_1\``, inline: true },
          { name: `   Guild Id  `, value: `\`${message.guildId}\``, inline: true }
      
      ) 
      .setThumbnail(client.user.displayAvatarURL())
       .setFooter("Developed with ❤️ by Alex Team",client.user.displayAvatarURL())
message.channel.send({embeds : [statsEmbed]})
    }
}