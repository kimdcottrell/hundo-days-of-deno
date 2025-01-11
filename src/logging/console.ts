/**
 * Deno tries to be web standards compliant wherever possible, so we're testing whatwg's console
 * logging capabilities thru Deno's console implementation.
 * https://console.spec.whatwg.org/
 * https://docs.deno.com/api/web/~/Console 
 */

import chalk from "chalk";

console.log(".log")
console.info(".info")
console.debug(".debug")
console.warn(".warn")
console.error(".error")

//these aren't color coded but let's see if we can fix that via monkey patching...
const _error = console.error;
console.error = function (...data: any[]): void {
    let args_str = data.join(' ')
    _error.apply(console, [chalk.red.bold(args_str)]);
};
console.error("is", "this", "error", "red???", true, 2)

// classic fizzbuzz using .assert
console.count();
console.group();
for (let number = 0; number <= 10; number++) {
    console.count() // ok, technically, this should be .log(number) for accuracy but this script is testing .console stuff
    // assert is pretty overloaded - https://developer.mozilla.org/en-US/docs/Web/API/console/assert_static
    console.assert(number % 3 !== 0, "%d % 3=0, Fizz", number );
    console.assert(number % 5 !== 0, "%d % 5=0, Buzz", number );
}
console.groupEnd();
console.countReset();
console.info("count reset!");
console.count();

// printing out multi-line data in the same .log-ish statement
const obj = { id: 1, name: "Kim", personal_family: { pets: {name: "Oreo", type: "dog" } } };
console.log(`trying some single line multi-type output... ${JSON.stringify(obj)}`);
console.log("this also works and is much easier", obj)

// use if you want only part of some nested data
console.dir(obj, { depth: 0 })

// omg table straight to terminal?! neato.
console.table(obj.personal_family.pets)

// testing out a timer and trace
const sleep = (ms: number) => new Promise((r) => {
    setTimeout(r, ms);
    console.trace("Running console.trace()");
});
console.time("Sleepy timer:")
console.timeLog("Sleepy timer:")
sleep(2)
console.timeEnd("Sleepy timer:")


