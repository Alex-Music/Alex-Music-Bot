const day = require("dayjs")
const { MessageEmbed, Message ,WebhookClient} = require("discord.js");
const web = new WebhookClient({ url: 'https://discord.com/api/webhooks/983156885467303978/DCiQQK7lr3a74DMF6t4MnwocLH-IDjJzB3NF_xeUKmzZSBfuAJtBKEZt_fliJSORJRhQ' }); 
const schema = require("../../schema/premium-user")

module.exports = {
    name: "addpremium-user",
    category: "premium",
    aliases: ["aup"],
    description: "Adds a user in premiumlist",
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

    if (!args[0]) return message.reply({ embeds: [aa] })

    
    schema.findOne({ UserID: args[0] }, async (err, data) => {

        if (data) data.delete();


        if (args[1]) {
            const Expire = day(args[1]).valueOf();

            new schema({
                UserID: args[0],
                Expire: 0,
                Permanent: false
            }).save();

        } else {
            new schema({
                UserID: args[0],
                Expire: 0,
                Permanent: true
            }).save();

        }
        const userop = args[0]
        const username = client.users.cache.get(userop)

        const lol = new MessageEmbed()
            .setDescription(`${ok} Successfully Added **${username}** In Premium List`)
            .setColor(client.embedColor)
        message.reply({ embeds: [lol] })
        console.log()({embeds:[lol]})
    })


    }
}