# Session 11 - Multi-Page Portfolio Website with Express.js

A portfolio website with multiple pages (Home, About, Projects, Contact) built using Express.js, featuring a navigation system with active link highlighting.

## Overview

This project demonstrates building a multi-page website with Express.js as the backend server. The application includes:

- **Home Page** - Landing page with introduction
- **About Page** - Personal information and background
- **Projects Page** - Portfolio projects showcase
- **Contact Page** - Contact form with client-side validation
- **Navigation** - Active link highlighting based on current page
- **MongoDB Integration** - Contact form submissions saved to database

## Prerequisites

Before running this project, ensure you have:

- Node.js (v14 or higher)
- MongoDB (local installation or MongoDB Atlas account)
- npm (comes with Node.js)

## Installation

1. Navigate to the session-11 directory:

   ```bash
   cd session-11
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Create a `.env` file in the session-11 directory with your MongoDB connection string:
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
session-11/
├── server/
│   ├── index.js              # Main server file
│   └── models/
│       └── ContactMessage.js  # MongoDB schema for contact messages
├── public/
│   ├── index.html             # Home page
│   ├── about.html             # About page
│   ├── projects.html          # Projects page
│   ├── contact.html           # Contact page
│   ├── css/
│   │   └── style.css          # Stylesheet with navigation styles
│   └── js/
│       ├── main.js            # Active navigation link handler
│       └── contact.js         # Contact form validation
├── package.json
└── README.md
```

## Recap of Session 11

In this session, we transformed a single-page contact form application into a complete multi-page portfolio website. Here are the key changes and new concepts introduced:

### 1. **Restructured Project Directory**

- Moved the `public` folder outside the `server` directory to create a clearer separation
- Updated the static files path in server from `./public` to `../public`

### 2. **Created Multiple HTML Pages**

- **index.html** - New home page with personal introduction
- **about.html** - New about page with detailed information
- **projects.html** - New projects showcase page with a list of projects
- **contact.html** - Updated contact form page

### 3. **Implemented Server-Side Routing**

- Added multiple GET routes for serving different HTML pages:
  - `GET /` → serves `index.html` (changed from `contact.html`)
  - `GET /about` → serves `about.html` (new)
  - `GET /projects` → serves `projects.html` (new)
  - `GET /contact` → serves `contact.html` (new)
- Removed the `/messages-page` route and related functionality

### 4. **Enhanced Navigation System**

- Added a consistent navigation bar across all pages
- Implemented active link highlighting using CSS classes
- Created `main.js` to dynamically add the `.active` class based on the current URL path
- Navigation compares `window.location.pathname` with each link's `href` attribute

### 5. **Improved CSS Styling**

- Updated navigation styles:
  - Changed from basic white links to styled navigation with dark background
  - Added hover effects with background color changes
  - Implemented `.active` class styling for the current page indicator
  - Added rounded corners and padding to navigation links
  - Improved opacity transitions for better visual feedback

### 6. **Code Organization**

- Split JavaScript into two files:
  - `main.js` - Handles navigation functionality (used across all pages)
  - `contact.js` - Handles contact form-specific logic (used only on contact page)
- Organized CSS into a dedicated `css/` folder
- Organized JavaScript into a dedicated `js/` folder

### 7. **Removed Message Display Functionality**

- Removed the `GET /messages` API endpoint
- Removed `messages.html` and `messages.js` files
- Simplified the application to focus on the portfolio and contact form

### Key Learning Points:

- How to serve multiple HTML pages with Express.js
- Client-side routing vs. server-side routing
- Using `window.location.pathname` to detect the current page
- Dynamic CSS class manipulation based on user navigation
- Organizing multi-page applications with shared resources (CSS, JS)
- Creating a cohesive user experience across multiple pages

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

**Response:**

```json
{
  "message": "Your data has been successfully received and saved!",
  "data": {
    "_id": "...",
    "name": "John Doe",
    "email": "john@example.com",
    "message": "Hello, this is a test message",
    "createdAt": "2026-01-12T..."
  }
}
```

## Features

- ✅ Multi-page navigation with active link highlighting
- ✅ Responsive form with client-side validation
- ✅ Word counter for message textarea
- ✅ MongoDB integration for data persistence
- ✅ Clean and modern UI design
- ✅ Consistent navigation across all pages

## Technologies Used

- **Backend:** Node.js, Express.js
- **Database:** MongoDB with Mongoose ODM
- **Frontend:** HTML5, CSS3, Vanilla JavaScript
- **Environment Variables:** dotenv
