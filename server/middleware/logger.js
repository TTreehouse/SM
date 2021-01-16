const moment = require("moment");

const logger = (req, res, next) => {
    console.log(`${req.protocol}://${req.get("host")}${req.originalUrl}: ${moment().format()}`);
    // Next is required to send to next middleware
    next();
};

module.exports = logger;