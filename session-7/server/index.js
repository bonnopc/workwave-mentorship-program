const express = require("express");
const app = express();

app.get("/", (request, response) => {
    response.send("Hello from the server");
})

app.get("/two", (request, response) => {
    response.send("Hello from the second page of the server");
})

app.listen(3000, () => {
    console.log("Server is running on http://localhost:3000");
})


/**
 * For example: www.undpvolunteer.com
 * Server: www.api.undpvolunteer.com
 * 
 * /about
 * Response should be a sentence about you.
 */