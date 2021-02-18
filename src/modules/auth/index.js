import { gql } from 'apollo-server-express'
import resolvers from './resolvers'

const typeDefs = gql`
  extend type Query {
    me: User @isAuthenticated
  }
  
  extend type Mutation {
    login(
      email: String!,
      password: String!
    ): AuthData
    signup(
      userName: String!,
      firstName: String!,
      lastName: String!
      email: String!,
      password: String!,
    ): User
  }
  type AuthData {
    user: User
    token: String!
    tokenExpiration: String!
  }
  type User {
    id: ID!
    userName: String!,
    firstName: String!
    lastName: String!
    email: String!
    password: String!
  }
`

export default {
  typeDefs: [
    typeDefs
  ],
  resolvers
}