import { expect } from "jsr:@std/expect";

Deno.test("Is the sky blue", async () => {
    let sky = "blue"
    expect(sky).toBe("blue");
});