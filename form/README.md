# Simple Form App (Node.js + Express + PostgreSQL)

This is a simple full-stack form project that demonstrates how a frontend form can send data to a backend server, which then stores it in a PostgreSQL database.

---

## 📁 Project Structure

```
form/
│
├── index.html          # Frontend HTML (Bootstrap form)
├── index.js            # Frontend JS (handles form submission)
├── server.js           # Express backend server
├── package.json
├── package-lock.json
├── .env.example        # Example environment variables
└── node_modules/       # Dependencies (not pushed to Git)
```

---

## 🚀 Features

* Simple Bootstrap-based form
* Sends data using `fetch()`
* Express backend API
* PostgreSQL database integration
* Uses environment variables for configuration

---

## ⚙️ Setup Instructions

### 1. Clone the repository

```
git clone <your-repo-url>
cd form
```

---

### 2. Install dependencies

```
npm install
```

---

### 3. Setup environment variables

Create a `.env` file in the root directory using `.env.example`:

```
DB_USER=postgres
DB_HOST=localhost
DB_NAME=your_database
DB_PASSWORD=your_password
DB_PORT=5432
```

---

## 🐘 PostgreSQL Setup Guide

### Option A — Quick Local Setup (Linux / macOS)

1. Install PostgreSQL

   * Arch Linux:

     ```
     sudo pacman -S postgresql
     ```
   * macOS (Homebrew):

     ```
     brew install postgresql
     ```

2. Initialize database (Linux only):

   ```
   sudo -u postgres initdb -D /var/lib/postgres/data
   ```

3. Start PostgreSQL:

   ```
   sudo systemctl start postgresql
   ```

   or (macOS):

   ```
   brew services start postgresql
   ```

4. Open PostgreSQL CLI:

   ```
   sudo -u postgres psql
   ```

5. Create database:

   ```sql
   CREATE DATABASE your_database;
   ```

6. Create table:

   ```sql
   CREATE TABLE users (
     id SERIAL PRIMARY KEY,
     email TEXT NOT NULL,
     password TEXT NOT NULL,
     checked BOOLEAN
   );
   ```

7. (Optional) Set password:

   ```sql
   ALTER USER postgres PASSWORD 'your_password';
   ```

---

### Option B — Official Documentation

* PostgreSQL official docs: https://www.postgresql.org/docs/

---

## ▶️ Run the Server

```
node server.js
```

Server will run at:

```
http://localhost:3000
```

---

## 🌐 How It Works

### Frontend (`index.html` + `index.js`)

* User fills out the form
* On submit, JavaScript prevents default reload
* Sends data to backend using `fetch()`

```js
fetch("/adduser", {
  method: "POST",
  headers: { "Content-type": "application/json" },
  body: JSON.stringify({ email, password, checked }),
});
```

---

### Backend (`server.js`)

* Serves HTML and JS files
* Parses JSON requests
* Handles `/adduser` POST route
* Inserts data into PostgreSQL

```js
await pool.query(
  `INSERT INTO users (email, password, checked) VALUES ($1, $2, $3)`,
  [email, password, checked]
);
```

---

## 🔐 Important Notes

* Do **not** commit your `.env` file
* Add `.env` to `.gitignore`
* Passwords are currently stored as plain text (not secure for production)

---

## 🧠 Learning Purpose

This project is meant for:

* Understanding frontend ↔ backend communication
* Learning Express basics
* Practicing PostgreSQL integration
* Using environment variables
