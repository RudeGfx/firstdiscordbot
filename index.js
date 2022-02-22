const DiscordBot = require('./library/DiscordBot');

const client = new DiscordBot();

client.Build();

module.exports = client;