module.exports = async (client, message) => {
  let prefix = client.config.prefix;

  const prefixMention = new RegExp(`^<@!?${client.user.id}> `);
  prefix = message.content.match(prefixMention) ? message.content.match(prefixMention)[0] : prefix;

  if (message.content.indexOf(prefix) !== 0) return;

  const args = message.content.slice(prefix.length).trim().split(/ +/g);
  const command = args.shift().toLowerCase();

  const cmd =
    client.commands.get(command) ||
    client.commands.find((x) => x.aliases && x.aliases.includes(command));

  if(cmd){
    cmd.run(client, message, args);
    client.CommandsRan++;
  } else return;

};
