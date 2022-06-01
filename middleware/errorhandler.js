const {StatusCodes} = require('http-status-codes')
const errorHandlerMiddleware = async (err, req, res, next) => {
    const customError = {
        statusCode : err.statusCode || StatusCodes.INTERNAL_SERVER_ERROR,
        msg : err.message || `Something is wrong with our server please try again later!`
    }

    if (err.name === 'ValidationError') {
        customError.msg = Object.values(err.errors).map((items) => items.message).join(',')
        customError.statusCode = 400
    }
    
    if (err.code && err.code === 11000) {
        customError.msg = `Duplicate value entered for ${Object.keys(err.keyValue)}. Please provide another ${Object.keys(err.keyValue)}`
        customError.statusCode = 400
    }

    if (err.name === 'CastError') {
        customError.msg = `No item found with id : ${err.value}`
        customError.statusCode = 404
    }

    return res.status(customError.statusCode).json({mg : customError.msg})
}

module.exports = errorHandlerMiddleware