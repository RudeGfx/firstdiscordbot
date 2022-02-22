const {Client, Collection,MessageEmbed} = require('discord.js');
const ConfigFetcher = require('../config');
const fs = require('fs');
const Logger = require("./Logger");
const logger = new Logger();

class DiscordBot extends Client {

    constructor(props = {intents: [32767]}){
        super(props);

        this.commands = new Collection();
        this.SlashCommands = new Collection();

        //config file
        this.config = ConfigFetcher;

        //load event and commands
        this.LoadEvents();
        this.LoadCommands();

    }

    LoadEvents(){
        fs.readdir('./events/', async (err, files) => {
            if (err) return console.error(err);
            files.forEach(file => {
              if (!file.endsWith('.js')) return;
              const evt = require(`../events/${file}`);
              let evtName = file.split('.')[0];
              this.on(evtName, evt.bind(null, this));
              logger.events(`Loaded event '${evtName}'`);
            });
        });
    }

    LoadCommands(){
      const categories = fs.readdirSync(__dirname + '/../commands/');
        categories.filter((cat) => !cat.endsWith('.js')).forEach((cat) => {
        const files = fs.readdirSync(__dirname + `/../commands/${cat}/`).filter((f) =>
          f.endsWith('.js')
        );
        files.forEach((file) => {
          let cmd = require(__dirname + `/../commands/${cat}/` + file);
          if(!cmd.name || !cmd.description || !cmd.run){
            return this.warn(`unable to load command: ${file.split(".")[0]}, Reason: File doesn't had run/name/desciption`);
          }
          let cmdName = cmd.name.toLowerCase();
          this.commands.set(cmdName, cmd);
          logger.commands(`Loaded command '${cmdName}'`);
        })
      });
    }

    log(Text){
        logger.log(Text);
    }

    warn(Text){
        logger.warn(Text);
    }

    error(Text){
        logger.error(Text);
    }

    Build(){
        this.warn('server is starting ...');
        this.login(this.config.Token);
    }

}

module.exports = DiscordBot;
