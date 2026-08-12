# 🌲 Trail Guide — Backend Recap Project

## 📋 Project Overview

**Trail Guide** is a full-featured backend application built with **Node.js**, **Express**, **TypeScript**, and **SQLite**. 

The application architecture:
1. **Public Website**: A server-side rendered web app using **Nunjucks** templates and **Pico.css**.
2. **Admin Panel**: An HTML form-based CRUD interface mounted at `/admin` for trail management.
3. **Public REST API**: JSON endpoints at `/api` offering open read access and API-key-protected write endpoints (`POST`, `PATCH`, `DELETE`).

---

## 🛠️ Tech Stack & Key Tools

* **Language & Runtime:** Node.js, TypeScript (`tsx`)
* **Web Framework:** Express.js
* **Database:** SQLite (`sqlite`, `sqlite3` driver)
* **Templating & UI:** Nunjucks + Pico.css (Semantic Minimal CSS)
* **Middleware & Utilities:** `sanitize-html`, Environment Variables (`.env`), Custom Access Logging
* **Development Tools:** TypeScript (`tsconfig.json`), `npx ghcd` data downloader

