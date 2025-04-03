const User = require('../models/userModel')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const dotenv = require('dotenv')
dotenv.config()

const userController = {
    "registerUser": async (request, response) => {
        try {
            const { email, password } = request.body
            const user = await User.findOne({ email })
            if (!user) {
                if (password.length < 8) {
                    response.status(400).json({ message: 'password must be 8 characters' })
                }
                else {
                    const hassedPassword = await bcrypt.hash(request.body.password, 10)
                    const newUser = await new User({ ...request.body, password: hassedPassword })
                    await newUser.save()
                    response.status(200).json({
                        message: 'User Registerd Successfully'
                    })
                }
            }
            else {
                response.status(409).json({ message: 'user already exists' })
            }
        }
        catch (e) {
            console.log(e.message)
        }
    },
    "loginUser": async (request, response) => {
        try {
            const { email, password } = request.body
            const user = await User.findOne({ email })
            if (user) {
                const isPassValid = await bcrypt.compare(password, user.password)
                if (isPassValid) {
                    const payload = { id: user._id, email }
                    const jwtToken = jwt.sign(payload, process.env.SECRET_KEY)
                    response.status(200).json({
                        token: jwtToken
                    })
                }
                else {
                    response.status(400).json({
                        message: 'password is incorrect'
                    })
                }
            } else {
                response.status(400).json({
                    message: "Email ID not exists"
                })
            }
        } catch (error) {
            response.status(500).json({
                message: error.message
            })
        }
    }
}

module.exports = userController
