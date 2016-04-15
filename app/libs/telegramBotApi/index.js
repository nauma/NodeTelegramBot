"use strict";

let request = require("request");

module.exports = function(token) {
  this.token = token;
  let self = this;

  this.on = (name, data, callback) => {
    request({
      url: "https://api.telegram.org/bot" + self.token + "/" + name
      , method: "GET"
      , json: data

    }, (error, response, body) => {
      if(error || response.statusCode !== 200) return;
      try
      {
        return callback(body);
      }
      catch(err)
      {
        
      }
    });
  };
}