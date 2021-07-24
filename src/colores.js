const paleta = {
    "morado": "\x1b[35m",
    "blanco": "\x1b[97m",
    "verde": "\x1b[32m",
    "azul": "\x1b[94m",
    "amarillo": "\x1b[33m",
    "rojo": "\x1b[31m"
  }
  module.exports = {
    Loga: (colores, mensaje) =>{
        for(var x = 0; x < colores.length; x++) mensaje = mensaje.replace(new RegExp(`<${x}>`, 'g'), paleta[colores[x]])
        return console.log(mensaje)
    }
}