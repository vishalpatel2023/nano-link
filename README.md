# Nano Link

A simple URL shortener built with Node.js, Express, MongoDB, and EJS. It allows users to generate short links and redirect to the original URL using a unique short code.

## Features

* Create short URLs from long URLs
* Store URLs in MongoDB
* Redirect users using short codes
* Simple server-rendered interface with EJS

## Tech Stack

* Node.js
* Express.js
* MongoDB
* Mongoose
* EJS
* NanoID

## Installation

Clone the repository:

```bash
git clone https://github.com/vishalpatel2023/nano-link.git
cd nano-link
```

Install dependencies:

```bash
npm install
```

Create a `.env` file:

```env
PORT=4000
MONGO_URI=your_mongodb_connection_string
```

Start the application:

```bash
npm start
```

or

```bash
node index.js
```

## Project Structure

```text
.
├── config/
├── controllers/
├── models/
├── public/
├── routes/
├── utils/
├── views/
├── index.js
└── package.json
```

## License

This project is licensed under the MIT License.
