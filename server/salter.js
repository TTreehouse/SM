"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkSalt = exports.saltPassword = void 0;
const shajs = require("sha.js");
let makeid = (length) => {
    var result = "";
    var characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    var charactersLength = characters.length;
    for (var i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
};
let saltPassword = (password) => {
    let salt = makeid(16);
    return {
        hash: shajs("sha256")
            .update(salt + password)
            .digest("hex"),
        salt: salt,
    };
};
exports.saltPassword = saltPassword;
let checkSalt = (password, salt, hash) => {
    return (shajs("sha256")
        .update(salt + password)
        .digest("hex") === hash);
};
exports.checkSalt = checkSalt;
//# sourceMappingURL=salter.js.map