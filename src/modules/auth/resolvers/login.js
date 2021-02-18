import { AuthenticationError } from 'apollo-server-express'
import bcrypt from 'bcrypt'

import tokenUtil from '../../../utils/token'
import User from '../../../models/user'
import config from '../../../config'

const login = async (_, { email, password }) => {
    const user = await User.findOne({
        email
    })
    if (!user) {
        throw new AuthenticationError('User not found')
    }
    const isPasswordValid = await bcrypt.compare(password, user.hashedPassword)
    if (!isPasswordValid) {
        throw new AuthenticationError('Incorrect password')
    }
    const token = tokenUtil.create(user._id)
    return {
        user: {
            ...user._doc,
            id: user._id
        },
        token,
        tokenExpiration: config.JWT_LIFE_TIME
    }
}

export default login