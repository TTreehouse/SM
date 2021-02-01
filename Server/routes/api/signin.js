"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const router = express.Router();
const db = require("../../db");
const salter_1 = require("../../salter");
const sessionHandler_1 = require("../../sessionHandler");
router.post("/", async (req, res) => {
    if (!("username" in req.body) || !("password" in req.body)) {
        return res.status(400).end();
    }
    else {
        let user = await db.User.findOne({ username: req.body.username });
        if (user == null || user == undefined) {
            return res.status(400).end();
        }
        let authenticated = salter_1.checkSalt(req.body.password, user.salt, user.hash);
        if (authenticated) {
            let sessionId = await sessionHandler_1.createSessionId(user);
            console.log(typeof sessionId.expiry);
            let cookieOptions = {
                expires: new Date(sessionId.expiry),
                httpOnly: true,
                signed: true,
            };
            res.cookie("user_id", user.id, cookieOptions);
            res.cookie("session_id", sessionId.key, cookieOptions);
            return res.json(user.sendableUser());
        }
        else
            return res.status(400).end();
    }
});
module.exports = router;
//# sourceMappingURL=signin.js.map