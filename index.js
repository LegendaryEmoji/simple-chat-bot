const { Token, ChannelID } = require("./config.js");
const Discord = require("discord.js");
const Got = require("got");
const Client = new Discord.Client();

//Ready Event
Client.on("ready", async () => {
    console.clear();
    console.log(`Simple Chat Bot - ${Client.user.username} - Ready\nBy Legendary Emoji`);
    await Client.user.setActivity(`Prefix - ${Prefix}`, {
        type: "PLAYING"
    });
});

//Message Event
Client.on("message", async message => {
    if (message.author.bot || message.webhookID || message.channel.type === "dm") return;
    if (ChannelID && ChannelID.toLowerCase() !== "put channel id - only put if you want bot work in 1 channel!") {
        if (ChannelID !== message.channel.id) return;
    };
    try {
        const res = await Got(`https://api.snowflakedev.xyz/chatbot?message=${Discord.Util.escapeMarkdown(message.content)}`); // https://discord.gg/uqB8kxh
        const json = await JSON.parse(res.body);
        return message.channel.send(json.message);
    } catch (error) {
        return message.channel.send(`Something Went Wrong, Try Again Later!`).then(() => console.log(error));
    };
});

//Login
Client.login(Token).catch(() => console.log(`Invalid Token Is Provided Or Other Problems!`));