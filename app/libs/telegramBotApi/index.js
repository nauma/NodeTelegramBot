"use strict";

const request = require("request");

module.exports = function(token) {
  this.token = token;
  this.on = (name, data, callback) => {
    request({
      url: "https://api.telegram.org/bot" + this.token + "/" + name
      , method: "GET"
      , json: data
    }, (error, response, body) => {
      if(error || response.statusCode !== 200) return;
      try {
        return callback(body);
      }
      catch(err) { }
    });
  };
}