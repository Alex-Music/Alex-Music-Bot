const day = require("dayjs")
const { MessageEmbed, Message, WebhookClient } = require("discord.js");
const web = new WebhookClient({ url: 'https://discord.com/api/webhooks/983156885467303978/DCiQQK7lr3a74DMF6t4MnwocLH-IDjJzB3NF_xeUKmzZSBfuAJtBKEZt_fliJSORJRhQ' }); 
const schema = require("../../schema/premium-guild")
module.exports = {
    name: "removepremium-guild",
    category: "owner",
    aliases: ["rpg"],
    description: "Removes a guild in premiumlist",
    owneronly: true,
    options: [
        {
            name: "guild",
            description: "Guild Id Daal le Bsdk",
            required: true,
            type: "STRING"
        }
    ],  
    execute: async (message, args, client, prefix) => {
      
        
    let ok = client.emoji.ok;
    let no = client.emoji.no;
        const aa = new MessageEmbed()
        .setDescription(`Please Provide A Guild Id...`)
        .setColor(client.embedColor)
    const aaa = new MessageEmbed()
        .setDescription(`Please Provide A Valid Guild ID`)
        .setColor(client.embedColor)
    if (!args[0]) return message.reply({ embeds: [aa] })
    if (!client.guilds.cache.has(args[0])) return message.reply({ embeds: [aaa] });

    
    schema.findOne({
        Guild: args[0]
    }, async (err, data) => {
        if (!data) return message.reply(`\`\`\`\nNo Data Found\n\`\`\``);
        
        data.delete();
        const guildop = args[0]
        const guildname = client.guilds.cache.get(guildop)
        const lol = new MessageEmbed()
            .setDescription(`${ok} Successfully Removed **${guildname.name}** In Premium List`)
            .setColor(client.embedColor)
        message.reply({ embeds: [lol] })
        console.log()({embeds :[lol]})
    })


    }
}