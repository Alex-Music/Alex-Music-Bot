const { MessageEmbed, WebhookClient } = require('discord.js');
module.exports = async (client, guild) => {
    let url = 'https://discord.com/api/webhooks/965261980678107146/Rjc9JPg47mvMSmBkFukjDb7UhE7trG-ux-VbKv4ltgZM5tSx5rHZqW-49CIBkEVwh_S3';
    const web = new WebhookClient({ url: url });
    if (!web) return;
        try {
            let servers = await client.cluster.fetchClientValues('guilds.cache.size');
            let totalServers = servers.reduce((prev, val) => prev + val);
         
            const owner = await guild.fetchOwner()
            const embed = new MessageEmbed()
            .setTitle("📤")
           .setColor(client.embedColor)
           
            .addField("Server Name", guild.name, true)
            .addField("ID", guild.id, true)
            .addField("Owner", `Tag - \`${owner.user.tag}\`\nID - \`${owner.id}\``, true)
            .addField("Members", `\`${guild.memberCount}\` `, true)
            .setFooter(`${client.user.username}`)
            .setFooter(`Bot - ${client.user.username} TS - ${totalServers}`)
            console.log()({ embeds: [embed] })
        } catch (e) {  }
    
    

}