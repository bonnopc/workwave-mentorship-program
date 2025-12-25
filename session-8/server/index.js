const express = require("express");
const path = require("path");
const app = express();

app.use(express.json()); // parse JSON body
app.use(express.static(path.join(__dirname, "public"))); // uses the public folder as static asset

app.get("/", (request, response) => {
    response.sendFile(path.join(__dirname, "public", "contact.html"));
});

app.post("/contact", (request, response) => {
    const { name, email, message } = request.body;

    console.log("Received contact info from browser", { name, email, message });

    // 1. validate the inputs if everything is okay
    if(!name || !email || !message){
        response.status(400).json({ message: "Please enter all inputs" });
    }

    // TODO 2. store the inputs into database (this will be skipped today)

    // 3. respond to the client or the browser about the outcome (200, 500, 401)
    response.status(201).json({
        message: "Your data has been successfully received!"
    });
})

app.listen(3000, () => {
    console.log("Server is running on http://localhost:3000");
})