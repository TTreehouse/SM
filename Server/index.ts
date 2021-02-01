import express = require("express");
import path = require("path");
import cors = require("cors");
import cookieParser = require("cookie-parser");
import fs = require("fs");
import https = require("https");
import shajs = require("sha.js");

//runs code in db file
import db = require("./db");
import { clearSessionIds } from "./sessionHandler";
import { authSession } from "./middleware/authSession";

const app = express();

const cookieSecret = "BccIZNwhqA4V9ooxJ3ll";

export { cookieSecret };

// init middleware
//app.use(logger);
app.use(cors());

// Initialize body parser middleware
app.use(express.json());
app.use(cookieParser(cookieSecret));
app.use(express.urlencoded({ extended: false }));

db.MongoSetup();

// Loads the file ./routes/api/members to handle requests at /api/members
app.use("/api/posts", require("./routes/api/posts"));
app.use("/api/users", require("./routes/api/users"));
app.use("/api/signin", require("./routes/api/signin"));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started on ${PORT}`));

app.get("/protected", authSession, async (req, res) => {
	if (!res.headersSent) res.send("hey well done you have hacked the system");
});

app.get("/clear", async (req, res) => {
	try {
		if ("id" in req.body) {
			clearSessionIds(req.body.id);
			res.end();
		} else {
			res.status(400).end();
		}
	} catch {
		res.status(500).end();
	}
});

app.get("/lmao", async (req, res) => {
	console.log(req.cookies);
	console.log(req.signedCookies);
});
