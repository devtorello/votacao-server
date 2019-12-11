const { signUp, signIn } = require('./User')
const { createCandidate, deleteCandidate } = require('./Candidate')
const { newVote } = require('./Votes')

module.exports = {
    Mutation: {
        // USER CONTROLLER
        signUp,
        signIn,

        // CANDIDATE CONTROLLER
        createCandidate,
        deleteCandidate,

        // VOTE CONTROLLER
        newVote
    }
}