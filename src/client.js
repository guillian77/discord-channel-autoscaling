let Discord = require('discord.js');
let client = new Discord.Client();
let config = require('../config');

// Connect to the current guild
client.login(config.token);

client.on('ready', function () {
    console.log('Client bot is connected and ready to work!')
    client.user.setPresence( {activity: { name: " " + config.botActivity, application: "Discord"}, status: 'online' } )
})

client.on("error", (e) => console.error(e));

module.exports = client
