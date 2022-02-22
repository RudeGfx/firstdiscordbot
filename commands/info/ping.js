module.exports = {
  name: 'ping',
  description: 'check if bot is online or not',
  run: async (client, message, args) => {
    message.channel.send(`${client.ws.ping}ms`);
  }
};
