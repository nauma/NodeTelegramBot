"use strict";

module.exports.Basic = function Basic() {
  const
    fs      = require("fs")
  , botApi  = require("./libs/telegramBotApi");

  const
    Manifest= JSON.parse(fs.readFileSync(__dirname + "/../manifest.json", "utf8"))
  , Api     = new botApi(Manifest.access_token);

  let 
    limit   = 2
  , offset  = 0
  , methods = [];

  let runMethods = (data) => {
    try {
      methods.reverse();
      for(var i = methods.length-1; i >= 0; i--) {
        methods[i](data, Api);
      }
    }
    catch(err) { throw err; }
  };

  let checkUpdates = () => {
    Api.on("getUpdates", {limit: limit, offset: offset + 1}, (data) => {
      for(let i = data.result.length-1; i >= 0; i--) {
        offset = data.result[i].update_id;
        runMethods(data.result[i].message);
      }
    });
  };

  this.add = function() {
    for (let i = arguments.length-1; i >= 0; i--) {
      methods.push(arguments[i]);
    }
  };

  this.start = () => {
    setInterval(checkUpdates, Manifest.data.pause * 1000);
  };
};