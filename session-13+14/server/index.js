const express = require("express");
const path = require("path");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const ContactMessage = require("./models/ContactMessage");

dotenv.config();

const app = express();

app.use(express.json()); // parse JSON body
app.use(express.static(path.join(__dirname, "../public"))); // uses the public folder as static asset

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
    response.sendFile(path.join(__dirname, "../public", "index.html"));
});

app.get("/about", (request, response) => {
    response.sendFile(path.join(__dirname, "../public", "about.html"));
});

app.get("/projects", (request, response) => {
    response.sendFile(path.join(__dirname, "../public", "projects.html"));
});

app.get("/contact", (request, response) => {
    response.sendFile(path.join(__dirname, "../public", "contact.html"));
});


// Backend APIs
app.post("/api/contact", async (request, response) => {
    try {
        const { name, email, message } = request.body;

        console.log("Received contact info from browser", { name, email, message });

        // 1. validate the inputs if everything is okay
        if(!name || !email || !message){
            response.status(400).json({ message: "Please enter all inputs" });
        }

        if(name.length > 100 || email.length > 120 || message.length > 1000){
            // checks for maximum length as defined in the schema
            response.status(400).json({ message: "One or more inputs exceed maximum length" });
        }

        const DUPLICATE_WINDOW_MINUTES = 10;
        // We compare dates in milliseconds
        const currentDateInMs = Date.now();
        const duplicateWindowInMs = DUPLICATE_WINDOW_MINUTES * 60 * 1000;
        
        const messageFromDuplicateEmail = await ContactMessage.findOne({
            email: email,
            createdAt: { $gte: new Date(currentDateInMs - duplicateWindowInMs) }
        });

        if(messageFromDuplicateEmail){
            return response.status(409).json({
                message: `A message from this email was already received within the last ${DUPLICATE_WINDOW_MINUTES} minutes. Please wait before sending another message.`
            });
        }

        console.log("request headers['x-forwarded-for']:", request.headers['x-forwarded-for']);
        console.log("request socket:", request.socket);

        const ipAddress = request.headers["x-forwarded-for"]?.toString().split(",")[0].trim() || request.socket.remoteAddress;
        const userAgent = request.headers["user-agent"] || null;

        // 2. save the data in the database
        const savedValue = await ContactMessage.create({ 
            name, 
            email, 
            message, 
            ipAddress, 
            userAgent, 
            isDeleted: false 
        });

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
});

// Soft Delete API endpoint for Contact Messages
app.delete("/api/contact/:id", async (request, response) => {
    try {
        const messageId = request.params.id;

        const message = await ContactMessage.findOneAndUpdate({
            _id: messageId,
            isDeleted: false
        }, {
            isDeleted: true // soft delete by setting isDeleted to true
        }, {
            new: true // return the updated document
        });

        if(!message){
            return response.status(404).json({ message: "Message not found or already deleted." });
        }

        return response.status(200).json({ message: "Message successfully deleted.", data: message });
    } catch (error) {
        console.error("Delete error!", error.message);
        response.status(500).json({ message: "Internal Server Error!" });
    }
});

connectDatabase().then(() => {
    app.listen(PORT, () => {
        console.log(`Server is running on http://localhost:${PORT}`);
    })
});


/**
 * data = [
 *  { id: 1, name: "abc", isDeleted: false },
 *  { id: 2, name: "def", isDeleted: true },
 *  { id: 3, name: "ghi", isDeleted: false }
 * ];
 * 
 * for public display, we will only show items where isDeleted is false
 * That's why we will query with `isDeleted: false` in our database queries.
 * 
 */