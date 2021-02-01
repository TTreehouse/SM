"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const router = express.Router();
const db = require("../../db");
const authSession_1 = require("../../middleware/authSession");
const salter_1 = require("../../salter");
// Gets all members
router.get("/", authSession_1.authSession, async function (req, res) {
    try {
        if (!res.headersSent) {
            db.User.find(function (err, users) {
                if (err)
                    return console.error(err);
                res.json(users);
            });
        }
    }
    catch (err) {
        console.error(err);
        res.status(500).end();
    }
});
// get single member
router.get("/:username", authSession_1.authSession, async function (req, res) {
    try {
        if (!res.headersSent) {
            const user = await db.User.findOne({
                username: req.params.username,
            });
            if (user != null && user != undefined) {
                if (authSession_1.authUser(req, res, user.id)) {
                    res.json(user.sendableUser());
                }
                else
                    res.status(401).send("Not authorized to access this user");
            }
            else
                res.status(404).end();
        }
    }
    catch (err) {
        console.error(err);
        res.status(500).end();
        return;
    }
});
//Create Post
router.post("/", async function (req, res) {
    try {
        let dateNow = Date.now();
        if (!req.body.username ||
            !req.body.password ||
            !req.body.displayName ||
            !req.body.biography) {
            return res.status(400).send("Missing information");
        }
        let hash = salter_1.saltPassword(req.body.password);
        let newUser = new db.User({
            username: req.body.username,
            hash: hash.hash,
            salt: hash.salt,
            displayName: req.body.displayName,
            biography: req.body.biography,
            creationDate: dateNow,
            sessionKeys: [],
        });
        await newUser.save((err, newUser) => {
            if (err) {
                console.error(err);
                return res.status(500).end();
            }
        });
        //res.json(newUser.sendableUser());
        res.json(newUser);
    }
    catch (err) {
        console.error(err);
        res.status(500).end();
    }
});
// Update member
router.put("/:username", authSession_1.authSession, async function (req, res) {
    try {
        if (!res.headersSent) {
            // Get requested post
            // Update post if there is a change
            const user = await db.User.findOne({
                username: req.params.username,
            });
            if (user != null && user != undefined) {
                if (authSession_1.authUser(req, res, user.id)) {
                    const userUpdate = {};
                    if (req.body.username)
                        user.username = req.body.username;
                    if (req.body.displayName)
                        user.displayName = req.body.displayName;
                    if (req.body.biography)
                        user.biography = req.body.biography;
                    user.save();
                    res.json(user.sendableUser());
                }
                else
                    res.status(401).send("Not authorized to access this user");
            }
            else
                res.status(404).end();
        }
    }
    catch (err) {
        console.error(err);
        res.status(500).end();
    }
});
//Delete member
router.delete("/:username", authSession_1.authSession, (req, res) => {
    try {
        if (!res.headersSent) {
            db.User.deleteOne({ username: req.params.username });
            res.end();
        }
    }
    catch (err) {
        console.error(err);
        res.status(500).end();
    }
});
module.exports = router;
//# sourceMappingURL=users.js.map