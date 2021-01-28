import db = require("./db");

export { authSession };

let authSession = (sessionId: string): any => {
	console.log("something lmao");
	return new Promise((resolve, reject) => {
		let user = db.User.findById(sessionId);
		resolve(user);
	});
};
