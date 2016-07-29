"use strict";

const 
  BotPlatform = require("./app/index.js")
, Bot = new BotPlatform.Basic();

let
  start = (data, api) => {
    if(data.text === "/start") {
      api.on("sendMessage", {
        chat_id: data.chat.id,
        text: "Send /help to get more commands"
      });
    }
  }
, help = (data, api) => {
    if(data.text === "/help") {
      api.on("sendMessage", {
        chat_id: data.chat.id,
        text: "This is help"
      });
    }
  };

Bot.add(start, help);
Bot.start();