const req = require('node-superfetch')
async function fetchTranscript(message) {
    let messages = new Discord.Collection();
        let channelMessages = await message.channel.messages.fetch({ limit: 99 }).catch(err => console.log(err));
        messages = messages.concat(channelMessages);
        let maxcatch = 0
        while (channelMessages.size === 99) {
            if (maxcatch == 4) break;
            let lastMessageId = channelMessages.lastKey();
            channelMessages = await message.channel.messages.fetch({ limit: 99, before: lastMessageId }).catch(err => console.log(err));
            if (channelMessages)
                messages = messages.concat(channelMessages);
            maxcatch++;
        }
    }

    function rightColor(c) {
        if (/^#([a-f0-9]{3}){1,2}$/.test(c)) {
            if (c.length == 4) {
                c = '#' + [c[1], c[1], c[2], c[2], c[3], c[3]].join('');
            }
            c = '0x' + c.substring(1);
            return 'rgb(' + [(c >> 16) & 255, (c >> 8) & 255, c & 255].join(', ') + ', 255)';
        }
        return '';
    }
function correctTime(timestamp) {
    
        const mainTime = new Date(timestamp);
        let day, month, year, hour, minute, second;
        let modifier; 
        day = mainTime.getDate();
        month = mainTime.getMonth() + 1;
        year = mainTime.getFullYear();
        hour = mainTime.getHours();
        minute = mainTime.getMinutes();
        second = mainTime.getSeconds();
        modifier = 'AM';
        if (hour === 12) { modifier = "PM" }
        if (hour > 12) {
            hour -= 12;
            modifier = 'PM'
        }
        return `${month}/${day}/${year}  ${hour}:${minute}:${second} ${modifier}`;
    }
class transcripts {

    /**
   * @param {string} token
   */
  constructor(token) {
    if (!token) throw new ZeewError("Debes Colocar un Token");
    this.token = token;
    this.uri = "https://localhost:3000/api/gs-transcript";
  }


  async create() {

  }


            async create(message) {
                let messages = new Discord.Collection();
                    let channelMessages = await message.channel.messages.fetch({ limit: 99 }).catch(err => console.log(err));
                    messages = messages.concat(channelMessages);
                    let maxcatch = 0
                    while (channelMessages.size === 99) {
                        if (maxcatch == 4) break;
                        let lastMessageId = channelMessages.lastKey();
                        channelMessages = await message.channel.messages.fetch({ limit: 99, before: lastMessageId }).catch(err => console.log(err));
                        if (channelMessages)
                            messages = messages.concat(channelMessages);
                        maxcatch++;
                    }
            
            const today = new Date();
    
            let message = {"guild": message.guild, "channel": message.channel, "author": message.author, }
    
            let {body} = await req.get("http://localhost:3000/api/gs-transcript").query({"message": JSON.stringify(message)})
    
            console.log(body);
    
        }


}


    module.exports = { transcripts };



