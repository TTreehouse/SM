import db = require("./db");
import mongoose = require("mongoose");
import moment = require("moment");
import e = require("express");
import { v4 } from "uuid";

const sessionIdLifeTime = 7;

export { createSessionId, clearSessionIds, sessionIdLifeTime };

let createSessionId = (userId: string): Promise<string> => {
	return new Promise(async (resolve, reject) => {
		let user: db.IUser = await db.User.findById(userId);
		console.log(user);
		if (user != null && user != undefined) {
			user.sessionKeys.forEach((key, i) => {
				if (key.expiry < Date.now()) {
					user.sessionKeys.slice(i, 1);
				}
			});
		} else {
			reject();
		}
		let newKey = {
			key: v4(),
			// Multiplying by 86400000 gives time in days
			expiry: Date.now() + 86400000 * sessionIdLifeTime,
		};
		user.sessionKeys.push(newKey);
		user.save();
		resolve(newKey.key);
	});
};

let clearSessionIds = (userId: string): Promise<void> => {
	return new Promise(async (resolve, reject) => {
		let user: db.IUser = await db.User.findById(userId);
		user.sessionKeys = [];
		user.save();
		resolve();
	});
};
