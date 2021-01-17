const express = require("express");
const path = require("path");
const logger = require("./middleware/logger");
//runs code in db file
const db = require("./db.js");

const app = express();

// init middleware
app.use(logger);

// Initialize body parser middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Set a static folder
app.use(express.static(path.join(__dirname, "public")));

db.MongoSetup();

// Loads the file ./routes/api/members to handle requests at /api/members
app.use("/api/posts", require("./routes/api/posts"));
app.use("/api/users", require("./routes/api/users"));
app.use("/api/users/login", require("./routes/api/users/login"));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started on ${PORT}`));
