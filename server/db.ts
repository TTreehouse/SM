import mongoose = require("mongoose");
import uuid = require("uuid");

let Post: mongoose.Model<IPost>;
let User: mongoose.Model<IUser>;

interface IPost extends mongoose.Document {
	content: string;
	date: number;
}

interface IUser extends mongoose.Document {
	username: string;
	password: string;
	displayName: string;
	biography: string;
	sessionKeys: { key: string; expiry: number }[];
	creationDate: number;
	sendableUser(): object;
}

export { MongoSetup, Post, User, IPost, IUser };

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
		Post = mongoose.model<IPost>("Post", postSchema);

		let userSchema = new mongoose.Schema({
			username: String,
			password: String,
			displayName: String,
			biography: String,
			sessionKeys: { type: [{ key: String, expiry: Number }] },
			creationDate: Number,
		});

		userSchema.methods.sendableUser = function (): object {
			const user: any = this;
			return {
				username: user.username,
				displayName: user.displayName,
				biography: user.biography,
			};
		};

		// the name of the model is the same as the singular version of the name of the collection
		// the posts save to. for example post => posts, bus => buses
		User = mongoose.model<IUser>("User", userSchema);
	});
};
