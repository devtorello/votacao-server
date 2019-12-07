const { hashPass, comparePass, getToken } = require('../Security')

// SPACE RESERVED: QUERIES

/**
 * Fetch All Users
 * 
 * @param {*} parent 
 * @param {*} args Arguments passed to the API
 * @param {*} ctx Context in order to use prisma
 */
const allUsers = (parent, args, ctx) => ctx.prisma.users()

/**
 * Fetch just one user based on email.
 * 
 * @param {*} parent 
 * @param {*} args Arguments passed to the API
 * @param {*} ctx Context in order to use prisma
 */
const fetchUser = (parent, args, ctx) => ctx.prisma.user({ email: args.email })

// SPACE RESERVED: MUTATIONS

/**
 * Stores user information in order to sign him
 * up.
 * 
 * @param {*} parent 
 * @param {*} args Arguments passed to the API
 * @param {*} ctx Context in order to use prisma
 */
const signUp = async (parent, args, ctx) => {
    const { password: rawPass } = args

    const user = ctx.prisma.createUser({
        ...args,
        password: await hashPass(rawPass)
    })

    return user
}

/**
 * Log the user in.
 * 
 * @param {*} parent 
 * @param {*} args Arguments passed to the API
 * @param {*} ctx Context in order to use prisma
 */
const signIn = async (parent, args, ctx) => {
    const user = await ctx.prisma.user({ email: args.email })

    if (!user)
        throw new Error('Invalid email!')

    if (!await comparePass(args.password, user.password))
        throw new Error('Invalid password!')

    return {
        token: getToken(user.id, user.email),
        email: user.email
    }
}

module.exports = {
    allUsers,
    fetchUser,

    signUp,
    signIn
}