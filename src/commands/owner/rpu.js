const day = require("dayjs")
const { MessageEmbed, Message ,WebhookClient} = require("discord.js");
const web = new WebhookClient({ url: 'https://discord.com/api/webhooks/983156885467303978/DCiQQK7lr3a74DMF6t4MnwocLH-IDjJzB3NF_xeUKmzZSBfuAJtBKEZt_fliJSORJRhQ' }); 
const schema = require("../../schema/premium-user")
module.exports = {
    name: "removepremium-user",
    category: "owner",
    aliases: ["rpu"],
    description: "Removes a user in premiumlist",
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
        .setDescription(`Please Provide A User Id...`)
        .setColor(client.embedColor)
    const aaa = new MessageEmbed()
        .setDescription(`Please Provide A Valid User ID`)
        .setColor(client.embedColor)
        if (!args[0]) return message.reply({ embeds: [aa] })
        if (!client.users.cache.has(args[0])) return message.reply({ embeds: [aaa] });

    
    schema.findOne({
        UserID: args[0]
    }, async (err, data) => {
        if (!data) return message.reply(`\`\`\`\nNo Data Found\n\`\`\``);
        
        data.delete();
        const userop = args[0]
        const username = client.users.cache.get(userop)

        const lol = new MessageEmbed()
            .setDescription(`${ok} Successfully Removed **${username}** In Premium List`)
            .setColor(client.embedColor)
        message.reply({ embeds: [lol] })
        console.log()({embeds: [lol]})
    })


    }
}