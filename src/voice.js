const config = require('../config');
const member = require('./member');

let generatedChannels = []; // Auto generated channels list

let channelAutoCreate = function (newState) { // Voice listener
    if(isUserDisconnecting(newState.channel)) {
        return;
    }

    for( let channelName in config.referredChannels )
    {
        // IF : target channel is in reference channels list
        if (newState.channel.id === config.referredChannels[channelName]) {
            
            // Define future clone properties
            let channelOptions = {
                name: "[AC] Canal de " + member.getNickname(newState.member)
            };

            // Clone reference canal to a new one
            newState.channel.clone(channelOptions).then((targetChannel) => {
                newState.member.voice.setChannel(targetChannel).then(() => {
                    generatedChannels.push(targetChannel.id); // Save this channel
                });
            });
        }
    }    
}

/**
 * Auto deleting empty channels.
 */
let channelAutoDelete = function (oldState) {
    if (!isFirstConnexion(oldState)) {
        // Check it's a auto generated channel
        let isAutoCreatedChannel = generatedChannels.includes(oldState.channel.id);

        if (isAutoCreatedChannel) {
            if (oldState.channel.members.first() === undefined) { // If last user in channel
                oldState.channel.delete('Bot - channel auto deletion') // Delete the canal

                generatedChannels.forEach((generatedChannel, index) => { // Clean channel list
                    if(generatedChannel == oldState.channel.id) {
                        generatedChannels.splice(index, 1);
                    }
                });
            }
        }
    }
}

/**
 * Purges old auto created channels.
 * 
 * @param {Object} client Discord client connect.
 */
let purgeChannel = function (client, oldState)
{
    if(isFirstConnexion(oldState)) {
        return false;
    }

    let channels = client.channels.cache;

    channels.forEach(channel => {
        if(channel.name.startsWith("[AC]") && channel.members.first() == undefined) {
            channel.delete('Bot - channel auto deletion') // Delete the canal
            console.log('CHANNEL PURGE: ' + channel.name)
        }
    });
}

/**
 * Is user first logging to a voice channel ?
 * 
 * @returns {boolean}
 */
let isFirstConnexion = function (oldState) {
    if (oldState.channel === undefined || oldState.channel === null)
    {
        return true
    }
    return false
}

/**
 * Is user disconnecting from vocal ?
 * 
 * @returns {boolean}
 */
let isUserDisconnecting = function (newChannel) {
    if (newChannel === undefined || newChannel === null)
    {
        return true
    }
    return false
}

/**
 * Is user switching to an other voice channel ?
 *
 * @returns {boolean}
 */
let isChannelSwitching = function (oldChannel, newChannel) {

    if ( oldChannel != newChannel || oldChannel === undefined )
    {
        return true
    }

    return false
}

module.exports = {
    channelAutoCreate,
    channelAutoDelete,
    isFirstConnexion,
    isUserDisconnecting,
    isChannelSwitching,
    purgeChannel
}
