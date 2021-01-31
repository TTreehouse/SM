import db = require("../db");

export { authSession, authUser };

const authSession = async (req, res, next) => {
	if ("user_id" in req.cookies && "session_id" in req.cookies) {
		let user: db.IUser = await db.User.findById(req.cookies.user_id);
		if (user != undefined) {
			let authenticated: boolean = false;
			let expired = false;
			if (user.sessionKeys != undefined) {
				user.sessionKeys.forEach((key, i) => {
					if (key.expiry < Date.now()) {
						if (key.key === req.cookies.session_id) expired = true;
						user.sessionKeys.splice(i, 1);
					} else if (key.key === req.cookies.session_id) {
						authenticated = true;
					}
				});
			}
			user.save();
			if (!authenticated) {
				if (expired) res.status(401).send("session_id expired").end();
				else res.status(401).send("session_id not found").end(); // User not authenticated
			}
		} else {
			res.status(401).send("user_id not found").end();
		}
	} else {
		res.status(401).send("Cookie missing information").end();
	}

	next();
};

let authUser = (req, res, authorizedId): boolean => {
	if (req.cookies.user_id === authorizedId) return true;
	else {
		//res.status(401).send("User not allowed to access this content").end();
		return false;
	}
};
