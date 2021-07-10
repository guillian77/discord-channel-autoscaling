const client = require('./src/client');
const voice = require('./src/voice');

// Listen for voice state update
client.on('voiceStateUpdate', (oldVoiceState, newVoiceState) => {
    if ( !voice.isChannelSwitching(oldVoiceState.channel, newVoiceState.channel) ) {
        return;
    }

    voice.channelAutoCreate(newVoiceState);
    voice.channelAutoDelete(oldVoiceState);
    voice.purgeChannel(client, oldVoiceState);
});
