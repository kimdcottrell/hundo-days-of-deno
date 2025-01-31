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

# Helpful reading
- [Deno Style Guide](https://docs.deno.com/runtime/contributing/style_guide/)
- [TypeScript Deep Dive](https://basarat.gitbook.io/typescript)
- [node-mysql2 docs](https://sidorares.github.io/node-mysql2/docs)
- [v8.dev blog article on async and promises](https://v8.dev/blog/fast-async)
- [Promises A+](https://promisesaplus.com/)
- [Pitfalls of using objects as maps](https://2ality.com/2012/01/objects-as-maps.html)]