

function pretendToBeProcessing(id: number){
    console.log("Pretending to do some heavy processing...")
    setTimeout(() => { 
        let data = { webhook_monitor: true, processed: true, test_id: id};

        // we only want to post and we don't care about the monitor response,
        // so no await or .then() is used
        fetch("http://host.docker.internal:3000/webhook_monitor", {
          method: "POST",
          headers: {'Content-Type': 'application/json'}, 
          body: JSON.stringify(data)
        })
    }, 5000);
}

Deno.serve({
    onListen({ path }) {
      console.log(`Server started! No idea what exactly this could be used for, seems to fire at init of server session though.`);
    },
    port: 3000, 
    hostname: "0.0.0.0",
  }, async (_req) => {
    const url = new URL(_req.url);

    // we pretend that we're posting something for processing here.
    const WEBHOOK_TESTING_ROUTE = new URLPattern({ pathname: "/webhook/testing/:id" });
    let match = WEBHOOK_TESTING_ROUTE.exec(_req.url);
    if (match) {
        const test_id: number = match.pathname.groups.id;
        // maybe this could be a large db transaction or something that works with many systems, 
        // which eventually attempts a post to a webhook monitor endpont
        pretendToBeProcessing(test_id);
        return Response.json({ webhook: true, testing: true, id: test_id });
    }

    // we're pretending that after we have done our complicated processing, we wanna know about it by
    // posting details about it to this endpoint
    const WEBHOOK_MONITOR_ROUTE = new URLPattern({ pathname: "/webhook_monitor" });
    if (WEBHOOK_MONITOR_ROUTE.exec(_req.url)) {
        if (_req.body) {
          const body = await _req.text();
          console.log("At /webhook_monitor with this request body:", body);
          console.log("Done pretending.")
        }
        
        return Response.json({ webhook_monitor: true });
    }

    // if not routes are passed, load the homepage
    return new Response("Try again with something like the pathname /webhook/testing/123 - the 123 can be any number.");
  }
);
  
  