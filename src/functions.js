const Discord = require("discord.js");

const {
  MessageEmbed
} = require("discord.js");
const ms = require("ms")
const empty_begining = "["
const emptyend = "]"
const emptyframe  = "<:stolen_emoji:992359157183283230>"
const filled = "<:stolen_emoji:992359322325635082>"

 module.exports.duration = duration;
 module.exports.createBar = createBar;
 module.exports.format = format;

 module.exports.arrayMove = arrayMove;
function duration(ms) {
  const sec = Math.floor((ms / 1000) % 60).toString();
  const min = Math.floor((ms / (60 * 1000)) % 60).toString();
  const hrs = Math.floor((ms / (60 * 60 * 1000)) % 60).toString();
  const days = Math.floor((ms / (24 * 60 * 60 * 1000)) % 60).toString();
  return `${days}Days,${hrs}Hours,${min}Minutes,${sec}Seconds`;
}
function createBar(player) {
  try{
    let size = 15;
    if (!player.queue.current) return `**${empty_begining}${filled}${filed.repeat(size - 1)}${emptyend}**\n**00:00:00 / 00:00:00**`;
    let current = player.queue.current.duration !== 0 ? player.position : player.queue.current.duration;
    let total = player.queue.current.duration;
    let rightside = size - Math.round(size * (current / total));
    let leftside = Math.round(size * (current / total));
    let bar;
    if (leftside < 1) bar = String(empty_begining) + String(emptyframe).repeat(rightside) + String(emptyend);
    else bar = String(empty_begining) + String(filled).repeat(leftside) + String(emptyframe).repeat(rightside) + String(size - rightside !== 1 ? emptyend : emptyend);
    return `**${bar}**\n**${!player.queue.current.isStream ? `**${new Date(player.position).toISOString().substr(11, 8)} / ${new Date(player.queue.current.duration).toISOString().slice(11, 19)}**` : '`◉ LIVE`'}**`;
  }catch (e){
    console.log(String(e.stack).bgRed)
  }
}
function format(millis) {
  try {
    var h = Math.floor(millis / 3600000),
      m = Math.floor(millis / 60000),
      s = ((millis % 60000) / 1000).toFixed(0);
    if (h < 1) return (m < 10 ? "0" : "") + m + ":" + (s < 10 ? "0" : "") + s + "" + (Math.floor(millis / 1000)) + " Seconds";
    else return (h < 10 ? "0" : "") + h + ":" + (m < 10 ? "0" : "") + m + ":" + (s < 10 ? "0" : "") + s + "" + (Math.floor(millis / 1000)) + " Seconds";
  } catch (e) {
    console.log(String(e.stack).bgRed)
  }
}
function arrayMove(array, from, to) {
  try {
    array = [...array];
    const startIndex = from < 0 ? array.length + from : from;
    if (startIndex >= 0 && startIndex < array.length) {
      const endIndex = to < 0 ? array.length + to : to;
      const [item] = array.splice(from, 1);
      array.splice(endIndex, 0, item);
    }
    return array;
  } catch (e) {
    console.log(String(e.stack).bgRed)
  }
}








