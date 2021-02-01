"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.authUser = exports.authSession = void 0;
const cookieParser = require("cookie-parser");
const __1 = require("..");
const db = require("../db");
const authSession = async (req, res, next) => {
    if ("user_id" in req.signedCookies && "session_id" in req.signedCookies) {
        cookieParser.signedCookies(req.signedCookies, __1.cookieSecret);
        let user = await db.User.findById(req.signedCookies.user_id);
        if (user != undefined) {
            let authenticated = false;
            let expired = false;
            if (user.sessionKeys != undefined) {
                user.sessionKeys.forEach((key, i) => {
                    if (key.expiry < Date.now()) {
                        if (key.key === req.signedCookies.session_id)
                            expired = true;
                        user.sessionKeys.splice(i, 1);
                    }
                    else if (key.key === req.signedCookies.session_id) {
                        authenticated = true;
                    }
                });
            }
            user.save();
            if (!authenticated) {
                if (expired)
                    res.status(401).end();
                else
                    res.status(401).end();
            }
        }
        else {
            res.status(401).end();
        }
    }
    else {
        res.status(401).end();
    }
    next();
};
exports.authSession = authSession;
let authUser = (req, res, authorizedId) => {
    cookieParser.signedCookies(req.signedCookies, __1.cookieSecret);
    if (req.signedCookies.user_id === authorizedId)
        return true;
    else {
        //res.status(401).send("User not allowed to access this content").end();
        return false;
    }
};
exports.authUser = authUser;
//# sourceMappingURL=authSession.js.map