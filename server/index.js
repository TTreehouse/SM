"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
var fs = require("fs");
var https = require("https");
var shajs = require("sha.js");
//runs code in db file
const db = require("./db");
const sessionHandler_1 = require("./sessionHandler");
const authSession_1 = require("./middleware/authSession");
const app = express();
// init middleware
//app.use(logger);
app.use(cors());
// Initialize body parser middleware
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: false }));
db.MongoSetup();
// Loads the file ./routes/api/members to handle requests at /api/members
app.use("/api/posts", require("./routes/api/posts"));
app.use("/api/users", require("./routes/api/users"));
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server started on ${PORT}`));
app.get("/lmao", async (req, res) => {
    try {
        let key = await sessionHandler_1.createSessionId(await db.User.findById(req.body.id));
        let cookieOptions = {
            //path: "/session",
            expires: new Date(Date.now() + 86400000 * sessionHandler_1.sessionIdLifeTime),
        };
        res.cookie("user_id", req.body.id, cookieOptions);
        res.cookie("session_id", key, cookieOptions);
        res.end();
    }
    catch {
        res.status(400).send("Missing user_id").end();
    }
});
app.get("/protected", authSession_1.authSession, async (req, res) => {
    res.send("hey well done you have hacked the system");
});
app.get("/clear", async (req, res) => {
    try {
        if ("id" in req.body) {
            sessionHandler_1.clearSessionIds(req.body.id);
            res.end();
        }
        else {
            res.status(400).end();
        }
    }
    catch {
        res.status(500).end();
    }
});
//# sourceMappingURL=index.js.map