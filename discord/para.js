const Discord = require("discord.js"),
      request = require("request-promise"),
      apiHandler = require("./apiHandler"),
      log = require("fancy-log"),
      parasphere = new Discord.Client();

parasphere.on('ready', () => {
  log.info("Manager -> Connected to Discord (" + parasphere.guilds.size + " guilds)");
});

apiHandler.requestToken().then(token => {
  parasphere.login(token);
}).catch(err => {
  log.error(err);
});
