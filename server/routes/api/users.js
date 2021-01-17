const express = require("express");
const router = express.Router();
const db = require("../../db");
const uuid = require("uuid");

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
router.get("/:username", async function (req, res) {
	try {
		db.User.find({ username: req.params.username }, function (err, users) {
			if (err) return console.error(err);
			if (users.length > 1) {
				//Handle this issue;
			}
			res.json(users[0]);
		});
	} catch (err) {
		console.error(err);
		res.status(500).end();
	}
});

//Create Post
router.post("/", async function (req, res) {
	try {
		let newUser = new db.User({
			username: req.body.username,
			password: req.body.password,
			displayName: req.body.displayName,
			biography: req.body.biography,
		});
		if (
			!newUser.username ||
			!newUser.password ||
			!newUser.displayName ||
			!newUser.biography
		) {
			console.log(newUser);
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
// router.put("/:id", async function (req, res) {
// 	try {
// 		// Get requested post
// 		// Update post if there is a change

// 		const postUpdate = {};
// 		if (req.body.title) postUpdate.title = req.body.title;
// 		if (req.body.body) postUpdate.body = req.body.body;

// 		db.User.updateOne(
// 			{ _id: req.params.id },
// 			postUpdate,
// 			function (err, result) {
// 				res.json(result);
// 			}
// 		);
// 	} catch (err) {
// 		console.error(err);
// 		res.status(500).end();
// 	}
// });

//Delete member

router.delete("/:id", (req, res) => {
	try {
		db.User.deleteOne({ _id: req.params.id }, (err) => {
			console.error(err);
			res.status(500).end();
		});
		res.end();
	} catch (err) {
		console.error(err);
		res.status(500).end();
	}
});

module.exports = router;
