const express = require('express');
const { WebcastPushConnection } = require('tiktok-live-connector');
const app = express();
const PORT = process.env.PORT || 10000;

app.get('/isLive/:username', async (req, res) => {
    const username = req.params.username;
    const connection = new WebcastPushConnection(username);
    try {
        await connection.connect();
        await connection.disconnect();
        res.json({ username, live: true });
    } catch (e) {
        res.json({ username, live: false });
    }
});

app.get('/', (req, res) => {
  res.send('OK működik');
});

app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
});
