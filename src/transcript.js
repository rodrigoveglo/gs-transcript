const { req, post } = require("node-superfetch");
const Discord = require("discord.js");
const { Loga } = require("./colores.js");

class transcript {

  constructor(token) {
    if (!token) return Loga(["amarillo", "blanco", "azul", "rojo"], `<0>[gs-transcript Error] <1>Ocupas un <3>TOKEN <1>para poder usar este comando`);
    this.token = token;
  }
  
  async create(object) {
    if (typeof object == "Object")
      return Loga(
        ["amarillo", "blanco", "azul", "rojo"],
        `<0>[gs-transcript Error] <1>Uso <2>create(<3>{message, cantidad: 5}<2>)`
      );
    if (!object)
      return Loga(
        ["amarillo", "blanco", "azul", "rojo"],
        `<0>[gs-transcript Error] <1>Al comando <2>create() <1>le faltan datos, revisa nuestro discord para mas info <2>https://discord.gg/HEXJKtxBS2`
      );
    if (object && !object.message)
      return Loga(
        ["amarillo", "blanco", "azul", "rojo"],
        `<0>[gs-transcript Error] <1>Al comando <2>create() <1>le falta <2>create(<3>{message}<2>)`
      );
    if (object && !object.cantidad) object.cantidad = 50;
    let messages = new Discord.Collection();
    let channelMessagess = await object.message.channel.messages
      .fetch({ limit: object.cantidad })
      .catch((err) => console.log(err));
    messages = messages.concat(channelMessagess);
    let maxcatchs = 0;
    while (channelMessagess.size === 99) {
      if (maxcatchs == 4) break;
      let lastMessageId = channelMessagess.lastKey();
      channelMessagess = await object.message.channel.messages
        .fetch({ limit: object.cantidad, before: lastMessageId })
        .catch((err) => console.log(err));
      if (channelMessagess) messages = messages.concat(channelMessagess);
      maxcatchs++;
    }

    let mensajes = [];

    messages.forEach((messageper) => {
      let ContenidoPorMensaje = {
        attachments: messageper.attachments.map((a) => a.proxyURL),
        editedTimestamp: messageper.editedTimestamp,
        embeds: messageper.embeds,
        createdTimestamp: messageper.createdTimestamp,
        id: messageper.id,
        content: messageper.content,
        author: {
          dAvatar: `https://cdn.discordapp.com/avatars/${messageper.author.id}/${messageper.author.avatar}.webp`,
          id: messageper.author.id,
          username: messageper.author.username,
          tag: messageper.author.tag,
          client: messageper.author.client === undefined ? false : true,
        },

        members: messageper.mentions.members.map((a) => ({
          tag: a.user.tag,
          username: a.user.username,
          id: a.user.id,
        })),
        users: messageper.mentions.users.map((a) => ({
          tag: a.tag,
          username: a.username,
          id: a.id,
        })),
        roles: messageper.mentions.roles.map((a) => ({
          name: a.name,
          id: a.id,
        })),
        channels: messageper.mentions.channels.map((a) => ({
          name: a.name,
          id: a.id,
        })),
        crosspostedChannels: messageper.mentions.crosspostedChannels.map(
          (a) => ({ name: a.channelID, id: a.name })
        ),
      };

      
      mensajes.push(ContenidoPorMensaje);
    });

    let messagesss = {
      messages: mensajes,

      guild: {
        iconURL: `https://cdn.discordapp.com/icons/${object.message.guild.id}/${object.message.guild.icon}.png`,
        name: object.message.guild.name,
      },
      channel: {
        name: object.message.channel.name,
      },
      author: {
        tag: object.message.author.tag,
      },
    };

    let { body } = await post("http://apis.greenshieldbot.tk/api/gs-transcript").set("token", this.token).send(
      messagesss
    );
    

    let final = body.toString("utf8");

    if (final === "error en formato messages")
      Loga(
        ["amarillo", "blanco", "azul", "rojo"],
        `<0>[gs-transcript Error] <1>Se acaba de detectar un <3>error <0>del <3>Formato JSON (Messages)<1>, si ocupas ayuda puedes entrar a nuestro <2>discord: https://discord.gg/HEXJKtxBS2 <1>y abrir ticket `
      );
    if (final === "error en formato message") 
      Loga(
        ["amarillo", "blanco", "azul", "rojo"],
        `<0>[gs-transcript Error] <1>Se acaba de detectar un <3>error <0>del <3>Formato JSON (Message)<1>, si ocupas ayuda puedes entrar a nuestro <2>discord: https://discord.gg/HEXJKtxBS2 <1>y abrir ticket `
      );
    if (final === "Token Invalida") 
    Loga(
      ["amarillo", "blanco", "azul", "rojo"],
      `<0>[gs-transcript Error] <1>El <2>TOKEN <1>que agregaste <3>NO es valido, <1>Para conseguir tu token debes de solicitarlo en nuestro <2>Discord: https://discord.gg/HEXJKtxBS2`
    );
    return final;
  }
}

module.exports = transcript;
