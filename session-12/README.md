# Session 12 - Advanced Contact Form with Duplicate Prevention & Soft Delete

A portfolio website with enhanced contact form features including duplicate submission prevention, IP tracking, and soft delete functionality for contact messages.

## Overview

This project builds upon Session 11 by adding advanced features to the contact form system:

- **Duplicate Submission Prevention** - Prevents the same email from submitting multiple messages within 10 minutes
- **IP Address Tracking** - Records the IP address of form submissions
- **User Agent Tracking** - Stores browser and device information
- **Soft Delete API** - Allows marking messages as deleted without removing them from the database
- **Enhanced Data Validation** - Improved server-side validation for all inputs

## Prerequisites

Before running this project, ensure you have:

- Node.js (v14 or higher)
- MongoDB (local installation or MongoDB Atlas account)
- npm (comes with Node.js)

## Installation

1. Navigate to the session-12 directory:

   ```bash
   cd session-12
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Create a `.env` file in the session-12 directory with your MongoDB connection string:
   ```
   MONGO_URL=mongodb://localhost:27017/your-database-name
   ```
   Or for MongoDB Atlas:
   ```
   MONGO_URL=mongodb+srv://username:password@cluster.mongodb.net/database-name
   ```

## Running the Server

Start the server using:

```bash
npm start
```

The server will run on `http://localhost:3000`

## Project Structure

```
session-12/
├── server/
│   ├── index.js              # Main server file with advanced features
│   └── models/
│       └── ContactMessage.js  # MongoDB schema with isDeleted, ipAddress, and userAgent
├── public/
│   ├── index.html             # Home page
│   ├── about.html             # About page
│   ├── projects.html          # Projects page
│   ├── contact.html           # Contact page
│   ├── css/
│   │   └── style.css          # Stylesheet
│   └── js/
│       ├── main.js            # Active navigation link handler
│       └── contact.js         # Contact form validation
├── package.json
└── README.md
```

## Recap of Session 12

In this session, we enhanced the contact form system with several important features for production-ready applications:

### 1. **Duplicate Submission Prevention**

- Implemented time-based duplicate detection using MongoDB queries
- Checks if the same email submitted a message within the last 10 minutes
- Uses `Date.now()` and millisecond calculations for time window comparison
- Returns a `409 Conflict` status code when a duplicate is detected
- Query uses `$gte` operator to find messages created within the time window

```javascript
const DUPLICATE_WINDOW_MINUTES = 10;
const currentDateInMs = Date.now();
const duplicateWindowInMs = DUPLICATE_WINDOW_MINUTES * 60 * 1000;

const messageFromDuplicateEmail = await ContactMessage.findOne({
  email: email,
  createdAt: { $gte: new Date(currentDateInMs - duplicateWindowInMs) },
});
```

### 2. **IP Address and User Agent Tracking**

- Captures the IP address of each submission for security and analytics
- Handles both direct connections and proxy/load balancer scenarios
- Extracts IP from `x-forwarded-for` header (for proxies) or `socket.remoteAddress` (for direct connections)
- Records browser's user agent string for device/browser information
- Updated MongoDB schema to include `ipAddress` and `userAgent` fields

```javascript
const ipAddress =
  request.headers["x-forwarded-for"]?.toString().split(",")[0].trim() ||
  request.socket.remoteAddress;
const userAgent = request.headers["user-agent"] || null;
```

### 3. **Soft Delete Implementation**

- Added new `DELETE /contact/:id` endpoint
- Implements soft delete pattern - marks records as deleted instead of removing them
- Updates `isDeleted` field to `true` while keeping data in the database
- Prevents deleting already deleted messages
- Uses `findOneAndUpdate()` with conditions to ensure atomicity
- Returns `404` if message not found or already deleted
- Added `isDeleted` field with index to the schema for efficient queries

```javascript
app.delete("/contact/:id", async (request, response) => {
  const message = await ContactMessage.findOneAndUpdate(
    {
      _id: messageId,
      isDeleted: false,
    },
    {
      isDeleted: true,
    },
    {
      new: true,
    }
  );
});
```

### 4. **Enhanced Data Validation**

- Validates all required fields are present
- Checks maximum length constraints match the schema
- Validates against both null/undefined and empty strings
- Returns appropriate error messages and status codes

### 5. **Updated Database Schema**

- Added `isDeleted` field with Boolean type and index
- Added `ipAddress` field with String type and default null
- Added `userAgent` field with String type and default null
- All new fields are optional but provide valuable metadata

### Key Learning Points:

- **Duplicate Prevention:** Using MongoDB queries with time-based conditions
- **Working with Dates:** Converting between JavaScript Date objects and milliseconds
- **MongoDB Operators:** Using `$gte` for greater-than-or-equal comparisons
- **HTTP Headers:** Extracting client information from request headers
- **Soft Delete Pattern:** Why and how to implement soft deletes instead of hard deletes
- **RESTful API Design:** Using DELETE method with URL parameters
- **Atomic Operations:** Using `findOneAndUpdate()` with conditions
- **Data Retention:** Keeping deleted data for audit trails and recovery
- **IP Address Handling:** Dealing with proxies and load balancers

## API Endpoints

### POST /contact

Submits contact form data to the server and saves it to MongoDB.

**Request Body:**

```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "message": "Hello, this is a test message"
}
```

**Success Response (201):**

```json
{
  "message": "Your data has been successfully received and saved!",
  "data": {
    "_id": "...",
    "name": "John Doe",
    "email": "john@example.com",
    "message": "Hello, this is a test message",
    "ipAddress": "192.168.1.1",
    "userAgent": "Mozilla/5.0...",
    "isDeleted": false,
    "createdAt": "2026-01-15T...",
    "updatedAt": "2026-01-15T..."
  }
}
```

**Error Responses:**

- `400` - Missing required fields or fields exceed maximum length
- `409` - Duplicate submission within 10 minutes
- `500` - Internal server error

### DELETE /contact/:id

Soft deletes a contact message by marking it as deleted.

**URL Parameters:**

- `id` - MongoDB ObjectId of the message to delete

**Success Response (200):**

```json
{
  "message": "Message successfully deleted.",
  "data": {
    "_id": "...",
    "name": "John Doe",
    "email": "john@example.com",
    "message": "Hello, this is a test message",
    "isDeleted": true,
    "createdAt": "2026-01-15T...",
    "updatedAt": "2026-01-15T..."
  }
}
```

**Error Responses:**

- `404` - Message not found or already deleted
- `500` - Internal server error

## Features

- ✅ Multi-page navigation with active link highlighting
- ✅ Duplicate submission prevention (10-minute window)
- ✅ IP address and user agent tracking
- ✅ Soft delete functionality for messages
- ✅ Enhanced server-side validation
- ✅ MongoDB integration with indexed fields
- ✅ Client-side form validation
- ✅ Word counter for message textarea
- ✅ Clean and modern UI design

## Technologies Used

- **Backend:** Node.js, Express.js
- **Database:** MongoDB with Mongoose ODM
- **Frontend:** HTML5, CSS3, Vanilla JavaScript
- **Environment Variables:** dotenv
