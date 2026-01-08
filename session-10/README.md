# Session 10 — Reading & Displaying Data (CRUD Basics)

## Overview

In this session, we built upon the previous contact form application by implementing the "Read" operation of CRUD. We created a full-stack application that displays all contact messages stored in MongoDB in a tabular format.

## Recap: What Changed from Session 9

Session 9 focused on creating and saving contact messages to MongoDB. In Session 10, we extended that functionality by adding the ability to read and display the stored data:

- **Code Organization**: Moved the Mongoose schema and model from `index.js` into a separate file (`models/ContactMessage.js`) for better code structure and reusability
- **New GET API Endpoint**: Added `GET /messages` endpoint to retrieve all contact messages from the database using `ContactMessage.find().sort({ createdAt: -1 })`
- **New Frontend Page**: Created `messages.html` with a table structure to display all contact messages in an organized format
- **New JavaScript File**: Added `messages.js` to handle fetching data from the backend API and dynamically rendering table rows
- **Navigation**: Added navigation links between the contact form page and messages display page for easy switching between views
- **Data Sorting**: Implemented sorting to display the most recent messages first using MongoDB's `sort()` method
- **Dynamic DOM Creation**: Used `document.createElement()` and `innerHTML` to dynamically generate table rows based on the fetched data
- **Complete CRUD Foundation**: Now have both Create (POST) and Read (GET) operations working, setting the stage for Update and Delete in future sessions

## What We Built

### Backend Features

1. **MongoDB Connection**

   - Connected to MongoDB using Mongoose
   - Configuration managed through environment variables (`.env` file)

2. **Contact Message Model** (`models/ContactMessage.js`)

   - Defined schema with name, email, and message fields
   - Added timestamps for tracking creation and update times
   - Applied data validation and formatting (trim, lowercase for email)

3. **API Endpoints**

   - `GET /` - Serves the contact form page
   - `GET /messages-page` - Serves the messages display page
   - `POST /contact` - Saves new contact messages to MongoDB
   - `GET /messages` - Retrieves all messages sorted by creation date (newest first)

4. **Express Server Configuration**
   - Static file serving from `public` folder
   - JSON body parsing middleware
   - Error handling for database and API operations

### Frontend Features

1. **Contact Form Page** (`contact.html`)

   - Form to submit name, email, and message
   - Navigation to view messages

2. **Messages Display Page** (`messages.html`)

   - Table layout to display all contact messages
   - Shows name, email, and message columns
   - Navigation between contact and messages pages

3. **Dynamic Data Loading** (`messages.js`)
   - Fetches messages from backend API using `fetch()`
   - Dynamically creates table rows for each message
   - Error handling for failed requests

## Key Concepts Covered

- **CRUD Operations**: Focus on Create (POST) and Read (GET)
- **MongoDB Queries**: Using Mongoose's `find()` and `sort()` methods
- **RESTful API Design**: Proper endpoint structure and HTTP methods
- **Async/Await**: Handling asynchronous operations in both frontend and backend
- **Dynamic DOM Manipulation**: Creating HTML elements dynamically with JavaScript
- **Error Handling**: Try-catch blocks for robust error management

## Running the Application

1. Install dependencies:

   ```bash
   npm install
   ```

2. Create a `.env` file with your MongoDB connection string:

   ```
   MONGO_URL=your_mongodb_connection_string
   ```

3. Start the server:

   ```bash
   npm run start
   ```

4. Access the application at `http://localhost:3000`

## Technologies Used

- **Backend**: Node.js, Express.js, Mongoose
- **Database**: MongoDB
- **Frontend**: HTML, CSS, JavaScript (Vanilla)
- **Environment Management**: dotenv
