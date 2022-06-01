const notFoundMiddleware = (req, res) => {res.status(404).json({msg : `Resource not found!`})}

module.exports = notFoundMiddleware