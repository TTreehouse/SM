import express = require("express");
import path = require("path");
import cors = require("cors");
import cookieParser = require("cookie-parser");
var fs = require("fs");
var https = require("https");

//runs code in db file
import db = require("./db");
import {
	createSessionId,
	clearSessionIds,
	sessionIdLifeTime,
} from "./sessionHandler";
import { authSession } from "./middleware/authSession";

const app = express();

// init middleware
//app.use(logger);
app.use(cors());

// Initialize body parser middleware
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: false }));

db.MongoSetup();

// Loads the file ./routes/api/members to handle requests at /api/members
app.use("/api/posts", require("./routes/api/posts"));
app.use("/api/users", require("./routes/api/users"));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started on ${PORT}`));

app.get("/lmao", async (req, res) => {
	try {
		let key: string = await createSessionId(
			await db.User.findById(req.body.id)
		);
		let cookieOptions = {
			//path: "/session",
			expires: new Date(Date.now() + 86400000 * sessionIdLifeTime),
		};
		res.cookie("user_id", req.body.id, cookieOptions);
		res.cookie("session_id", key, cookieOptions);
		res.end();
	} catch {
		res.status(400).send("Missing user_id").end();
	}
});

app.get("/protected", authSession, async (req, res) => {
	res.send("hey well done you have hacked the system");
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
