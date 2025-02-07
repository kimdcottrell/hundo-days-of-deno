import { Server } from "socket.io";

const app = Deno.serve({
	onListen({ path }) {
		console.log(
			`app server spun up`,
		);
	},
	port: 3000,
	hostname: '0.0.0.0',
}, (req) => {
	// if (req.headers.get('upgrade') != 'websocket') {
	// 	return new Response(null, { status: 501 });
	// }

	// const { socket, response } = Deno.upgradeWebSocket(req);

    // socket.whoami = req.headers.get('whoami');
	// socket.onopen = () => {
	// 	console.log(`a client connected! user: ${socket.whoami}`);
	// };
    return new Response(
        new TextEncoder().encode(`
<!doctype html>
<html>
<head>
<meta charset="utf-8"/>
<title>Marked in the browser</title>
</head>
<body>
<div id="content">hello world!</div>
<script src="https://cdn.socket.io/4.8.1/socket.io.min.js"></script>
<script>
const socket = io();
if (req.headers.get('json')) {
    const data = JSON.parse(req.headers.get('json'));
    socket.emit('chat message', input.value);
}
</script>
</body>
</html>
`)
);
});

const io = new Server(app);

io.on('connection', (socket) => {
    socket.on('chat message', (msg) => {
        console.log('message: ' + msg);
    });
});

  

// import * as readline from 'node:readline/promises';
// import { stdin as input, stdout as output } from 'node:process';

// Deno.serve({
// 	onListen({ path }) {
// 		console.log(
// 			`websocket server spun up`,
// 		);
// 	},
// 	port: 3000,
// 	hostname: '0.0.0.0',
// }, (req) => {
// 	if (req.headers.get('upgrade') != 'websocket') {
// 		return new Response(null, { status: 501 });
// 	}

// 	const { socket, response } = Deno.upgradeWebSocket(req);

//     socket.whoami = req.headers.get('whoami');
// 	socket.onopen = () => {
// 		console.log(`a client connected! user: ${socket.whoami}`);
// 	};

// 	socket.onmessage = (event) => {
//         const data = JSON.parse(event.data);

//         switch (data.event){
//             case "msg":
//                 if(socket.whoami === data.from){
//                     let summary = `sending message "${data.msg}" to ${data.to} as ${socket.whoami}`
//                     console.log(summary)
//                     socket.send(summary);
//                 }
//                 break;
//             case "ping":
//                 socket.send('pong');
//                 break;
//             default:
//                 socket.send('eh?');
//                 break;
//         }
        
// 	};
// 	return response;
// });
