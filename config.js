/**
 * - Discord Channel Auto Scaling
 * -- Config File
 *
 * @author Aufrère Guillian
 *
 * Don't forget to give permissions to your bot.
 * You can use the following link:
 *      https://discordapp.com/oauth2/authorize?client_id=720669724056354887&scope=bot&permissions=2147483127
 * > client_id = Is your discord server ID.
 * > scope = Don't change that parameter. Great for a bot.
 * > permissions = Permission list. Change when you check permission on the website.
 */

/**
 * Your discord server token.
 * 
 * @type {string}
 */
let token = process.env.TOKEN

/**
 * Status text, what bot's is doing ?
 * 
 * @type {string}
 */
let botActivity = "surveiller"


/**
 * Reference channels premising to create others.
 * > Channel name
 * > Channel ID
 * 
 * @type Array
 */
let referredChannels = {
    "Autoscaling 1": "811958646862381098",
    "Autoscaling 2": "811973218104901653"
}

module.exports = {
    token,
    botActivity,
    referredChannels,
}
