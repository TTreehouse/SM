const express = require("express");
const router = express.Router();
const uuid = require("uuid");
const members = require("../../members");
const mongo = require("../../mongo")
var ObjectID = require('mongodb').ObjectID;

// Gets all members
router.get("/", async function (req, res) {
    if (mongo.client.isConnected) {
        try {
            let collection = await mongo.setCollection("sm", "posts")
            let posts = await collection.find();

            res.json(await posts.toArray());
        }
        catch {
            // Error in program. Send error for Internal Server Error
            res.status(500).end;
        }
    }
    else {
        // Not connected. Send error for Service Unavailable
        res.status(503).end();
    }
});

// get single member
router.get("/:id", async function (req, res) {
    if (mongo.client.isConnected) {
        try {
            let collection = await mongo.setCollection("sm", "posts")
            let posts = await collection.find().toArray();
            const found = await posts.some(post => post._id == req.params.id)
            if (found)
                res.json(posts.filter(post => post._id == req.params.id))
            else {
                res.status(400).json({ msg: `Member (${req.params.id}) not found` });
            }
        }
        catch {
            // Error in program. Send error for Internal Server Error
            res.status(500).end;
        }
    }
    else {
        // Not connected. Send error for Service Unavailable
        res.status(503).end();
    }
});

// Create Post
router.post("/", async function (req, res) {


    if (mongo.client.isConnected) {
        try {
            let collection = await mongo.setCollection("sm", "posts")
            const newPost = {
                title: req.body.title,
                body: req.body.body
            }
            console.log("Rr")
            console.log(req.body)
            if (!newPost.title || !newPost.body) {
                res.status(400).json({ msg: "Title or body not included" })
                return;
            }
            //array.push just adds a new element to array
            res.json(await (await collection.insertOne(newPost)).ops)
        }
        catch {
            // Error in program. Send error for Internal Server Error
            res.status(500).end;
        }
    }
    else {
        // Not connected. Send error for Service Unavailable
        res.status(503).end();
    }
});

// Update member
router.put("/:id", async function (req, res) {
    if (mongo.client.isConnected) {
        try {
            let collection = await mongo.setCollection("sm", "posts");
            //const found = await collection.findOne({_id});
            console.log("hui")
            console.log(ObjectId("eee"))
            console.log(String(found._id) === "5fff2ddb31b81a0500f2557b");

            if (found) {
                const updMember = req.body;
                // The way foreaches work in javascript is that you do array.forEach(function) the variable in the array is then passed as an argument.
                // What is happening below is a new function is being created and member is the new variable that is passed the value of members[i] where i is the current member being looked at in the for loop
                members.forEach(member => {
                    if (member.id === parseInt(req.params.id)) {
                        member.name = updMember.name ? updMember.name : member.name;
                        member.email = updMember.email ? updMember.email : member.email;
                        
                        res.json({msg: "Member updated", member})
                    }
                });
            }
            else {
                res.status(400).json({ msg: `Member (${req.params.id}) not found` });
            }
            //array.push just adds a new element to array
            res.json(await (await collection.insertOne(newPost)).ops)
        }
        catch {
            // Error in program. Send error for Internal Server Error
            res.status(500).end;
        }
    }
    else {
        // Not connected. Send error for Service Unavailable
        res.status(503).end();
    }

});


//Delete member

router.delete("/:id", (req, res) => {
    const found = members.some(member => member.id === parseInt(req.params.id))

    if (found)
    {
        member = members.filter(member => member.id !== parseInt(req.params.id));
        members.splice(members.indexOf(member), 1)
        res.json({ msg: "Member deleted", members: member });
    }
    else {
        res.status(400).json({msg: `Member (${req.params.id}) not found`});
    }
});

module.exports = router;

