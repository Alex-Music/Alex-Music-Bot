const { Client} = require("discord.js");
const { MessageEmbed, MessageActionRow, MessageButton } = require("discord.js");
const { readdirSync } = require("fs");
const prefix = require("../../../config.json").prefix;

module.exports = {
  name: "help",
  category: "general",
  description: "Shows the help menu / commands list of the bot. ",
  owner: false,
  wl : true,
  execute: async (message, args, client, prefix) => {

   
    let ok = client.emoji.ok;
    let no = client.emoji.no;
    const em = args.join(" ");
    if(!em){

    let categories = [];

    readdirSync("./src/commands/").forEach((dir) => {
      const commands = readdirSync(`./src/commands/${dir}/`).filter((file) =>
        file.endsWith(".js")
      );
      if(dir === "owner") return;
      if(dir === "playlists") return;
      const cmds = commands.map((command) => {
        let file = require(`../../commands/${dir}/${command}`);

        if (!file.name) return "No command name.";

        let name = file.name.replace(".js", "");
        let description = file.description;

        return `\`${name}\``;
      });

      let data = new Object();

      data = {
        name: `${dir} [${cmds.length}]`,
        value: cmds.length === 0 ? "In progress." : cmds.join(", "),
      };

      categories.push(data);
    });

    
    const row = new MessageActionRow()
    .addComponents(
      new MessageButton()
  .setLabel("Support Server")
  .setStyle("LINK")
  .setURL(`https://discord.gg/pCj2UBbwST`),
  new MessageButton()
  .setLabel("Invite Me")
  .setStyle("LINK")
  .setURL(`https://discord.com/api/oauth2/authorize?client_id=${client.user.id}&permissions=37088600&scope=bot%20applications.commands`),
  new MessageButton()
  .setLabel("Vote")
  .setStyle("LINK")
  .setURL(`https://top.gg/bot/898941398538158080/vote`),
    );

    const embed = new MessageEmbed()
    .addFields(categories)
     .setFooter("Developed with ❤️ by Alex Team",client.user.displayAvatarURL())
    .setAuthor(`${client.user.username} Commands`, client.user.displayAvatarURL({ dynamic: true}))
    .setDescription(`**💌 Check your user profile by using**\n\`${prefix}profile\` or \`${prefix}profile <user_id>\`.\nAlso don't forget to vote us daily on [Top.gg!](https://top.gg/bot/898941398538158080/vote)`)
      .setColor(client.embedColor)
  

.setColor(client.embedColor)
message.channel.send({embeds : [embed], components : [row]})
    }
    else {
        const command =
        client.sls.get(em) 
        if (!command) {
          const embed = new MessageEmbed()
          .setDescription(`Couldn't find matching command name.`)
          .setColor(client.embedColor)
          return message.channel.send({ embeds: [embed] });
        }
  
        const embed = new MessageEmbed()
      .setDescription(`> Aliases: ${command.aliases
        ? `\`${command.aliases.join("` `")}\``
        : "No aliases for this command."}\n> Usage: ${command.usage
          ? `\`${prefix}${command.name} ${command.usage}\``
          : `not found`}\n> Description: ${command.description
            ? command.description
            : "No description for this command."}`)
        .setColor(client.embedColor)
        return message.channel.send({ embeds: [embed] });
      }//
    
  
},
}