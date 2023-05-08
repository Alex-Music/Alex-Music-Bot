const { MessageEmbed, MessageActionRow, MessageButton } = require("discord.js");

const { inspect } = require('util')
module.exports = {
  name: "eval",
  category: "owner",
  description: "Evalutes something lol.",
  owneronly: true,
  execute: async (message, args, client, prefix) => {

     
    let ok = client.emoji.ok;
    let no = client.emoji.no;
   

      
    
   
       const player = client.manager.players.get(message.guild.id);
       try {
        const drow = new MessageActionRow()
        .addComponents(
    new MessageButton()
    .setLabel("Delete")
    .setStyle("DANGER")
    .setCustomId("evaldelete"),
        );
        const code = args.join(' ');
        if(code.toLowerCase().includes("token")){
            message.channel.send({ content: `\`\`\`js\nT0K3N\`\`\``, components: [drow]})
          }
          else{
         const result = await eval(code)
         
         let output = result; 
         if(typeof output !== 'string') {
           output = inspect(result)
         }
         
         if (output.length > 3990) {
    
    const sourcebin = require("sourcebin_js");
      await  sourcebin
          .create([
            {
              title: "JavaScript code",
              description: 'This code was created in "' + message.createdAt + '"',
              name: "Made By " + 'Alex Music Developers',
              content: output,
              languageId: "JavaScript"
            }
          ])
          .then(src => {

          
         return message.channel.send({ content: `\`\`\`js\n${src.url}\`\`\``, components: [drow]});
          })
          return;
           
        
          
        } 
    
           const adrow = new MessageActionRow()
           .addComponents(
       new MessageButton()
       .setLabel("Delete")
       .setStyle("DANGER")
       .setCustomId("evaldelete"),
           );
        return message.channel.send({ content: `\`\`\`js\n${result}\`\`\``, components: [adrow]});
          }
           
       } catch (error) {
                 
            const deletea = new MessageActionRow()
            .addComponents(
        new MessageButton()
        .setLabel("Delete")
        .setStyle("DANGER")
        .setCustomId("evaldelete"),
            );
         return message.reply({ content: `\`\`\`js\n${error}\`\`\``, components: [deletea]});
        }
    }
}