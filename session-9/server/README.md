# Contact Form Server

A full-stack contact form application built with Express.js and MongoDB. This project demonstrates how to create a RESTful API server that handles form submissions and stores contact information in a MongoDB database.

## Features

- ✨ RESTful API with Express.js
- 🗄️ MongoDB database integration with Mongoose
- 📝 Contact form with client-side validation
- 🎨 Responsive user interface
- ⚡ Async/await for database operations
- 🔐 Environment variable configuration with dotenv
- 📊 Real-time word counter for message input

## Project Structure

```
session-9/server/
├── index.js          # Main server file with API endpoints
├── package.json      # Project dependencies and scripts
├── .env             # Environment variables (not tracked in git)
└── public/          # Static frontend assets
    ├── contact.html # Contact form interface
    └── style.css    # Styling for the form
```

## Technologies Used

- **Backend:**

  - Node.js
  - Express.js v5.2.1
  - Mongoose v9.1.1 (MongoDB ODM)
  - dotenv v17.2.3 (Environment variables)

- **Frontend:**
  - HTML5
  - CSS3
  - Vanilla JavaScript (Fetch API)

## Prerequisites

Before running this project, make sure you have:

- Node.js (v14 or higher)
- npm or yarn
- MongoDB database (local installation or MongoDB Atlas account)

## Installation

1. Navigate to the project directory:

   ```bash
   cd session-9/server
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Create a `.env` file in the root directory:

   ```env
   MONGO_URL=mongodb://localhost:27017/contact-db
   ```

   Or for MongoDB Atlas:

   ```env
   MONGO_URL=mongodb+srv://username:password@cluster.mongodb.net/contact-db
   ```

## Usage

1. Start the server:

   ```bash
   node index.js
   ```

2. Open your browser and navigate to:

   ```
   http://localhost:3000
   ```

3. Fill out the contact form and submit. The data will be saved to MongoDB.

## API Endpoints

### GET `/`

- **Description:** Serves the contact form HTML page
- **Response:** HTML page

### POST `/contact`

- **Description:** Submits contact form data to the database
- **Request Body:**
  ```json
  {
    "name": "John Doe",
    "email": "john@example.com",
    "message": "Hello, this is a test message"
  }
  ```
- **Success Response (201):**
  ```json
  {
    "message": "Your data has been successfully received and saved!",
    "data": {
      "_id": "...",
      "name": "John Doe",
      "email": "john@example.com",
      "message": "Hello, this is a test message",
      "createdAt": "...",
      "updatedAt": "..."
    }
  }
  ```
- **Error Response (400):**
  ```json
  {
    "message": "Please enter all inputs"
  }
  ```
- **Error Response (500):**
  ```json
  {
    "message": "Internal Server Error!"
  }
  ```

## Database Schema

The Contact model uses the following schema:

```javascript
{
  name: String (required, trimmed),
  email: String (required, trimmed, lowercase),
  message: String (required, trimmed),
  createdAt: Date (auto-generated),
  updatedAt: Date (auto-generated)
}
```

## Features Explained

### Server-Side

- **Express Middleware:** Uses `express.json()` for parsing JSON requests and `express.static()` for serving static files
- **Database Connection:** Async function to connect to MongoDB with error handling
- **Input Validation:** Server-side validation to ensure all required fields are present
- **Error Handling:** Try-catch blocks for robust error management
- **Mongoose Models:** Schema definition with timestamps for tracking creation and update times

### Client-Side

- **Form Validation:** Client-side validation before submitting to the server
- **Word Counter:** Real-time character counting for the message field
- **Fetch API:** Modern approach to making HTTP requests
- **User Feedback:** Success and error messages displayed dynamically
- **Responsive Design:** Clean and accessible form layout

## Development Notes

- The server runs on port 3000 by default
- MongoDB connection is established before starting the Express server
- All form fields are trimmed and validated both client-side and server-side
- Email addresses are automatically converted to lowercase in the database
- Timestamps are automatically added to each contact entry

## Error Handling

The application includes comprehensive error handling:

- Database connection errors exit the process with status code 1
- Invalid input returns 400 status with descriptive message
- Server errors return 500 status with generic error message
- Client-side catches fetch errors and displays user-friendly alerts

## License

ISC

## Author

Created as part of WorkWave Mentorship - Session 9
