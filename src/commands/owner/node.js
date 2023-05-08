const { MessageEmbed, MessageActionRow, MessageButton } = require("discord.js");


module.exports = {
  name: "node",
  category: "owner",
  description: "returns the node information..",
  owneronly: true,
  execute: async (message, args, client, prefix) => {
  
    let ok = client.emoji.ok;
    let no = client.emoji.no;
   
   
  
   
        let all = [];
        client.manager.nodes.map(node =>  {
            let info = [];
            info.push('\nNode-Info');
            info.push(`Node       :: KarthikOnTop Connected`);
            info.push(`Node Mem   :: ${Math.round(node.stats.memory.used / 1024 / 1024)}MB - ${(Math.round(node.stats.cpu.lavalinkLoad * 100) / 100).toFixed(2)}%`);
            info.push('Player-Info');
            info.push(`Player     :: ${node.stats.playingPlayers}/${node.stats.players}`);
            info.push(`Uptime     :: ${require('pretty-ms')(node.stats.uptime, { verbose: true, secondsDecimalDigits: 0 })}`);
            all.push(info.join('\n'));
        });
        const embed = new MessageEmbed().setColor(client.embedColor).setDescription(`\`\`\`nim\n${all.join('\n\n--------------------------------\n')}\`\`\``);
        message.reply({ embeds: [embed], allowedMentions: { repliedUser: false } });
    }
  }
