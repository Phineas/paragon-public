module.exports = function(app) {
  var logger = require("../controllers/logController");

  app.route("/v1/logMessage")
    .post(logger.log_message);
};
