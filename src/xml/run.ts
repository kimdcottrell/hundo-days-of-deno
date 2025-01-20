import { JSDOM } from "npm:jsdom";

const xml = await Deno.readTextFile("/app/src/xml/pain001-partially-accepted.xml");
const doc = new JSDOM(xml, { contentType: "application/rss+xml"}).window.document;
console.log(doc.evaluate("//BICOrBEI", doc, null, 2, null).stringValue);