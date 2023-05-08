
const { MessageEmbed, Message ,WebhookClient} = require("discord.js");
const web = new WebhookClient({ url: 'https://discord.com/api/webhooks/983156885467303978/DCiQQK7lr3a74DMF6t4MnwocLH-IDjJzB3NF_xeUKmzZSBfuAJtBKEZt_fliJSORJRhQ' }); 
const prettyMiliSeconds = require("pretty-ms");
const day = require("dayjs");

const premiumUser = require("../../schema/premium-user.js")
module.exports = {
    name: "user-validity",
    category: "special",
    aliases: ["member-validity"],
    wl : true,
    description: "Shows The Member/User Premium Subscription Validity",
    
    options: [
        {
            name: "guild",
            description: "Guild Id Daal le Bsdk",
            required: true,
            type: "STRING"
        }
    ],  
    execute: async (message, args, client, prefix) => {
       
        const isPremium = await premiumUser.findOne({
            UserID: message.member.id,
          });
    
          if (!isPremium) {
            let noprem = new MessageEmbed()
            .setAuthor(`${message.author.tag} - Validity`, message.author.displayAvatarURL())
    .setDescription(`You have  No Premium Subscription`)
    .setColor(client.embedColor)
     message.channel.send({ embeds: [noprem] })
     
          } else {
            if (isPremium.Expire < Date.now() && !isPremium.Permanent) {
              await isPremium.delete();
              let expired = new MessageEmbed()
              .setAuthor(`${message.author.tag} - Validity`, message.author.displayAvatarURL())
              .setDescription(`Premium Expired On \`${day(isPremium.Expire)}\``)
              .setColor(client.embedColor)
              return message.channel.send({
                embeds: [expired]
              })
            }
            
            if (!isPremium.Permanent) {
              let premp = new MessageEmbed()
              .setAuthor(`${message.author.tag} - Validity`, message.author.displayAvatarURL())
              .setDescription(`Premium Will Expire In : \`${prettyMiliSeconds(isPremium.Expire-Date.now())}\``)
              .setColor(client.embedColor)
              return message.channel.send({
                embeds: [premp]
              })
            }
            let prem = new MessageEmbed()
              .setAuthor(`${message.author.tag} - Validity`, message.author.displayAvatarURL())
              .setDescription(`Premium Will Expire : \`Never\``)
              .setColor(client.embedColor)
              return message.channel.send({
                embeds: [prem]
              })
          
            }
        }
    }
