const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')

/**
 * Function responsible for encrypting user password.
 * 
 * @param {String} pass User Password 
 */
const hashPass = async (pass) => await bcrypt.hash(pass, 10)

/**
 * Comparison between the password inputted by user with 
 * the one which is stored in the db.
 * 
 * @param {String} pass Password inputted by user 
 * @param {String} hashed Hashed password stored in db
 */
const comparePass = async (pass, hashed) => await bcrypt.compare(pass, hashed)

/**
 * Generate auth token.
 * 
 * @param {String} id User ID
 * @param {String} ra User ra 
 */
const getToken = async (id, ra) => jwt.sign({ id, ra }, 'voting-system')

const decodeToken = (token, secret) => jwt.verify(token, secret)

module.exports = {
    hashPass,
    comparePass,
    getToken,
    decodeToken
}