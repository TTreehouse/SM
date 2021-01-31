import express = require("express");
const router = express.Router();
import db = require("../../db");
import uuid = require("uuid");
import { authSession, authUser } from "../../middleware/authSession";

// Gets all members
router.get("/", async function (req, res) {
	try {
		db.User.find(function (err, users) {
			if (err) return console.error(err);
			res.json(users);
		});
	} catch (err) {
		console.error(err);
		res.status(500).end();
	}
});

// get single member
router.get("/:username", authSession, async function (req, res) {
	try {
		if (!res.headersSent) {
			const user: db.IUser = await db.User.findOne({
				username: req.params.username,
			});
			if (user != null && user != undefined) {
				if (authUser(req, res, user.id)) {
					res.json(user.sendableUser());
				} else res.status(401).send("Not authorized to access this user");
			} else res.status(404).end();
		}
	} catch (err) {
		console.error(err);
		res.status(500).end();
		return;
	}
});

//Create Post
router.post("/", async function (req, res) {
	try {
		let dateNow: number = Date.now();
		let newUser = new db.User({
			username: req.body.username,
			password: req.body.password,
			displayName: req.body.displayName,
			biography: req.body.biography,
			creationDate: dateNow,
			sessionKeys: [],
		});
		if (
			!newUser.username ||
			!newUser.password ||
			!newUser.displayName ||
			!newUser.biography
		) {
			return res.status(400).send("Missing information");
		}
		await newUser.save((err, newUser) => {
			if (err) {
				console.error(err);
				return res.status(500).end();
			}
		});
		res.json(newUser);
	} catch (err) {
		console.error(err);
		res.status(500).end();
	}
});

// Update member
router.put("/:username", async function (req, res) {
	try {
		// Get requested post
		// Update post if there is a change

		const userUpdate: any = {};
		if (req.body.username) userUpdate.username = req.body.username;
		if (req.body.password) userUpdate.password = req.body.password;
		if (req.body.displayName) userUpdate.displayName = req.body.displayName;
		if (req.body.biography) userUpdate.biography = req.body.biography;

		db.User.updateOne({ username: req.params.username }, userUpdate);
	} catch (err) {
		console.error(err);
		res.status(500).end();
	}
});

//Delete member

router.delete("/:username", (req, res) => {
	try {
		db.User.deleteOne({ username: req.params.username });
		res.end();
	} catch (err) {
		console.error(err);
		res.status(500).end();
	}
});

module.exports = router;
