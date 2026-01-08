const express = require("express");
const path = require("path");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const ContactMessage = require("./models/ContactMessage");

dotenv.config();

const app = express();

app.use(express.json()); // parse JSON body
app.use(express.static(path.join(__dirname, "public"))); // uses the public folder as static asset

const PORT = 3000;

// 1) MongoDB connection
async function connectDatabase(){
    try {
        console.log("Database URL", process.env.MONGO_URL);
        await mongoose.connect(process.env.MONGO_URL);
        console.log("MongoDB connected");
    } catch (error) {
        console.error("MongoDB connection error:", error.message);
        process.exit(1);
    }
}

// 3) routes

// Frontend pages 
app.get("/", (request, response) => {
    response.sendFile(path.join(__dirname, "public", "contact.html"));
});

app.get("/messages-page", (request, response) => {
    response.sendFile(path.join(__dirname, "public", "messages.html"));
});

// Backend APIs
app.get("/messages", async (request, response) => {
    try {
        const messages = await ContactMessage.find().sort({ createdAt: -1 }); // returns messages and sort the latest
        return response.json({
            ok: true,
            data: messages
        });
    } catch (error) {
        console.error("GET /messages error", error);
        response.status(500).json({
            message: "Internal Server Error!"
        });
    }
});

app.post("/contact", async (request, response) => {
    try {
        const { name, email, message } = request.body;

        console.log("Received contact info from browser", { name, email, message });

        // 1. validate the inputs if everything is okay
        if(!name || !email || !message){
            response.status(400).json({ message: "Please enter all inputs" });
        }

        const savedValue = await ContactMessage.create({ name, email, message });

        // 3. respond to the client or the browser about the outcome (200, 500, 401)
        response.status(201).json({
            message: "Your data has been successfully received and saved!",
            data: savedValue
        });
    } catch (error) {
        console.error("Save error!", error.message)
        response.status(500).json({
            message: "Internal Server Error!"
        })
    }
})

connectDatabase().then(() => {
    app.listen(PORT, () => {
        console.log(`Server is running on http://localhost:${PORT}`);
    })
});