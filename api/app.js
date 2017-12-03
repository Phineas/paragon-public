const express = require("express"),
      app = express(),
      fs = require("fs"),
      log = require("fancy-log"),
      bodyParser = require("body-parser"),
      db = require("./db");

app.use(bodyParser.json());

fs.readdir("./routes/", (err, files) => {
  if (err) log.error(err);

  let routeLinks = files.filter(f => f.split(".").pop() === "js");
  routeLinks.forEach((f, i) => {
    var props = require("./routes/" + f);
    log(`${i + 1}: ${f} Route loaded `);
    props(app);
  });
});

function serve() {
  app.listen(process.env.PORT || 8080, function() {
    log("API -> Now listening for requests");
  });
}

db.link().then((db) => {
  serve();
}).catch((err) => {
  log.error(err);
});
