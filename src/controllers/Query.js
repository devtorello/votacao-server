const { allUsers, fetchUser } = require('./User')
const { allCandidates, fetchCandidate } = require('./Candidate')
const { countCandidateVotes, getUserVotes } = require('./Votes')

module.exports = {
    Query: {
        // USER CONTROLLER
        allUsers,
        fetchUser,

        // CANDIDATE CONTROLLER
        allCandidates,
        fetchCandidate,

        // VOTES CONTROLLER
        countCandidateVotes,
        getUserVotes
    }
}