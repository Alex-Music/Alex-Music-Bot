const { MessageEmbed, CommandInteraction, Client, IntegrationApplication, Integration } = require("discord.js")

module.exports = {
    name: "reload",
    description: "reloads a command!",
    options: [
        {
          name: "command",
          description: "The command you would like to reload",
          required: true,
          type: "STRING"
              }
        ],
        owneronly : true,
        wl : true,
    /**
     * 
     * @param {Client} client 
     * @param {CommandInteraction} interaction 
     */

    run: async (client, interaction) => {
        await interaction.deferReply({
            ephemeral: false
        });
          
    let ok = client.emoji.ok;
    let no = client.emoji.no;
    
           const args = interaction.options.getString("command");
           if (!args.length) return interaction.editReply(`mention command!`);
           const commandName = args;
           const command = interaction.client.commands.get(commandName)
               || interaction.client.commands.find(cmd => cmd.aliases && cmd.aliases.includes(commandName));
   
           if (!command) return interaction.editReply(`There is no command with name or alias \`${commandName}\`, <@${interaction.member.id}>.`);
   
           delete require.cache[require.resolve(`${process.cwd()}/src/commands/${command.category}/${command.name}.js`)];
   
   
           try {
               const newCommand = require(`${process.cwd()}/src/commands/${command.category}/${command.name}.js`);
               interaction.client.commands.set(newCommand.name, newCommand);
               interaction.editReply({ content: `Reloaded \`${args}\`` });
           } catch (error) {
               console.error(error);
               integration.editReply(`There was an error while reloading a command \`${command.name}\`:\n\`${error.message}\``);
           }
       }
}
