import { retry } from "jsr:@std/async";
import { JSDOM } from "npm:jsdom"
import { toText } from "jsr:@std/streams";
// import { format } from "jsr:@std/datetime/format"; // turns out using unstable apis is a bad idea, TODO when this is stable

const NET_STATUS = await Deno.permissions.request({ name: "net" });
const RSS_RESPONSE = await retry(async () => { return fetch("https://kimdcottrell.com/posts/index.xml")}, {
    maxTimeout: 10000,
    maxAttempts: 3,
});

const status_checks = (
    NET_STATUS: Promise<PermissionStatus>,
    RSS_RESPONSE: Promise<Response>,
): Promise<void> => {
    if (NET_STATUS.state !== "granted") {
        throw new Error(`'net' permission is ${NET_STATUS.state}.`);
    }
    if (RSS_RESPONSE.ok !== true) {
        throw new Error(`Connection to RSS failed with error code ${RSS_RESPONSE.status}`);
    }
}

try {
    status_checks(NET_STATUS, RSS_RESPONSE);

    const STREAM = ReadableStream.from(RSS_RESPONSE.body);
    const TEXT = await toText(STREAM);

    // DOMParser is a web-api-only kind of thing, so we need to grab a package that feigns it
    const DOM = new JSDOM(TEXT, { contentType: "application/rss+xml"});
    const RSS_ITEMS = DOM.window.document.querySelectorAll("item");

    RSS_ITEMS.forEach(element => {
        const TITLE: string = element.querySelector("title").textContent;
        const LINK: string = element.querySelector("link").textContent;
        const DATE: string = element.querySelector("pubDate").textContent;
        console.log(`
Title: ${TITLE}
Link: ${LINK}
Published: ${DATE}
`)
    });

} catch (e) {
    console.error(e);
} 





