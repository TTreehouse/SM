"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = exports.Post = exports.MongoSetup = void 0;
const mongoose = require("mongoose");
let Post;
exports.Post = Post;
let User;
exports.User = User;
let MongoSetup = () => {
    mongoose.connect("mongodb://localhost:27017/sm", {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    });
    const db = mongoose.connection;
    db.on("error", console.error.bind(console, "connection error: "));
    db.once("open", async () => {
        // Connection achieved.
        let postSchema = new mongoose.Schema({
            content: String,
            date: { type: Number, default: Date.now },
        });
        // the name of the model is the same as the singular version of the name of the collection
        // the posts save to. for example post => posts, bus => buses
        exports.Post = Post = mongoose.model("Post", postSchema);
        let userSchema = new mongoose.Schema({
            username: String,
            password: String,
            displayName: String,
            biography: String,
            sessionKeys: { type: [{ key: String, expiry: Number }] },
            creationDate: Number,
        });
        userSchema.methods.sendableUser = function () {
            const user = this;
            return {
                username: user.username,
                displayName: user.displayName,
                biography: user.biography,
            };
        };
        // the name of the model is the same as the singular version of the name of the collection
        // the posts save to. for example post => posts, bus => buses
        exports.User = User = mongoose.model("User", userSchema);
    });
};
exports.MongoSetup = MongoSetup;
//# sourceMappingURL=db.js.map