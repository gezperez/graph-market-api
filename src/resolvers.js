import User from "./models/User"

export default {
    Query: {
        users: async (_, args, ctx) => {
            console.log('aca', ctx)
            return await User.find()
        }
    },
    Mutation: {
        createUser: async (_, { input }) => {
            const newUser = new User(input)
            await newUser.save()
            return newUser
        },
        deleteUser: async (_, { _id }) => await User.findByIdAndDelete(_id),
        updateUser: async (_, { _id, input }) => await User.findByIdAndUpdate(_id, input, { new: true })
    }
}