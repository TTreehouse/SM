import shajs = require("sha.js");

let makeid = (length: number) => {
	var result = "";
	var characters =
		"ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
	var charactersLength = characters.length;
	for (var i = 0; i < length; i++) {
		result += characters.charAt(Math.floor(Math.random() * charactersLength));
	}
	return result;
};

let saltPassword = (password: string): Object => {
	let salt = makeid(16);
	return {
		hash: shajs("sha256")
			.update(salt + password)
			.digest("hex"),
		salt: salt,
	};
};

let checkSalt = (password: string, salt: string, hash: string) => {
	return (
		shajs("sha256")
			.update(salt + password)
			.digest("hex") === hash
	);
};

export { saltPassword, checkSalt };
