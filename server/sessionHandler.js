"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sessionIdLifeTime = exports.clearSessionIds = exports.createSessionId = void 0;
const db = require("./db");
const uuid_1 = require("uuid");
const sessionIdLifeTime = 7;
exports.sessionIdLifeTime = sessionIdLifeTime;
let createSessionId = (user) => {
    return new Promise(async (resolve, reject) => {
        if (user != null && user != undefined) {
            user.sessionKeys.forEach((key, i) => {
                if (key.expiry < Date.now()) {
                    user.sessionKeys.slice(i, 1);
                }
            });
        }
        else {
            reject();
        }
        let newKey = {
            key: uuid_1.v4(),
            // Multiplying by 86400000 gives time in days
            expiry: Date.now() + 86400000 * sessionIdLifeTime,
        };
        user.sessionKeys.push(newKey);
        user.save();
        resolve(newKey.key);
    });
};
exports.createSessionId = createSessionId;
let clearSessionIds = (userId) => {
    return new Promise(async (resolve, reject) => {
        let user = await db.User.findById(userId);
        user.sessionKeys = [];
        user.save();
        resolve();
    });
};
exports.clearSessionIds = clearSessionIds;
//# sourceMappingURL=sessionHandler.js.map