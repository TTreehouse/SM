const express = require("express");
const router = express.Router();
const db = require("../../db");

// Gets all members
router.get("/", async function (req, res) {
	try {
		db.Post.find(function (err, posts) {
			if (err) return console.error(err);
			res.json(posts);
		});
	} catch (err) {
		console.error(err);
		res.status(500).end();
	}
});

// get single member
router.get("/:id", async function (req, res) {
	try {
		db.Post.findById(req.params.id, function (err, posts) {
			if (err) return console.error(err);
			if (posts.length > 1) {
				//Handle this issue;
			}
			res.json(posts[0]);
		});
	} catch (err) {
		console.error(err);
		res.status(500).end();
	}
});

// Create Post
router.post("/", async function (req, res) {
	try {
		let newPost = new db.Post({ title: req.body.title, body: req.body.body });
		if (!newPost.title || !newPost.body) {
			console.log(req.body.title);
			console.log(req.body.body);
			return res.status(400).send("Title or body missing");
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

		const postUpdate = {};
		if (req.body.title) postUpdate.title = req.body.title;
		if (req.body.body) postUpdate.body = req.body.body;

		db.Post.findByIdAndUpdate(
			req.params.id,
			postUpdate,
			function (err, result) {
				res.json(result);
			}
		);
	} catch (err) {
		console.error(err);
		res.status(500).end();
	}
});

//Delete member

router.delete("/:id", (req, res) => {
	try {
		db.Post.findByIdAndDelete(req.params.id, (err) => {
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
