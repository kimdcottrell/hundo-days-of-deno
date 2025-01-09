// TODO: actually make a module instead of merely testing paths
// import { mkdwn } from "@tw-core/mkdwn";

export default {
  async fetch(request) {
    const JSON_ROUTE = new URLPattern({ pathname: "/json" });
    if (JSON_ROUTE.exec(request.url)) {
      return Response.json({ hello: "world" });
    }

    const url = new URL(request.url);
    let body = `
            Hello From:
            request.url = ${request.url}
            origin = ${url.origin}
            host = ${url.host}
            hostname = ${url.hostname}
            port = ${url.port}
            transport protocol = ${url.protocol}
            pathname = ${url.pathname}
        `;
    // for await (const dirEntry of Deno.readDir("./content")) {
    //   let filename = dirEntry.name;
    //   let route = filename.substr(0, filename.lastIndexOf("."));
    //   if (url.pathname == `/${route}`){
    //     body += `route: ${route}\n`;
    //     const decoder = new TextDecoder("utf-8");
    //     const data = await Deno.readFile(`./content/${filename}`);
    //     body += `file contents: ${mkdwn.parse(decoder.decode(data))}\n`;
    //     break;
    //   }
    // }

    return new Response(
      new TextEncoder().encode(`
<!doctype html>
<html>
<head>
  <meta charset="utf-8"/>
  <title>Marked in the browser</title>
</head>
<body>
  <div id="content">${body}</div>
</body>
</html>
`),
    );
  },
};
