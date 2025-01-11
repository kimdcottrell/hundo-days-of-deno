/**
 * Deno has a presently unstable logger library here: https://jsr.io/@std/log
 */

import * as log from "@std/log";
import { bold, red } from "jsr:@std/fmt@^1.0.4/colors";

log.setup({
    handlers: {
        default: new log.ConsoleHandler("DEBUG", {
            formatter: log.formatters.jsonFormatter,
            useColors: true,
        }),
        console: new log.ConsoleHandler("DEBUG")
    },
    loggers: {
        default: {
            level: "DEBUG",
            handlers: ["default"],
        },
        "test": {
            level: "DEBUG",
            handlers: ["console"],
        },
    }
});

console.error("this is from console.error()")
log.info("This is the message", { thisWillBe: "JSON.stringify'd"});
log.info({ thisWontBe: "JSON.stringify'd"}, "This is an argument");
log.debug("Hello, world!", 1, "two", [3, 4, 5], "is this okay?", "maybe.");
log.debug("Hey", 1, "two", [3, 4, 5]);

// const TEST_LOG = () => log.getLogger("test");
// TEST_LOG().debug("from test logger!")

function logger() {
    return log.getLogger("test");
}
  
function tesing_logger(){
    logger().debug(".debug ran on test logger")
}

tesing_logger();


