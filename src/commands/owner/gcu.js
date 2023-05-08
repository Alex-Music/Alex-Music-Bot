const day = require("dayjs")
const { MessageEmbed, Message ,WebhookClient} = require("discord.js");
const web = new WebhookClient({ url: 'https://discord.com/api/webhooks/983156885467303978/DCiQQK7lr3a74DMF6t4MnwocLH-IDjJzB3NF_xeUKmzZSBfuAJtBKEZt_fliJSORJRhQ' }); 
const prettyMiliSeconds = require("pretty-ms");
const redeemCode= require("../../schema/redemcode")
const ms = require("ms");
module.exports = {
    name: "generatecode-user",
    category: "owner",
    aliases: ["gcu"],
    description: "Generates a user redeem code.",
    owneronly: true,
    options: [
        {
            name: "user",
            description: "Uuild Id Daal le Bsdk",
            required: true,
            type: "STRING"
        }
    ],  
    execute: async (message, args, client, prefix) => {
       
    
    let ok = client.emoji.ok;
    let no = client.emoji.no;

    if (!args[0]) {
        let xd = new MessageEmbed()
.setColor(client.embedColor)
.setDescription(`${no} | Please Provide A Time For Expiry`)
message.reply({ embeds: [ xd ] })
      }

      const Expiry = ms(args[0]) + Date.now();
      let Usage = 1;
      if (args[1] && !isNaN(args[1])) {
        Usage = args[1];
      }


      const Code = args[1];

      let success = new MessageEmbed()
.setTitle(`${ok} Code Added To Database`)
.setDescription(
`
\`\`\`
Code      :: ${Code}
Validity  :: ${prettyMiliSeconds(Expiry-Date.now())}
Usage     :: redeem ${Code}
\`\`\`
`)
.setColor(client.embedColor)
message.channel.send({embeds: [success]})
console.log()({embeds:[success]})

      const premObj = {
        Usage: Usage,
        Code: Code,
        Expiry: Expiry,
      };

      const saveCode = new redeemCode(premObj);
      await saveCode.save();

    
  }
    }
