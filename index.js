const config = require('./config.js');
const http = require('http');

if (config.shardManager.shardStatus === true) {
    const { ShardingManager } = require('discord.js');
    const primaryToken = config.TOKENS[0] || process.env.TOKEN;
    const manager = new ShardingManager('./bot.js', { token: primaryToken });

    manager.on('shardCreate', shard => console.log(`Launched shard ${shard.id}`));
    manager.spawn();
} else {
    const tokens = (config.TOKENS && config.TOKENS.length) ? config.TOKENS : [process.env.TOKEN];
    tokens.forEach(token => {
        require("./bot.js")(token);
    });
}

// Webサーバーの設定
const server = http.createServer((req, res) => {
    res.writeHead(200, { 'Content-Type': 'text/plain' });
    res.end('Hello, this is your bot server!\n');
});

// サーバーをポート3000で起動
const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
    console.log(`Web server is running on http://localhost:${PORT}`);
});
