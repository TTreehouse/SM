import express = require("express");
const router = express.Router();
import db = require("../../db");

// Gets all members
router.get("/", async (req, res) => {
	try {
		const posts = await db.Post.find().sort({ date: -1 });
		res.json(posts);
	} catch (err) {
		console.error(err);
		res.status(500).end();
	}
});

// get single member
router.get("/:id", async (req, res) => {
	try {
		let post = await db.Post.findById(req.params.id);
		res.json(post);
	} catch (err) {
		console.error(err);
		res.status(500).end();
		return;
	}
});

// Create Post
router.post("/", async function (req, res) {
	try {
		let newPost = new db.Post({ content: req.body.content });
		if (!newPost.content) {
			return res.status(400).send("Content missing");
		}
		await newPost.save((err, newPost) => {
			if (err) {
				console.error(err);
				return res.status(500).end();
			}
		});
		res.json(newPost);
	} catch (err) {
		console.error(err);
		res.status(500).end();
	}
});

// Update member
router.put("/:id", async function (req, res) {
	try {
		// Get requested post
		// Update post if there is a change

		const postUpdate: any = {};
		if (req.body.content) postUpdate.content = req.body.content;

		db.Post.findByIdAndUpdate(req.params.id, postUpdate);
	} catch (err) {
		console.error(err);
		res.status(500).end();
	}
});

//Delete member

router.delete("/:id", (req, res) => {
	try {
		db.Post.findByIdAndDelete(req.params.id);
		res.end();
	} catch (err) {
		console.error(err);
		res.status(500).end();
	}
});

module.exports = router;
