# 🥢 Wok & Wakis – Backend (Node.js + Typescript + SQLite)

This is the backend API for Wok & Wakis restaurant app. It is built using **Express.js**, **TypeScript**, and **SQLite** (via `sqlite3` + `sqlite`). It powers food CRUD operations and is fully documented with **Swagger**.

---

## 🚀 Features

- 🍽 CRUD operations for food items
- 📦 Bulk food creation
- 📘 Swagger API documentation
- ⚙️ SQLite in-memory database
- 🔐 Request validation with Zod
- 🧪 Jest unit testing with in-memory DB

---


## ⚠️ Note
- Since the API uses an **in-memory database**, food items will not persist across sessions or deployments.

- This means food items may **not appear** when you fetch food unless data has been added during the current session.


🔗 **Swagger Link**: https://wok-and-wakis-apis.vercel.app/api-docs/#/


## 📦 Installation

```bash
git clone https://github.com/hurlaniyhi/wok_and_wakis-server.git
cd wok_and_wakis-server
npm install
```


## 🧪 Run Dev Server

```bash
npm run dev
```


## 🧪 Run Tests

```bash
npm test
```


## Endpoints Testing

- Via Swagger using the below swagger link 

- Via Postman

**Swagger Link**: https://wok-and-wakis-apis.vercel.app/api-docs/#



## 🧰 Project Structure

<pre lang="text"><code> ```text
├── __tests__/
├── @types/
├── database/
├── docs/
├── handlers/
├── middlewares/
├── models/
├── routes/
├── utils/
└── validators/
</code></pre>


## 🧑‍💻 Technologies

- Node.js

- Express.js

- TypeScript

- SQLite

- Zod

- Jest

- Swagger


## 📦 Deployment

The app is deployed on **Vercel**

## ⚠️ App Deployed Url

https://wok-and-wakis-apis.vercel.app