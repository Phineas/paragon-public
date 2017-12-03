const Discord = require("discord.js"),
  request = require("request-promise"),
  apiHandler = require("./apiHandler"),
  log = require("fancy-log"),
  parasphere = new Discord.Client();

parasphere.on("ready", () => {
  log.info(`Manager -> Connected to Discord (${parasphere.guilds.size} guilds)`);
});

parasphere.on("message", (msg) => {

  //Set up the message to be logged
  let prioritisedMessageProperties = {
    id: msg.id,
    type: msg.channel.type,
    author: msg.author.id,
    channel: msg.channel.id,
    content: msg.content
  };

  if (prioritisedMessageProperties.type === "text") prioritisedMessageProperties.server = msg.guild.id;

  if (msg.attachments.first()) {
    prioritisedMessageProperties.proxyAttachment = msg.attachments.first().proxyURL;
  }

  //Log the message
  apiHandler.logMessage(prioritisedMessageProperties).then((response) => {
    log(`Logger -> Logged message by ${msg.author.username} [${response}]`);
  }).catch((err) => {
    log.error(err);
  });

});

apiHandler.requestToken().then((token) => {
  parasphere.login(token);
}).catch((err) => {
  log.error(err);
});
