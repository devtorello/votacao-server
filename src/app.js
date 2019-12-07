const { prisma } = require('./generated/prisma-client')
const { importSchema } = require('graphql-import')
const { ApolloServer } = require('apollo-server')

const typeDefs = importSchema('./src/schema.graphql')

const { Mutation } = require('./controllers/Mutation')
const { Query } = require('./controllers/Query')

const server = new ApolloServer({
    typeDefs,
    resolvers: {
        Query,
        Mutation
    },
    context: request => {
        return {
            ...request,
            prisma
        }
    }
})

server.listen().then(({ url }) => { console.log(`Server is listening on ${url}`) })
