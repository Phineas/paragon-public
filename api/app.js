const express = require("express"),
      app = express(),
      fs = require("fs"),
      log = require("fancy-log"),
      bodyParser = require("body-parser"),
      db = require("./db");

app.use(bodyParser.json());

fs.readdir("./routes/", (err, files) => {
  if(err) log.error(err);

  let routeLinks = files.filter(f => f.split(".").pop() === "js");
  routeLinks.forEach((f, i) => {
      let props = require(`./routes/${f}`);
      log(`${i + 1}: ${f} Route loaded `);
      props(app);
  });
});

function serve() {
  app.listen(3000, "127.0.0.1", function (){
    log("API -> Now listening for requests");
  });
}

db.connect().then((db) => {
  serve();
}).catch((err) => {
  log.error(err);
});
