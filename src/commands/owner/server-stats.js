const { MessageEmbed, MessageActionRow, MessageButton } = require("discord.js");
const { mem, cpu, os } = require('node-os-utils');
const { stripIndent } = require('common-tags');
const lawda = ('703949805457637471');
const moment = require('moment');
const bytes = require("bytes")

module.exports = {
  name: "server-stats",
  category: "owner",
  description: "Shows the vps stasts of the bot.",
  owner: false,
  execute: async (message, args, client, prefix) => {
    const totalSeconds = os.uptime();
    const realTotalSecs = Math.floor(totalSeconds % 60);
    const days = Math.floor((totalSeconds % (31536 * 100)) / 86400);
    const hours = Math.floor((totalSeconds / 3600) % 24);
    const mins = Math.floor((totalSeconds / 60) % 60);

    if(!message.member.id === lawda) return;
  

    const vps = new MessageEmbed()
        .setAuthor('Virtual Private Server Stats')
        .setColor(client.embedColor)
        .addField('Host', `${require('os').type()} ${require('os').arch()} `)
        .addField('CPU', `${require('os').cpus()[0].model}`)
        .addField('Uptime', `${days} days, ${hours} hours, ${mins} minutes, and ${realTotalSecs} seconds`)
        .addField('RAM', `${Math.round(require('os').totalmem() / 1024 / 1024)}mb`)
        .addField('Memory Usage', `${(process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2)} MB`)
        .addField('CPU Load', `${require('os').loadavg()[0].toFixed(2)}%`)
        .addField('CPU Cores', `${require('os').cpus().length}`)
        .addField(`SPEED`,`${require('os').cpus()[0].speed}Mhz`)
        .addField('Heap total', `${Math.round(process.memoryUsage().heapTotal / 1024 / 1024)}`)
        .addField(`Free memory`, `${Math.round(require('os').freemem() / 1024 / 1024)}mb`)
        .addField(`Node Version` ,`${process.version}`)
        .setFooter(`Developed with 🍣 by ! SuDhi <3#0335`)
        .setTimestamp();
        
        message.channel.send({embeds : [vps]})

  }
}; 

