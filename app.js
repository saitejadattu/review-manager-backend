const express = require('express')
const UserRouter = require('./routes/userRouter')
const ReviewRouter = require('./routes/reviewRouter')
const connectToDB = require('./dbConnection')
const dotenv = require('dotenv')
const cors = require('cors')
const app = express()
app.use(express.json())
dotenv.config();
app.use(cors())
connectToDB()

app.use('/user', UserRouter)
app.use('/review', ReviewRouter)

app.listen(process.env.PORT, () => {
    console.log(`🚀 Server Runnig At Port ${process.env.PORT}`)
})