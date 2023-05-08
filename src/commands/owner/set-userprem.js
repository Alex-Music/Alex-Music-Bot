
const { MessageEmbed, Message ,WebhookClient} = require("discord.js");
const prettyMiliSeconds = require("pretty-ms");
const redeemCode= require("../../schema/redemcode.js")
const premiumGuild = require("../../schema/premium-user.js")
const web = new WebhookClient({ url: 'https://discord.com/api/webhooks/983156885467303978/DCiQQK7lr3a74DMF6t4MnwocLH-IDjJzB3NF_xeUKmzZSBfuAJtBKEZt_fliJSORJRhQ' }); 

module.exports = {
    name: "set-userprem",
    category: "owner",
    aliases: ["adduser"],
    description: "redeems a redem code",
    owneronly : true,
  
    
    execute: async (message, args, client, prefix) => {
       
    let ok = client.emoji.ok;
    let no = client.emoji.no;
    let member = message.mentions.members.first() || message.guild.members.cache.get(args[0]) || message.member;
    const isPremiumGuild = await premiumGuild.findOne({
        UserID: member.id
      })
      if (isPremiumGuild) {
        let alr = new MessageEmbed()
       .setAuthor(`${message.author.tag} - Redeem`, message.author.displayAvatarURL())
       .setDescription(`${no} | This User Already Have a Premium Subscribtion.`)
       .setColor(client.embedColor)
       message.channel.send({embeds: [alr]})
     } else if (!isPremiumGuild) {

     if (!args[1]) {
       return message.channel.send(`No Code Provided!!`)
     }

     const CodeOk = await redeemCode.findOne({ Code: args[1] });

     if (!CodeOk) {
       let exp = new MessageEmbed()
       .setAuthor(`${message.author.tag} - Redeem`, message.author.displayAvatarURL())
           .setDescription(`${no} | Code Is Invalid Or Expired`)
           .setColor(client.embedColor)
           message.channel.send({embeds: [exp]})
           
     }
    
     const newPrem = new premiumGuild({
       UserID: member.id,
       Expire: CodeOk.Expiry,
       Permanent: false,
     });

     await newPrem.save();

     if (CodeOk.Usage <= 1) {
       await CodeOk.delete();
     } else {
       await redeemCode.findOneAndUpdate({ Code: args[0] }, { Usage: CodeOk.Usage - 1 });
     }
     let success = new MessageEmbed()
     .setAuthor(`${member.tag} - Premium`, message.author.displayAvatarURL())
.setDescription(
`
${ok} | \`Alex Music Premium Activated Successfully\`
\`\`\`asciidoc
User       :: ${member.user.tag}
User Id    :: ${member.id}
Type       :: ${CodeOk.Expiry < Date.now() ? "Permanent" : "Temporary"}
Expiry     :: ${prettyMiliSeconds(CodeOk.Expiry - Date.now())}
By         :: ${message.member.user.username}
\`\`\`
`
)
.setColor(client.embedColor)

     message.channel.send({embeds: [success]})
     
     console.log()({embeds: [success]})
     }
    
  }
    }
