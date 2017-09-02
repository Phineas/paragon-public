const db = require("../db"),
      log = require("fancy-log");

exports.log_message = function(req, res) {
  let messageProperties = req.body;
  messageProperties.timestamp = new Date().getTime();

  db.insert("messages", messageProperties).then((dbResponse) => {
    res.json({success: true, timestamp: messageProperties.timestamp});
  }).catch((err) => {
    res.json({success: false, err: err});
    log.error("Failed inserting a MongoDB document:", err);
  });
};
