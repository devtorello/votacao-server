const newVote = async (parent, args, ctx) => {
    const vote = await ctx.prisma.createVote({ ...args })

    if (!vote)
        throw new Error('Invalid data!')

    return vote
}

const countCandidateVotes = async (parent, args, ctx) => { 
    const count = await ctx.prisma
        .votesConnection({ where: { candidateNum: args.candidateNum } })
        .aggregate()
        .count()

    return {
        total: count
    }
}

const getUserVotes = (parent, args, ctx) => {
    const vote = ctx.prisma.vote({ userId: args.userId })
    
    return vote
}

module.exports = {
    countCandidateVotes,
    getUserVotes,

    newVote
}