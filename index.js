const telegramApi = require("node-telegram-bot-api");
const token = "5407394750:AAHb7y8UYoiKDLkkXDKFJfj2YTArt97PLvA";
const bot = new telegramApi(token, { polling: true });

const WolframAlphaAPI = require("wolfram-alpha-api");
const waApi = WolframAlphaAPI("YJ9Y5J-JAY7RX58XP");

console.log("Бот запущен");

bot.on("message", (msg) => {
  const chatId = msg.chat.id;
  const msgText = msg.text;

  bot.sendMessage(chatId, "Загрузка...");

  waApi
    .getFull(msgText)
    .then((queryresult) => {
      const pods = queryresult.pods;
      const plots = pods.find((pod) => pod.id == "Plot");
      const plotsCount = plots.numsubpods;
      for (let i = 0; i < plotsCount; i++) {
        let plotPhoto = plots.subpods[i].img.src;
        bot.sendPhoto(chatId, plotPhoto);
      }
    })
    .catch((e) => {
      bot.sendMessage(chatId, "Ошибка, возможно вы неправильно ввели функцию");
      console.log(e);
    });
});
