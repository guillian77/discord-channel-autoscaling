/**
 * Get user nickname
 * @param member
 * @returns {string|undefined}
 */
let getNickname = function (member) {
    if (member.nickname != null) {
        return member.nickname
    }
    else {
        return member.user.username
    }
}

module.exports = {
    getNickname
}
