![GreenApi](https://i.imgur.com/L1xnm3J.png)
# gs-transcript

  - Sistema de transcripts con un solo comando!!
  - Transcript con formato HTML5


## Informacion

* **General**
  * [Transcripts](#transcripts)
  * [Soporte](#soporte)

 

Estamos atentos a cualquier error que tengas, para poder ser atendido solo unete a nuestro [discord]( https://discord.gg/HEXJKtxBS2).

<a name="transcripts" />

### Transcripts

```js
const gstranscript = require('gs-transcript')
const gs = new gstranscript.transcript("TOKEN")
```

| Métodos | Descripción |
| ------ | ------ |
| [Crear](#crear-transcript) | Crear un transcript
| [Crear Buffer](#crear-transcript-buffer) | Crear un transcript en buffer


<a name="crear-transcript" />

#### Transcript: Crear

```js
gs.create({message, cantidad: ?})
```
* message - variable mensajes
* cantidad(Opcional) - Cantidades de mensajes para transcript (No mas de 99 mensajes)


#### Transcript: Ejemplo

``Con este ejemplo puedes hacer que el bot envie el transcript como archivo .html al canal indicado.``

```js
const resultado = new Discord.MessageAttachment(Buffer.from(await gs.create({message, cantidad: 50})), "transcript.html")
message.channel.send(resultado)
```

![Imagen Ejemplo](https://i.imgur.com/bA07L7w.png)


<a name="crear-transcript-buffer" />

#### Transcript: Convertir en Buffer

``Con este ejemplo puedes convertir el html5 en formato buffer.``

```js
let resultadobuffer = Buffer.from(await gs.create({message, cantidad: 50}))
console.log(resultadobuffer)
```
![Imagen Ejemplo](https://i.imgur.com/pTToPkI.png)

## GreenShield

<a name="soporte" />

#### Creadores
 * !EL_WTF89
  ```
    * ROL: Creador
    * ID Discord: 300503776681525251
    * Usuario Discord: !EL WTF89#3612
  ```
  
  * Discord Soporte: https://discord.gg/HEXJKtxBS2
