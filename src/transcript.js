const req = require("node-superfetch");
const Discord = require("discord.js");



class transcript{


    

    async correctTime(timestamp) {
        const mainTime = new Date(timestamp);
        let day, month, year, hour, minute, second;
        let modifier;
        day = mainTime.getDate();
        month = mainTime.getMonth() + 1;
        year = mainTime.getFullYear();
        hour = mainTime.getHours();
        minute = mainTime.getMinutes();
        second = mainTime.getSeconds();
        modifier = "AM";
        if (hour === 12) {
          modifier = "PM";
        }
        if (hour > 12) {
          hour -= 12;
          modifier = "PM";
        }
        return `${month}/${day}/${year}  ${hour}:${minute}:${second} ${modifier}`;
      }

      async rightColor(c) {
        if (/^#([a-f0-9]{3}){1,2}$/.test(c)) {
          if (c.length == 4) {
            c = "#" + [c[1], c[1], c[2], c[2], c[3], c[3]].join("");
          }
          c = "0x" + c.substring(1);
          return (
            "rgb(" + [(c >> 16) & 255, (c >> 8) & 255, c & 255].join(", ") + ", 255)"
          );
        }
        return "";
      }





  async create(message) {
    let messages = new Discord.Collection();
    let channelMessagess = await message.channel.messages
      .fetch({ limit: 99 })
      .catch((err) => console.log(err));
    messages = messages.concat(channelMessagess);
    let maxcatchs = 0;
    while (channelMessagess.size === 99) {
      if (maxcatchs == 4) break;
      let lastMessageId = channelMessagess.lastKey();
      channelMessagess = await message.channel.messages
        .fetch({ limit: 99, before: lastMessageId })
        .catch((err) => console.log(err));
      if (channelMessagess) messages = messages.concat(channelMessagess);
      maxcatchs++;
    }

    let messagea = {
      guild: message.guild,
      channel: message.channel,
      author: message.author,
    };

    let { body } = await req
      .get("http://localhost:3000/api/gs-transcript")
      .query({ message: JSON.stringify(messagea) });

    return body;
  }
}

module.exports = transcript;
