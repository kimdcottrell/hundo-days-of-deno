# 100 (Hundo) Days of Deno

This is a repo tracking my first 100 days learning Typescript and Deno. Aiming to do a little bit each day.

Each dir in `/src` represents a new part of the Deno API or packages that I am exploring. 

# Tracker

Day | API/Package | Location
---|---|---
1/100 | Deno.readDir | src/readdir
2/100 | deno-cli fmt && deno-cli lint | deno.json
3/100 | Deno.readDir idea better replaced by jsr:@std/fs/walk as proven by Deno.bench | src/readdir
4/100 | jsr:@std/log && console | src/logging
5/100 | Deno.telemetry and grafana | standing up grafana locally outside this repo
6/100 | Deno.permissions, std.streams, std.async | src/rss 
7/100 | Deno.websockets | src/websockets
8/100 | JSDOM and xpath processing | src/xml
9/100 | Deno.serve - attempting to demonstrate self-made webhooks and a monitor endpoint | src/webhooks
10/100 | webhooks p2, binary search | src/webhooks, src/leetcode
11/100 | learning the basics of node:crypto | src/crypto/symmetric_encryption.ts
12/100 | learning basics of node:crypto; playing with socket.io; realizing src/chat needs to be its own repo with either a bundler or deno's fresh | src/crypto, src/chat
13/100 | devcontainer and vscode setup | .devcontainer, .vscode
14/100 | deno + fresh experiments | private repo
15/100 | deno + vite experiments | private repo
16/100 | deno + nextjs experiments | private repo
17/100 | updating deno to 2.2.1, setting up otel and the ltfm stack | images/app.Dockerfile, src/chat

# Helpful reading
- [Deno Style Guide](https://docs.deno.com/runtime/contributing/style_guide/)
- [TypeScript Deep Dive](https://basarat.gitbook.io/typescript)
- [node-mysql2 docs](https://sidorares.github.io/node-mysql2/docs)
- [v8.dev blog article on async and promises](https://v8.dev/blog/fast-async)
- [Promises A+](https://promisesaplus.com/)
- [Pitfalls of using objects as maps](https://2ality.com/2012/01/objects-as-maps.html)]
