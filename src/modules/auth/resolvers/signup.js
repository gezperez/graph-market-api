import { UserInputError } from 'apollo-server-express'
import bcrypt from 'bcrypt'

import User from '../../../models/user'

const SALT_ROUNDS = 12

const signup = async (_, {
    userName,
    firstName,
    lastName,
    email,
    password
}) => {
    try {
        const existingUser = await User.findOne({
            email
        })
        if (existingUser) {
            throw new UserInputError('User already exists')
        }
        const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS)
        const user = await User.create({
            userName,
            firstName,
            lastName,
            email,
            hashedPassword,
        })
        return {
            ...user._doc,
            id: user._id,
            hashedPassword: null
        }
    } catch (error) {
        throw error
    }
}

export default signup