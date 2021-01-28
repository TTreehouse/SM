"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const router = express.Router();
const db = require("../../db");
// Gets all members
router.get("/", (req, res) => {
    try {
        db.Post.find(function (err, posts) {
            if (err)
                return console.error(err);
            res.json(posts);
        });
    }
    catch (err) {
        console.error(err);
        res.status(500).end();
    }
});
// get single member
router.get("/:id", (req, res) => {
    try {
        db.Post.findById(req.params.id, function (err, posts) {
            if (err)
                return console.error(err);
            res.json(posts[0]);
        });
    }
    catch (err) {
        console.error(err);
        res.status(500).end();
    }
});
// Create Post
router.post("/", async function (req, res) {
    try {
        console.log(req.body);
        let newPost = new db.Post({ content: req.body.content });
        if (!newPost.content) {
            return res.status(400).send("content missing");
        }
        await newPost.save((err, newPost) => {
            if (err) {
                console.error(err);
                return res.status(500).end();
            }
        });
        res.json(newPost);
    }
    catch (err) {
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
        if (req.body.content)
            postUpdate.content = req.body.content;
        db.Post.findByIdAndUpdate(req.params.id, postUpdate);
    }
    catch (err) {
        console.error(err);
        res.status(500).end();
    }
});
//Delete member
router.delete("/:id", (req, res) => {
    try {
        db.Post.findByIdAndDelete(req.params.id);
        res.end();
    }
    catch (err) {
        console.error(err);
        res.status(500).end();
    }
});
module.exports = router;
//# sourceMappingURL=posts.js.map