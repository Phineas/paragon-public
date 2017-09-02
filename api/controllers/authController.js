const keys = require("../../data/keys.json"),
      config = require("../../data/config.json");

exports.get_token = function(req, res) {
  const token = keys.discord,
        ip = req.headers["x-forwarded-for"] || req.connection.remoteAddress;

  if(ip === "127.0.0.1" || "localhost" || config.remoteServerAddress) {
    res.json({success: true, token: token});
  } else {
    res.json({success: false, err: "unauthorized"});
  }
};
