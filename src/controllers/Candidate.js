// SPACE RESERVED: QUERIES

/**
 * Fetch All Candidates
 * 
 * @param {*} parent 
 * @param {*} args Arguments passed to the API
 * @param {*} ctx Context in order to use prisma
 */
const allCandidates = (parent, args, ctx) => ctx.prisma.candidates()

/**
 * Fetch just one candidate based on it's political number.
 * 
 * @param {*} parent 
 * @param {*} args Arguments passed to the API
 * @param {*} ctx Context in order to use prisma
 */
const fetchCandidate = (parent, args, ctx) => ctx.prisma.candidate({ politicNumber: args.politicNumber })

// SPACE RESERVED: MUTATIONS

/**
 * Create a candidate.
 * 
 * @param {*} parent 
 * @param {*} args Arguments passed to the API
 * @param {*} ctx Context in order to use prisma
 */
const createCandidate = async (parent, args, ctx) => { 
    const candidate = await ctx.prisma.createCandidate({ ...args })

    if (!candidate)
        throw new Error('Error on creating the candidate!')
    
    return candidate
}

const deleteCandidate = async (parent, args, ctx) => {
    const candidate = await ctx.prisma.deleteCandidate({ id: args.id })

    if (!candidate)
        throw new Error('Error on deleting the candidate!')

    return candidate
}

module.exports = {
    allCandidates,
    fetchCandidate,

    createCandidate,
    deleteCandidate
}