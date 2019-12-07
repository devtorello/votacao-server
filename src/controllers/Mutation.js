const { signUp, signIn } = require('./User')
const { createCandidate } = require('./Candidate')
const { newVote } = require('./Votes')

module.exports = {
    Mutation: {
        // USER CONTROLLER
        signUp,
        signIn,

        // CANDIDATE CONTROLLER
        createCandidate,

        // VOTE CONTROLLER
        newVote
    }
}