
const ws = new WebSocket('wss://ws.postman-echo.com/raw');
ws.addEventListener("message", (event) => {
  console.log("Message from server ", event.data);
});

ws.addEventListener("open", (event) => {
  ws.send("name=Kim");
});

// Listen for messages
ws.addEventListener("message", (event) => {
  console.log("Message from server ", event.data);
});

ws.close();

const xrpl = new WebSocket("wss://s.altnet.rippletest.net:51233/");

xrpl.addEventListener("message", (event) => {
  console.log("Message from server ", event.data);
});

xrpl.addEventListener("open", (event) => {
  xrpl.send(`{"command": "account_info",
  "account": "rwbBVR7HDoFzzMtE1o6VvJ29CK4mrEHbVz",
  "queue": true,
  "ledger_index": "current"
  }`);
});

xrpl.close();
