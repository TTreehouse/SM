const mongoose = require("mongoose");

let postSchema;
let Post;

let userSchema;
let User;

exports.MongoSetup = async function MongoSetup() {
	mongoose.connect("mongodb://localhost:27017/sm", {
		useNewUrlParser: true,
		useUnifiedTopology: true,
	});

	const db = mongoose.connection;

	db.on("error", console.error.bind(console, "connection error: "));
	db.once("open", async () => {
		// Connection achieved.
		postSchema = new mongoose.Schema({
			title: String,
			body: String,
			date: { type: Date, default: Date.now },
		});

		// Methods must be added before mongoose.model
		// Currently not working
		postSchema.methods.printBody = function () {
			const message = this.body
				? "The body of this post is: " + this.body
				: "This post does not have a body";
			console.log(this.body);
			console.log(message);
		};

		// the name of the model is the same as the singular version of the name of the collection
		// the posts save to. for example post => posts, bus => buses
		Post = mongoose.model("post", postSchema);

		userSchema = new mongoose.Schema({
			username: String,
			password: String,
			displayName: String,
			biography: String,
			creationDate: { type: Date, default: Date.now },
		});

		userSchema.methods.authenticate = function (username, password) {
			if (this.username === username && this.password === password)
				//authentication passed
				return true;
			return false;
		};

		// the name of the model is the same as the singular version of the name of the collection
		// the posts save to. for example post => posts, bus => buses
		User = mongoose.model("user", userSchema);

		// Export Post to be used in another file
		exports.Post = Post;
		exports.User = User;
	});
};
