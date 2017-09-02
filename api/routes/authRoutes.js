module.exports = function(app) {
  var auth = require("../controllers/authController");

  app.route("/v1/getToken")
    .get(auth.get_token);
};
