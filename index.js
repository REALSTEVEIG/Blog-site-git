require('dotenv').config()
require('express-async-errors')

const express = require('express')
const app = express()
const connectDB = require('./db/connect')
const errorHandlerMiddleware = require('./middleware/errorhandler')
const notFoundMiddleware = require('./middleware/notfound')
const port = process.env.PORT || 3100
const authRouter = require('./routes/auth')

app.use(express.static('/public'))
app.use(express.json())

//routes go here e.g app.use('/', (req, res) => {return res.render('./public')})
app.use('/auth', authRouter)

app.use(errorHandlerMiddleware)
app.use(notFoundMiddleware)

const start = async () => {
    try {
        await connectDB(process.env.MONGO_URI)
        app.listen(port, () => {
            console.log(`Server is listening on port ${port}`)
        })
    } catch (error) {
        console.log(error)
    }
}

start()