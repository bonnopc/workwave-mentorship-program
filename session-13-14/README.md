# Session 13 & 14 — Project Recap & Deployment

In these sessions, we connected everything we’ve built so far and deployed the project as **one full-stack application**.

## What this project is

- Frontend: HTML, CSS, JavaScript
- Backend: Node.js + Express
- Database: MongoDB Atlas

One server:

- serves the website pages
- handles form submissions
- saves data to MongoDB

No separate frontend and backend deployment.

## Project structure (simplified)

```
public/    → frontend (HTML, CSS, JS)
server/    → backend (Express, MongoDB)
```

The Express server:

- serves `public/` as static files
- exposes API routes
- connects to MongoDB using an environment variable

## API route update (important)

Up to **Session 12**, we used routes like:

```
POST /contact
```

From now on, we use:

```
POST /api/contact
```

### Why this change

- clear separation between pages and API
- avoids confusion with `/contact.html`
- follows real-world project structure

### What changed

- Backend: `/contact` → `/api/contact`
- Frontend: `fetch("/contact")` → `fetch("/api/contact")`

Always use **relative paths** like `/api/contact`.
Do not hardcode `localhost` or domain names.

## MongoDB Atlas

- Use a free MongoDB Atlas cluster
- Check if you have allowed the server IP address on Atlas dashboard
  - For simplicity and testing your deployment, you can add `0.0.0.0/0` for a limited amount of time. But always remember that this will enable your cluster to be accessed from anywhere using the username and password
- Store the connection string in an environment variable:

```
MONGO_URI=your_connection_string
```

_Note: Never commit this value to GitHub._

## Deployment (Render)

We deployed the project using **Render** as a single Web Service.

### Steps

1. Push your code to GitHub
2. Go to Render Dashboard → **New → Web Service**
3. Connect your GitHub repository
4. Set:
   - Build Command: `npm install`
   - Start Command: `npm start` (or `node server/index.js`)
5. Add environment variable:
   - `MONGO_URI`
6. Deploy

Render will provide a free `*.onrender.com` URL.

## What you should verify (post-deployment)

1. Website loads from the deployed URL
2. Contact form submits successfully
3. Data appears in MongoDB Atlas

## Next steps

- Deploy your own version of this project
- Share:
  - GitHub repo link
  - deployed website link

Revisit the code, follow the flow, and things will start to click.
