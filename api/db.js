const MongoClient = require("mongodb").MongoClient,
      log = require("fancy-log"),
      keys = require("../data/keys.json");

var url = "mongodb://" + keys.mongo.host + "/" + keys.mongo.database,
    api = {},
    inDb;

api.connect = function() {
  return new Promise(function(resolve, reject) {
    MongoClient.connect(url, function(err, db) {
      if(!err) {
        log.info("Database -> Connected to " + url);
        inDb = db;
        resolve(db);
      } else {
        reject(err);
      }
    });
  });
};

api.insert = function(collection, toInsert) {
  return new Promise(function(resolve, reject) {
    if(inDb) {
      var c = inDb.collection(collection);
      c.insert(toInsert, function(err, res) {
        if(!err) {
          resolve(res);
        } else {
          reject(err);
        }
      });
    } else {
      reject("indb_null");
    }
  });
};

module.exports = api;
