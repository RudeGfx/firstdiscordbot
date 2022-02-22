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