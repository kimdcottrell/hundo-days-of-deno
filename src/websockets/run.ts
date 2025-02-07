
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

// generated from: https://xrpl.org/resources/dev-tools/xrp-faucets
xrpl.onopen = (e) => {
  console.log("CONNECTED");
  xrpl.send(`{
    "command": "account_info",
    "account": "rwLmQf4DtUffjwCvcTUVD8FBSNZPgdVK7",
    "queue": true,
    "ledger_index": "current"
  }`);
}

xrpl.onclose = (e) => {
  console.log("DISCONNECTED");
}

xrpl.onmessage = (e) => {
  console.log("Message from server: ", e.data);
}

xrpl.onerror = (error) => {
  console.log("ERROR:", error);
}

xrpl.close();
