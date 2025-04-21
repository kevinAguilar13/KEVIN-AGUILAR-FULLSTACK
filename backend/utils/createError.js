// backend/utils/createError.js
const errorList = require('./errorList');

function createError(errorName, customMessage, details = null) {
    const errorTemplate = errorList[errorName] || errorList.Unknown;
    const error = new Error(customMessage || errorTemplate.message);
    error.name = errorName;
    error.code = errorTemplate.code;
    error.status = errorTemplate.status;
    if (details) error.details = details;
    return error;
}

module.exports = createError;