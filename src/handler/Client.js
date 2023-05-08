const { Client } = require("discord.js");const chalk = require("chalk");
const mongoose = require('mongoose');
const { Manager } = require("erela.js");
const { readdirSync } = require("fs");


/**
 * @param {Client} client
 */
module.exports = async (client) => {

    client.manager = new Manager({
        nodes: client.config.nodes,
        send: (id, payload) => {
            const guild = client.guilds.cache.get(id);
            if (guild) guild.shard.send(payload);
        },
        autoPlay: true,

       });
    
    client.on("raw", (d) => client.manager.updateVoiceState(d));




    /**
     * Mongodb connection
     */
    
    const dbOptions = {
        useNewUrlParser: true,
        autoIndex: false,
        connectTimeoutMS: 10000,
        family: 4,
        useUnifiedTopology: true,
      };
        mongoose.connect(client.config.mongourl, dbOptions);
        mongoose.Promise = global.Promise;
          mongoose.connection.on('connected', () => {
              console.log('Connected to MongoDB');
              });
          mongoose.connection.on('err', (err) => {
                  console.log(`Mongoose connection error: \n ${err.stack}`);
              });
          mongoose.connection.on('disconnected', () => {
                  console.log('MongoDB Disconnected');
              });
        
    /**
     * Error Handler
     */
    client.on("disconnect", () => console.log("Bot is disconnecting..."))
    client.on("reconnecting", () => console.log("Bot reconnecting..."))
    client.on('warn', error => { console.log(error)});
    client.on('error', error => { console.log(error)});
    process.on('unhandledRejection', error => { console.log(error)});
    process.on('uncaughtException', error => {console.log(error) });

 /**
 * Client Events
 */
readdirSync("./src/events/Client/").forEach(file => {
    const event = require(`../events/Client/${file}`);
    let eventName = file.split(".")[0];
   // client.logger.log(`Loading Events Client ${eventName}`);
    client.on(eventName, event.bind(null, client));
});

/**
 * Erela Manager Events
 */
readdirSync("./src/events/Player/").forEach(file => {
    const event = require(`../events/Player/${file}`);
    let eventName = file.split(".")[0];
  //  client.logger.log(`Loading Events Lavalink ${eventName}`);
    client.manager.on(eventName, event.bind(null, client));
});


const data = [];
readdirSync("./src/slashCommands/").forEach((dir) => {
        const slashCommandFile = readdirSync(`./src/slashCommands/${dir}/`).filter((files) => files.endsWith(".js"));
    
        for (const file of slashCommandFile) {
            const slashCommand = require(`../slashCommands/${dir}/${file}`);

            if(!slashCommand.name) return console.error(`slashCommandNameError: ${slashCommand.split(".")[0]} application command name is required.`);

            if(!slashCommand.description) return console.error(`slashCommandDescriptionError: ${slashCommand.split(".")[0]} application command description is required.`);

            client.sls.set(slashCommand.name, slashCommand);

            data.push(slashCommand);
        }
    });

    const data1 = [];
readdirSync("./src/commands/").forEach((dir) => {
        const CommandFile = readdirSync(`./src/commands/${dir}/`).filter((files) => files.endsWith(".js"));
    
        for (const file of CommandFile) {
            const command = require(`../commands/${dir}/${file}`);

            if(!command.name) return console.error(`commandNameError: ${command.split(".")[0]} Command name is required`);

            if(!command.description) return console.error(`commandDescriptionError: ${command.split(".")[0]} command description is required.`);

            client.commands.set(command.name, command);

            data1.push(command);
        }
    });
   

    client.on("ready", async () => {
         await client.application.commands.set(data).catch((e) => console.log(e));
    });

  

}
