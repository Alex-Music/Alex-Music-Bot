const Cluster = require('discord-hybrid-sharding');
const { config } = require('dotenv');

const manager = new Cluster.Manager(`src/bot.js`, {
    totalShards: 1, // or 'auto'
    /// Check below for more options
    shardsPerClusters: 1,
   totalClusters: 1,
    mode: 'process', // you can also choose "worker"
    token: config.token,
    keepAlive: {
        interval: 2000, // Interval to send a heartbea
        maxMissedHeartbeats: 5, // Maximum amount of missed Heartbeats until Cluster will get respawned
        maxClusterRestarts: 3, // Maximum Amount of restarts that can be performed in 1 hour in the HeartbeatSystem
    },
});

manager.on('clusterCreate', cluster => console.log(`Launched Cluster ${cluster.id}`));
manager.spawn({ timeout: -1 });