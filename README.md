# Capminds Assessment -- React (Vite) + PHP Backend (XAMPP)

This project contains the Capminds assessment with a **React (Vite)
frontend** and a **PHP backend** running inside **XAMPP htdocs**.

The application setup uses two different ports:

-   **Frontend (Vite React): http://localhost:5143**
-   **Backend (PHP Apache): http://localhost:8000**

------------------------------------------------------------------------

## 📌 Why 8000 for Backend?

The default Apache port (80) was changed to **8000** inside XAMPP's
`httpd.conf`:

    Listen 8000
    ServerName localhost:8000

So your backend API or PHP files now run here:

    http://localhost:8000/

------------------------------------------------------------------------

## 📁 Project Structure

    htdocs/
    │── .htaccess          # SPA rewrite rules
    │── backend/           # PHP backend files (served via Apache on port 8000)
    │── frontend/          # React + Vite app (port 5143)
    │── frontend2/         # Another React app (if needed)
    └── ...

------------------------------------------------------------------------

## 🚀 Running the Frontend (React + Vite)

### Navigate to the frontend folder:

``` bash
cd frontend
```

### Install dependencies:

``` bash
npm install
```

### Start Vite dev server (runs on 5143)

``` bash
npm run dev -- --port 5143
```

Or add default port in **vite.config.js**:

``` js
export default {
  server: {
    port: 5143
  }
}
```

Now visit:

    http://localhost:5143

------------------------------------------------------------------------

## 🖥 Running the Backend (PHP -- XAMPP Apache)

Start **Apache** in XAMPP Control Panel.

Your backend runs at:

    http://localhost:8000

Example:

    Files:
    http://localhost:8000/backend/api/login.php
    http://localhost:8000/backend/api/register.php
    http://localhost:8000/backend/api/students.php

------------------------------------------------------------------------

## 🔁 Apache Rewrite (SPA Routing Support)

Place this `.htaccess` inside your htdocs or paste this code:

``` htaccess
RewriteEngine On

# Redirect /api/... to backend/api/...
RewriteRule ^api/([a-zA-Z0-9_-]+)$ backend/api/$1.php [L,QSA]

# Handle /api/students/5 → backend/api/students.php?id=5
RewriteRule ^api/([a-zA-Z0-9_-]+)/([0-9]+)$ backend/api/$1.php?id=$2 [L,QSA]

# Allow existing files/folders to work normally
RewriteCond %{REQUEST_FILENAME} -f [OR]
RewriteCond %{REQUEST_FILENAME} -d
RewriteRule ^ - [L]


------------------------------------------------------------------------

## 🌐 Frontend → Backend API Calls (Important)

Example API call from React:

``` js
 API's: 
      http://localhost:8000/api/login
      http://localhost:8000/api/register
      http://localhost:8000/api/students
      http://localhost:8000/api/students/:id

fetch("http://localhost:8000/api/students")
```

Since backend is PHP and runs on port **8000**, you must include the
full URL.

------------------------------------------------------------------------

## ✅ Summary

-   Frontend runs on **5143**\
-   Backend (PHP Apache) runs on **8000**\
-   `.htaccess` handles SPA routing\
-   Built inside **xampp/htdocs**\
-   Git instructions included
