// backend/middlewares/errorHandler.js
const errorList = require('../utils/errorList');

const errorHandler = (err, req, res, next) => {
    const error = errorList[err.name] || errorList.Unknown;
    
    console.error(`[${new Date().toISOString()}] Error ${error.code}: ${err.message}`);
    if (err.details) console.error('Detalles:', err.details);
    
    res.status(error.status).json({
        success: false,
        error: {
            code: error.code,
            message: error.message,
            details: err.details || undefined
        }
    });
};

module.exports = errorHandler;