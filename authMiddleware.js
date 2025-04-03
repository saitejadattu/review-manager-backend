const jwt = require('jsonwebtoken')
const dotenv = require('dotenv')
dotenv.config()

const Authorization = async (request, response, next) => {
    try {
        const jwtToken = request["headers"].authorization.split(' ')[1]
        if (jwtToken) {
            jwt.verify(jwtToken, process.env.SECRET_KEY, (error, payload) => {
                if (error) {
                    response.status(400).json({
                        message: error.message
                    })
                } else {
                    request.payload = payload
                    next()
                }
            })
        } else {
            response.status(401).json({
                message: "Invalid access token"
            })
        }
    } catch (error) {
        response.status(500).json({
            message: error.message
        })
    }
}

module.exports = Authorization