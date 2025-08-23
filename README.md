# 📚 BookTracker API

This is the backend API for the **BookTracker** application. It allows users to manage books, including creating, reading, updating, and searching for books. The API is built using **Bun**, **Elysia**, and **Drizzle ORM**.

---

## 📝 Project Overview

To maintain simplicity and avoid over-engineering, I skipped implementing a separate repository layer for this project. All business logic is handled cleanly in the **service layer**, and proper **error handling** has been implemented throughout the API.

---

## 📦 Setup Instructions

### 1. Clone the Repository

```bash
git clone https://github.com/your-username/booktracker-backend.git
cd booktracker-backend
```
### 2. Install Dependencies
```bash
bun install
```
### 3. Configure Environment Variables
```bash
PORT=3000
DB_CONNECTION_URL=postgres://user:password@localhost:5432/booktracker
```
### 4. Set Up the Database
```bash
bun drizzle-kit generate
bun drizzle-kit migrate
```

### 5. Run the server
```bash
bun run src/index.ts
```
