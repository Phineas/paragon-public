const express = require('express'),
      app = express(),
      fs = require("fs"),
      log = require('fancy-log'),
      db = require("./db");

fs.readdir("./routes/", (err, files) => {
  if(err) console.error(err);

  let routeLinks = files.filter(f => f.split(".").pop() === "js");
  routeLinks.forEach((f, i) => {
      let props = require(`./routes/${f}`);
      console.log(`${i + 1}: ${f} Route loaded `);
      props(app);
  });
});

db.connect().then(db => {
  serve();
}).catch(err => {
  log.error(err);
})

function serve() {
  app.listen(3000, "127.0.0.1", function (){
    log("API -> Now listening for requests");
  });
}
