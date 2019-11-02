const { prisma } = require('./generated/prisma-client')
const { importSchema } = require('graphql-import')
const { ApolloServer } = require('apollo-server')

const typeDefs = importSchema('./src/schema.graphql')

const resolvers = {
    Query: { // Equivale a GET
        info: () => 'This is my api!'
    },
    Mutation: { // Equivale a POST, PUT, PATCH e DELETE
        user: (parent, args) => {
            const user = {
                id: 1,
                name: args.name,
                email: args.email
            }

            return user
        }
    }
}

const server = new ApolloServer({
    typeDefs,
    resolvers,
    context: request => {
        return {
            ...request,
            prisma
        }
    }
})

server.listen().then(({ url }) => { console.log(`Server is listening on ${url}`) })
