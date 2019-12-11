const { prisma } = require('./generated/prisma-client')
const { importSchema } = require('graphql-import')
const { ApolloServer } = require('apollo-server')

const typeDefs = importSchema('./src/schema.graphql')

const { Mutation } = require('./controllers/Mutation')
const { Query } = require('./controllers/Query')

const { decodeToken } = require('./Security')

const server = new ApolloServer({
    typeDefs,
    resolvers: {
        Query,
        Mutation
    },
    context: ({ req }) => {
        const token = req.headers.authorization || null
        let data = token ? decodeToken(token.split(' ')[1], 'voting-system') : null
        
        return {
            ...req,
            prisma,
            id: data ? data.id : undefined,
            ra: data ? data.ra : undefined
        }
    }
})

server.listen().then(({ url }) => { console.log(`Server is listening on ${url}`) })
