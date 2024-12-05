# Scrap
A web platform where users contribute to a collective scrapbook by creating their own scrapbook pages, decorating them with images, text, and stickers. A project for UCLA CS 35L, Fall 2024.

## Table of Contents
- [Installation](#installation)
- [Prerequisites](#prerequisites)
- [Environment Setup](#environment-setup)
- [Running the Website Locally](#running-the-website-locally)
- [Technologies Used](#technologies-used)

## Installation

1. Clone the repository

```
git clone https://github.com/doanneda/scrap.git
```

2. Navigate into the project folder

```
cd scrap
```

## Prerequisites

If you haven't already, install [Node.js](https://nodejs.org/en/download) on your machine.

## Environment Setup

Create a .env file in the root directory of the server folder.

Add the following variables:

```
MONGO_URI=
PORT=4000

JWT_SECRET=
SALT=10
```

- MONGO_URI: Insert the connection string for your MongoDB database. See below for detailed instructions.
- JWT_SECRET: Insert the result of ```node -e "console.log(require('crypto').randomBytes(64).toString('hex'))"```.

To get the MONGO_URI, do the following:
1. Sign up or log in to MongoDB Atlas.
2. Create a new cluster.
3. Configure your cluster by going to the cluster dashboard and clicking on the "Connect" button.
4. Select MongoDB for VS Code.
5. Add your current IP address for access.
6. Copy and paste the connection string for MONGO_URI
   (it should look like mongodb+srv://<username>:<password>@cluster0.mongodb.net/<dbname>?retryWrites=true&w=majority).

 
## Running the Website Locally

1. Open two terminals (one for the server and one for the client).

2. In one terminal, navigate into the server folder. Then, install dependencies and start the development server.

```
cd server
npm i
npm start
```

You should see the message ```Connected to database successfully``` in your terminal.

3. In the other terminal, navigate into the client folder (called scrap-app). Then, install dependencies and start the backend server.

```
cd scrap-app
npm i
npm start
```

The website should open up as a new tab on your computer. If not, visit http://localhost:3000 to view the website.

## Technologies Used

MERN Stack:
- MongoDB
- Express
- React.js
- Node.js
