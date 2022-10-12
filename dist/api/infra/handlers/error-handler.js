"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorHandler = void 0;
const logger_1 = require("../middleware/logger");
const error_code_1 = require("./error-code");
const error_exception_1 = require("./error-exception");
const errorHandler = (err, req, res, next) => {
    logger_1.logger.info("Error handling middleware called.");
    logger_1.logger.info("Path:", req.path);
    logger_1.logger.error("Error occured:", err);
    if (err instanceof error_exception_1.ErrorException) {
        logger_1.logger.error("Error is known.");
        res.status(err.status).send(err);
    }
    else {
        res
            .status(500)
            .send({ code: error_code_1.ErrorCode.UnknownError, status: 500 });
    }
};
exports.errorHandler = errorHandler;
