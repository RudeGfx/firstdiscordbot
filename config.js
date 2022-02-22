require('dotenv').config();

module.exports = {
    Id: process.env.Discord_ClientID,
    prefix: process.env.PREFIX || '!',
    Admins: ["UserID", "UserID"],
    buildToken: process.env.BUILD_TOKEN || 'build token',
    Token: process.env.TOKEN || 'bot token',

    presence: {
        status: "online", // online, idle, and dnd(invisible too but it make people think the bot is offline)
        activities: [
            {
              name: "Server", //Status Text
              type: "WATCHING", // PLAYING, WATCHING, LISTENING, STREAMING
            },
        ],
    },

    mongooseURL: process.env.MONGOOSE_URL || "",
};
