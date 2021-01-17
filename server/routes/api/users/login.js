const express = require("express");
const router = express.Router();
const db = require("../../../db");
const uuid = require("uuid");

// User authentication

router.post("/", async function (req, res) {
	const user = await db.User.findOne({ username: req.body.username });
	const authenticated = await user.authenticate(
		req.body.username,
		req.body.password
	);
	if (authenticated) {
		return res.send("Authentication passed.");
	} else {
		return res.status(403).send("Authentication failed.");
	}
});

module.exports = router;
