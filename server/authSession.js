"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.authSession = void 0;
const db = require("./db");
let authSession = (sessionId) => {
    console.log("something lmao");
    return new Promise((resolve, reject) => {
        let user = db.User.findById(sessionId);
        resolve(user);
    });
};
exports.authSession = authSession;
//# sourceMappingURL=authSession.js.map