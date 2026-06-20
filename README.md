# Nano Link

A simple URL shortener built with Node.js, Express, MongoDB, and EJS. It allows users to generate short links and redirect to the original URL using a unique short code.

## 📸 Screenshots

| Home Page | User Dashboard |
| :---: | :---: |
| ![Home Page](/screenshots/home.png) | ![Dashboard](/screenshots/dashboard.png)  |
| **Login / Register** | **Success Result** |
| ![Login Page](/screenshots/login.png)(/screenshots/register.png) | ![Result Page](/screenshots/result.png)  |

## Features

* **User Authentication:** Secure signup, login, and logout functionality using JSON Web Tokens (JWT) stored in HTTP-only cookies. Password hashing via `bcrypt`.
* **URL Shortening:** Generates clean, unique short codes for long URLs.
* **Analytics Dashboard:** Logged-in users can view a table of their created links, original destinations, creation dates, and total click counts.
* **Backend Validation:** Custom validation logic ensures URLs are properly formatted before saving to the database.
* **Dark Theme UI:** A responsive, modern dark-themed user interface built with EJS and raw CSS.

## Tech Stack

* **Backend:** Node.js, Express.js
* **Database:** MongoDB (with Mongoose ORM)
* **Frontend:** EJS (Embedded JavaScript templates), HTML, CSS
* **Security & Auth:** `jsonwebtoken`, `bcrypt`, `cookie-parser`
* **Architecture:** MVC (Model-View-Controller)

## Installation

Clone the repository:

```bash
git clone https://github.com/vishalpatel2023/nano-link.git
cd nano-link
```

Install dependencies:

if you are using pnpm

```bash
pnpm install
```
or with npm

```bash
pnpm install
```

Create a `.env` file:

```env
PORT=3000 (etc)
MONGO_URI=str
JWT_SECRET=anything
```

Start the application:

```bash
npm start
```

or

```bash
node index.js
```
Open in browser:
Visit http://localhost:3000 to view the app.

## Project Structure

```text

URL-SHORTENER/
├── config/              
│   └── db.js
├── controllers/        
│   ├── urlController.js
│   └── userController.js
├── middlewares/         
│   └── auth.js
├── models/           
│   ├── url.js
│   └── user.js
├── public/          
│   ├── index_style.css
│   ├── login_style.css
│   └── register_style.css
├── routes/             
│   ├── urlRoutes.js
│   └── userRoutes.js
├── utils/               
│   ├── generateShortCode.js
│   └── isValidUrl.js
├── views/              
│   ├── dashboard.ejs
│   ├── index.ejs
│   ├── login.ejs
│   ├── register.ejs
│   └── result.ejs
├── .env                 
├── index.js             # Main application entry point
└── package.json         # Dependencies and scripts
```

## License

This project is licensed under the MIT License.
