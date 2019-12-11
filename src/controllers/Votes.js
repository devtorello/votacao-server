const newVote = async (parent, args, ctx) => {
    const vote = await ctx.prisma.createVote({ CPF: args.CPF, userId: ctx.id })

    if (!vote)
        throw new Error('Invalid data!')

    return vote
}

const allVotes = async (parent, args, ctx) => await ctx.prisma.votes()

const countCandidateVotes = async (parent, args, ctx) => { 
    const count = await ctx.prisma.votes({ CPF: args.CPF })

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