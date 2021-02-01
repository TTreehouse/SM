import express = require("express");
const router = express.Router();
import db = require("../../db");
import { checkSalt } from "../../salter";
import { createSessionId, sessionIdLifeTime } from "../../sessionHandler";

router.post("/", async (req, res) => {
	if (!("username" in req.body) || !("password" in req.body)) {
		return res.status(400).end();
	} else {
		let user: db.IUser = await db.User.findOne({ username: req.body.username });
		if (user == null || user == undefined) {
			return res.status(400).end();
		}
		let authenticated = checkSalt(req.body.password, user.salt, user.hash);

		if (authenticated) {
			let sessionId: any = await createSessionId(user);
			let cookieOptions = {
				//path: "/session",
				expires: sessionId.expiry,
				httpOnly: true,
				signed: true,
			};
			res.cookie("user_id", user.id, cookieOptions);
			res.cookie("session_id", sessionId.key, cookieOptions);

			return res.json(user.sendableUser());
		} else return res.status(400).end();
	}
});

module.exports = router;
