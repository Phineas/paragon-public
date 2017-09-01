const MongoClient = require('mongodb').MongoClient,
      log = require('fancy-log'),
      keys = require("../data/keys.json");

var url = "mongodb://" + keys.mongo.host + "/" + keys.mongo.database;

var api = {};

api.connect = function() {
  return new Promise(function(resolve, reject) {
    MongoClient.connect(url, function(err, db) {
      if(!err) {
        log.info("Database -> Connected to " + url)
        resolve(db);
      } else {
        reject(err);
      }
    });
  });
}

module.exports = api;
