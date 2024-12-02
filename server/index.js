require('dotenv').config();
const express = require('express')
const app = express();
const cors = require("cors");
const connection = require("./db");
const userRoutes = require('./routes/users');
const authRoutes = require('./routes/auth');
const scrapPageRouter = require('./routes/scrapPageRoute');
const profileRouter = require('./routes/profileRoute');
// const mongoose = require('mongoose');

// const uri = "mongodb+srv://scrapUser:3G0hCeLWGXVr4JYE@scrap.hfxhm.mongodb.net/?retryWrites=true&w=majority&appName=scrap"
const port = process.env.PORT || 4000;

// database connection
connection();

// middlewares
app.use(express.json())
app.use(cors());

// routes
app.use("/api/users", userRoutes);
app.use("/api/auth", authRoutes);
app.use('/scrap-pages', scrapPageRouter);
app.use('/profile', profileRouter);

app.get('/', (req, res) => {
    res.send('Hello World!');
  });

app.listen(port, () => console.log(`Listening on port ${port}...`))


// J INDEX.JS FILE
// require('dotenv').config();
// const express = require('express')
// const app = express();
// const cors = require("cors");
// const connection = require("./db");
// const userRoutes = require('./routes/users');
// const authRoutes = require('./routes/auth');

// // database connection
// connection();

// // middlewares
// app.use(express.json())
// app.use(cors());

// // routes
// app.use("/api/users", userRoutes);
// app.use("/api/auth", authRoutes);

// const port = process.env.PORT || 4000;
// app.listen(port, () => console.log(`Listening on port ${port}...`))

