"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.cookieSecret = void 0;
const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
//runs code in db file
const db = require("./db");
const sessionHandler_1 = require("./sessionHandler");
const authSession_1 = require("./middleware/authSession");
const app = express();
const cookieSecret = "BccIZNwhqA4V9ooxJ3jl";
exports.cookieSecret = cookieSecret;
// init middleware
//app.use(logger);
app.use(cors());
// Initialize body parser middleware
app.use(express.json());
app.use(cookieParser(cookieSecret));
app.use(express.urlencoded({ extended: false }));
db.MongoSetup();
// Loads the file ./routes/api/members to handle requests at /api/members
app.use("/api/posts", require("./routes/api/posts"));
app.use("/api/users", require("./routes/api/users"));
app.use("/api/signin", require("./routes/api/signin"));
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server started on ${PORT}`));
app.get("/protected", authSession_1.authSession, async (req, res) => {
    if (!res.headersSent)
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
app.get("/lmao", async (req, res) => {
    console.log(req.cookies);
    console.log(req.signedCookies);
});
//# sourceMappingURL=index.js.map