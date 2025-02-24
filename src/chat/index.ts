import { Server } from 'https://deno.land/x/socket_io@0.2.1/mod.ts';
import { Application, Router } from 'https://deno.land/x/oak@14.2.0/mod.ts';

const app = new Application();
const router = new Router();

router.get('/', async (ctx) => {
	const index = await Deno.readTextFile('/app/src/chat/index.html');
	try {
		ctx.response.headers.set('Content-Type', 'text/html');
		ctx.response.body = index;
	} catch {
		console.log('index is missing');
	}
});

app.use(router.routes());
app.use(router.allowedMethods());

const io = new Server({
	path: '/ws/',
});

// server
io.on('connection', (socket) => {
	console.log(`socket ${socket.id} connected`);

	//   io.emit("hello", "world");
	socket.on('chat message', (msg) => {
		io.emit('chat message', msg);
	});

	socket.on('disconnect', (reason) => {
		console.log(`socket ${socket.id} disconnected due to ${reason}`);
	});
});

const handler = io.handler(async (req) => {
	return await app.handle(req) || new Response('501', { status: 501 });
});

Deno.serve({
	handler,
	port: 4001,
});

// Deno.serve({ port: 4001 }, (req) => {
// 	console.log('Received request for', req.url);
// 	return new Response('Hello world');
// });
