const day = require("dayjs")
const { MessageEmbed, Message, WebhookClient } = require("discord.js");
const web = new WebhookClient({ url: 'https://discord.com/api/webhooks/1004260296862486618/BL-lWHPt1jUeGOqw1opUq-tjHxpqaBGkZy2zW3_kPwVATAqJ-KVKPKPNSV6_7y9_xGVE' }); 
const schema = require("../../schema/premium-guild")
module.exports = {
    name: "addpremium-guild",
    category: "owner",
    aliases: ["apg"],
    description: "Adds a guild in premiumlist",
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

    
    schema.findOne({ Guild: args[0] }, async (err, data) => {

        if (data) data.delete();


        if (args[1]) {
            const Expire = day(args[1]).valueOf();

            new schema({
                GuildID: args[0],
                Expire: 0,
                Permanent: false
            }).save();

        } else {
            new schema({
                GuildID: args[0],
                Expire: 0,
                Permanent: true
            }).save();

        }
        const guildop = args[0]
        const guildname = client.guilds.cache.get(guildop)

        const lol = new MessageEmbed()
            .setDescription(`${ok} Successfully Added **${guildname.name}** In Premium List`)
            .setColor(client.embedColor)
        message.reply({ embeds: [lol] })
        console.log()({ embeds: [lol] })
    })


    }
}