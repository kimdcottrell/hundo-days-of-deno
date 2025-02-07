import { Server } from "https://deno.land/x/socket_io@0.2.1/mod.ts";
import { Application } from "https://deno.land/x/oak@14.2.0/mod.ts";
import * as crypto from "node:crypto";
const { scrypt } = await import('node:crypto');

// crypto.randomBytes is being ran sync here, which will cause a block in script processing.
// it is doing this because it needs to reach out to the OS for randomness via entropy
const settings = {
    path: `${Deno.cwd()}/src/chat`,
    random_setting: "this is to help test some syntax below",
    encryption_method: "aes-256-cbc",
    // the length of the is dependent on the cipher algorithm. 
    // aes-256 needs 256 bits for the key
    // bytes are 8 bits.
    // 256/8 = 32, so we need 32 bytes of generated data for the key.
    // for more reading: https://www.measuringknowhow.com/understanding-what-is-the-key-length-for-aes-256/
    secret_key_length: 32, 
    // aes is a block cipher. 
    // the iv is dependent on the length of the block.
    // the block must be 128 bits.
    // 128/8 = 16, so we need 16 bytes of generated data
    // for more reading: https://engineering.purdue.edu/kak/compsec/NewLectures/Lecture8.pdf
    secret_iv_length: 16,
    // handy dandy random string generator: https://api.wordpress.org/secret-key/1.1/salt/
    // yes, normally this would live in .env, but I don't care since this code exists for testing
    password: 'li/,{ng)S.x|LE8!-kqv-_T]kh=dgrwXrB;hN_-:Cq-]t`px{W!*qqbY+]#a~|sQ',
    salt: 'Rp4k5yJz;}-y!!bT+wWnPTz:,a,)r#E.b%cz|$8-oHpGl91#;G$ lm4gL_`uyy?S'
} 

const app = new Application();

app.use(async (ctx, next) => {
    try {
      await ctx.send({
        root: settings.path,
        index: "index.html",
      });
    } catch {
      await next();
    }
  });
  

const io = new Server();

const { password, salt, secret_key_length, secret_iv_length, encryption_method } = settings

// the in operator not working on arrays in javascript is a crime against humanity.
if ( !crypto.getCiphers().includes(encryption_method) ) {
  console.error(`${encryption_method} is missing. Please review the available ciphers in openssl. e.g. openssl enc -ciphers`);
}

// server
io.on("connection", (socket) => {
  console.log(`socket ${socket.id} connected`);

//   io.emit("hello", "world");
  socket.on('chat message', (msg) => {
    io.emit('chat message', msg);
  });

  socket.on("disconnect", (reason) => {
    console.log(`socket ${socket.id} disconnected due to ${reason}`);
  });
});

const handler = io.handler(async (req) => {
  return await app.handle(req) || new Response("501", { status: 501 });
});

Deno.serve({
  handler,
  port: 3000,
});

// test using cipher.update() and cipher.final()
scrypt(password, salt, secret_key_length, (err, key) => {
  if (err) throw err;
  // Then, we'll generate a random initialization vector
  crypto.randomFill(new Uint8Array(secret_iv_length), (err, iv) => {
    if (err) throw err;

    const cipher = crypto.createCipheriv(encryption_method, key, iv);

    let encrypted = cipher.update('some clear text data', 'utf8', 'hex');
    encrypted += cipher.final('hex');
    
    console.log(`encrypted string: ${encrypted}`);

    const decipher = crypto.createDecipheriv(encryption_method, key, iv);

    let decrypted = decipher.update(encrypted, 'hex', 'utf8');
    decrypted += decipher.final('utf8');
    console.log(`decrypted string: ${decrypted}`);
  });
});