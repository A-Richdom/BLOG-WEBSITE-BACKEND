function resHandler({res, message, statusCode, data}) {
    return res.status(statusCode).json({
        status: statusCode >= 400 ? 'error' : 'success',
        message,
        data,
    })
};

module.exports = {resHandler};