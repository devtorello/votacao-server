const newVote = async (parent, args, ctx) => {
    const vote = await ctx.prisma.createVote({ ...args, userId: ctx.id || undefined })

    if (!vote)
        throw new Error('Invalid data!')

    return vote
}

const allVotes = async (parent, args, ctx) => await ctx.prisma.votes()

const countCandidateVotes = async (parent, args, ctx) => { 
    const count = await ctx.prisma.votes({ candidateRA: args.candidateRA })

    return {
        total: count
    }
}

const getUserVotes = (parent, args, ctx) => {
    const vote = ctx.prisma.vote({ userId: ctx.id })
    
    return vote
}

module.exports = {
    countCandidateVotes,
    getUserVotes,
    allVotes,

    newVote
}