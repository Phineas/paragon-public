const config = require("../data/config.json"),
      request = require("request-promise"),
      log = require("fancy-log");

var api = {};

api.requestToken = function() {
  return new Promise(function(resolve, reject) {
    request.get({
      uri: "http://" + config.apiAddress + "/v1/getToken"
    }).then((token) => {
      let tokenJson = JSON.parse(token);
      if(tokenJson.success) {
        resolve(tokenJson.token);
      } else {
        reject(tokenJson.err);
      }
    }).catch((err) => {
      log.error(err);
    });
  });
};

api.logMessage = function(obj) {
  return new Promise(function(resolve, reject) {
    request.post({
      uri: "http://" + config.apiAddress + "/v1/logMessage",
      json: obj
    }).then((status) => {
      if(status.success) {
        resolve(status.timestamp);
      } else {
        reject(status.err);
      }
    }).catch((err) => {
      log.error(err);
    });
  });
};

module.exports = api;
