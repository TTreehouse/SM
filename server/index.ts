import express = require("express");
import path = require("path");
import logger = require("./middleware/logger");
//runs code in db file
import db = require("./db");
import { authSession } from "./authSession";
import cookieParser = require("cookie-parser");

const app = express();

// init middleware
app.use(logger);

// Initialize body parser middleware
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: false }));

// Set a static folder
app.use(express.static(path.join(__dirname, "public")));

db.MongoSetup();

// Loads the file ./routes/api/members to handle requests at /api/members
app.use("/api/posts", require("./routes/api/posts"));
app.use("/api/users", require("./routes/api/users"));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started on ${PORT}`));

app.get("/lmao", async (req, res) => {
	res.cookie("session_id", req.body.id);
	res.json(req.body);
});

app.get("/protected", async (req, res) => {
	try {
		if ("session_id" in req.cookies) {
			await authSession(req.cookies.session_id);
			res.end();
		} else res.status(401).end();
	} catch {
		res.status(400).end();
	}
});
