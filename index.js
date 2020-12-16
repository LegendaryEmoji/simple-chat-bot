const { Token, ChannelID, SnowflakeApiToken } = require("./config.js");
const Discord = require("discord.js");
const Fetch = require("node-fetch");
const Client = new Discord.Client();

//Ready Event
Client.on("ready", async () => {
    console.clear();
    console.log(`Simple Chat Bot - ${Client.user.username} - Ready\nBy Legendary Emoji`);
    await Client.user.setActivity(`Chatting With Members :D`, {
        type: "PLAYING"
    });
});

//Message Event
Client.on("message", async message => {
    if (message.author.bot || !message.guild || message.webhookID || !SnowflakeApiToken) return;
    if (ChannelID && ChannelID.toLowerCase() !== "put channel id - only put if you want bot work in 1 channel!") {
        if (ChannelID !== message.channel.id) return;
    };

    if (message.content) {
        try {
            const res = await Fetch(`http://api.snowflakedev.cf:9019/api/chatbot?message=${encodeURIComponent(message.content)}`, {
                headers: {
                    "Authorization": SnowflakeApiToken
                }
            }); // https://discord.gg/uqB8kxh
            const json = await res.json(); 
            return message.channel.send(json.message);
        } catch (error) {
            return message.channel.send("Something Went Wrong, Try Again Later!").then(() => console.log(error));
        };
    };
});

//Login
Client.login(Token).catch(() => console.log(`Invalid Token Is Provided Or Other Problems!`));
