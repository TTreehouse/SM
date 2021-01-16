const mongoose = require("mongoose");

let postSchema;
let Post;

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

		// Export postSchema and Post to be used in another file
		exports.postSchema = postSchema;
		exports.Post = Post;

		let randomNum = String(Math.random());
		const post1 = new Post({
			title: "post1 " + randomNum,
			body: "the first post " + randomNum,
		});

		/*await post1.save((err, post1) => {
            if (err) {
                return console.error(err);
            }
        });*/

		Post.find(function (err, posts) {
			if (err) return console.error(err);
			console.log(posts);
		});
	});
};
