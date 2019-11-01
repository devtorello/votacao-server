const { ApolloServer } = require('apollo-server')
const { prisma } = require('./generated/prisma-client')

const resolvers = {}

const server = new ApolloServer({
    typeDefs: './model/schema.graphql',
    resolvers,
    context: req => {
        return {
            ...req,
            prisma
        }
    }
})

server.listen().then(({ url }) => { console.log(`Server is listening on ${url}`) })
