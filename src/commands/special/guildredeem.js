
const { MessageEmbed, Message ,WebhookClient} = require("discord.js");
const prettyMiliSeconds = require("pretty-ms");
const web = new WebhookClient({ url: 'https://discord.com/api/webhooks/983156885467303978/DCiQQK7lr3a74DMF6t4MnwocLH-IDjJzB3NF_xeUKmzZSBfuAJtBKEZt_fliJSORJRhQ' }); 
const redeemCode= require("../../schema/redemcode.js")
const premiumGuild = require("../../schema/premium-guild.js")

module.exports = {
    name: "guild-redeem",
    category: "special",
    aliases: ["server-redeem"],
    wl : true,
    description: "redeems a redem code",
  
    
    execute: async (message, args, client, prefix) => {
       
    let ok = client.emoji.ok;
    let no = client.emoji.no;

    const isPremiumGuild = await premiumGuild.findOne({
        GuildID: message.guild.id
      })
      if (isPremiumGuild) {
        let alr = new MessageEmbed()
       .setAuthor(`${message.author.tag} - Redeem`, message.author.displayAvatarURL())
       .setDescription(`${no} | Server Is Already Premium`)
       .setColor(client.embedColor)
       message.channel.send({embeds: [alr]})
     } else if (!isPremiumGuild) {

     if (!args[0]) {
       return message.channel.send(`No Code Provided!!`)
     }

     const CodeOk = await redeemCode.findOne({ Code: args[0] });

     if (!CodeOk) {
       let exp = new MessageEmbed()
       .setAuthor(`${message.author.tag} - Redeem`, message.author.displayAvatarURL())
           .setDescription(`${no} | Code Is Invalid Or Expired`)
           .setColor(client.embedColor)
           message.channel.send({embeds: [exp]})
           
     }
  
     const newPrem = new premiumGuild({
       GuildID: message.guild.id,
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
     .setAuthor(`${message.author.tag} - Redeem`, message.author.displayAvatarURL())
.setDescription(
`
${ok} | \`Alex Music Premium Activated Successfully\`
\`\`\`asciidoc
Code       :: ${args[0]}
Usage      :: 1
Server     :: ${message.guild.name}
Server Id  :: ${message.guild.id}
Type       :: ${CodeOk.Expiry < Date.now() ? "Permanent" : "Temporary"}
Expiry     :: ${prettyMiliSeconds(CodeOk.Expiry - Date.now())}
In         :: ${message.guild.id}
\`\`\`
`
)
.setColor(client.embedColor)
     message.channel.send({embeds: [success]})
     console.log()({embeds: [success]})
     }
    
  }
    }
