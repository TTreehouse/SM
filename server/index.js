const express = require("express");
const path = require("path");
const logger = require("./middleware/logger")
//runs code in mongo file
const client = require("./mongo")

const app = express();

// init middleware
app.use(logger)

// Initialize body parser middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }))

// Set a static folder
app.use(express.static(path.join(__dirname, "public")));

// Loads the file ./routes/api/members to handle requests at /api/members
app.use("/api/members", require("./routes/api/members"));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started on ${PORT}`));