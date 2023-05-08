const {Client,Intents, WebhookClient, MessageEmbed, MessageActionRow, MessageButton, Collection} = require("discord.js");
const { readdirSync } = require("fs");
const Cluster = require('discord-hybrid-sharding');

const Topgg = require("@top-gg/sdk")
const db = require('../src/schema/prefix.js');

const web = new WebhookClient({ url: 'Discord webhook url' }); 

const client = new Client({
 
    intents: ["GUILDS", "GUILD_MESSAGES", "GUILD_VOICE_STATES"],
    allowedMentions: { parse: ['users', 'roles'], repliedUser: true },
    shards: Cluster.data.SHARD_LIST, 
    shardCount: Cluster.data.TOTAL_SHARDS, 
    presence: {
      status:'online',
      activities: [{
        name: '!play | /play ', 
        type: 'LISTENING',
        url: 'twitch.com url if you use streaming activity'
      }]
    },
    fetchAllMembers: false,
    restTimeOffset: 0,
    restWsBridgetimeout: 100,
    disableEveryone: true,
    partials: ['MESSAGE', 'CHANNEL', 'REACTION']
});
const { AutoPoster } = require('topgg-autoposter')


client.cluster = new Cluster.Client(client);
module.exports = client;
client.topgg = new Topgg.Api("TOPGG API TO POST STATS") 
client.commands = new Collection();
client.alex = new Collection();
client.sls = new Collection();
client.config = require(".././config.json");
client.owner = client.config.ownerID;
client.prefix = client.config.prefix;
client.embedColor = client.config.embedColor;
client.aliases = new Collection();
client.commands = new Collection();
client.cooldowns = new Collection(); 
client.logger = require("./utils/logger.js");
client.emoji = require("./utils/emoji.json");
client.serverhost = "138.197.6.18"
require("./handler/Client")(client);
require('events').EventEmitter.defaultMaxListeners = 1000;
process.setMaxListeners(1000);
client.login(client.config.token);



process.on('unhandledRejection', (error) => {
 web.send(`\`\`\`js\n${error.stack}\`\`\``)
});
process.on("uncaughtException", (err, origin) => {
 web.send(`\`\`\`js\n${err.stack}\`\`\``)
})
process.on('uncaughtExceptionMonitor', (err, origin) => {
 web.send(`\`\`\`js\n${err.stack}\`\`\``)
});
process.on('beforeExit', (code) => {
 web.send(`\`\`\`js\n${code}\`\`\``)
});
process.on('exit', (code) => {
 web.send(`\`\`\`js\n${code}\`\`\``)
});
process.on('multipleResolves', (type, promise, reason) => {
});