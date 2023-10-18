const { Bot, session } = require("grammy");
const config = require("../config");

const commandsModule = require("./modules/commands");
const sherikModule = require("./modules/sherik");
const ishJoyModule = require("./modules/ish_joy");
const hodimModule = require("./modules/hodim");
const ustozModule = require("./modules/ustoz");
const shogirdModule = require("./modules/shogird");

const bot = new Bot(config.token);

bot.use(session({ initial: () => ({ step: "Ism" }) }));
bot.use(commandsModule);
bot.use(sherikModule);
bot.use(ishJoyModule);
bot.use(hodimModule);
bot.use(ustozModule);
bot.use(shogirdModule);

bot.start();