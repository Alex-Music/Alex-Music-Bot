const User = require("../../schema/blacklistSchema.js")
const { MessageEmbed, MessageActionRow, MessageButton } = require("discord.js");
module.exports = {
    name: "whitelist",
    category: "owner",
    aliases: ["allow"],
    description: "Whitelists a blacklisted user!",
    owneronly: true,
    execute: async (message, args, client, prefix) => {
          
    let ok = client.emoji.ok;
    let no = client.emoji.no;
        const aa = new MessageEmbed()
        .setDescription(`Please Provide A User Id...`)
        .setColor(client.embedColor)
    const aaa = new MessageEmbed()
        .setDescription(`Please Provide A Valid User ID`)
        .setColor(client.embedColor)
        if (!args[0]) return message.reply({ embeds: [aa] })
        if (!client.users.cache.has(args[0])) return message.reply({ embeds: [aaa] });

    
   User.findOne({
        UserID: args[0]
    }, async (err, data) => {
        if (!data) return message.reply(`\`\`\`\nNo Data Found\n\`\`\``);
        
        data.delete();
        const userop = args[0]
        const username = client.users.cache.get(userop)

        const lol = new MessageEmbed()
            .setDescription(`${ok} Successfully Removed **${username}** From backlist`)
            .setColor(client.embedColor)
        message.reply({ embeds: [lol] })
        
    })


            }
                
        }
    
    
    
