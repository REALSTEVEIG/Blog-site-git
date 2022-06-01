const User = require('../models/User');
const {StatusCodes} = require('http-status-codes');
const { BadRequestAPIError, UnauthenticatedAPIError } = require('../errors');

exports.register = async (req, res) => {
    try {
    const user = await User.create({...req.body})
    const token = user.createJWT() //JWT for added security and exchange of resource 
    res.status(StatusCodes.CREATED).json({user : {name : user.name}, token})
    } catch (error) {
    console.log(error)
    }
}

exports.login = async (req, res) => {
    const {name, email, password} = req.body
    if (!name || !email || !password) {
        throw new BadRequestAPIError('Please provide email and password!')
    }
    const user = await User.findOne({ email })

    if (!user) {
        throw new UnauthenticatedAPIError('Email supplied does not exist in our database!')
    }
    const loginPassword = await user.comparePassword(password)
    if (!loginPassword) {
        throw new UnauthenticatedAPIError('Incorrect password entered!')
    }

    const token = user.createJWT()
    return res.status(StatusCodes.OK).json({user : {name : user.name}, token})
}
