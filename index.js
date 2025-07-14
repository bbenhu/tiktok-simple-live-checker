import express from 'express';
import { TikTokLiveConnection } from 'tiktok-live-connector';

const app = express();
const PORT = process.env.PORT || 10000;

app.get('/isLive/:username', (req, res) => {
    const username = req.params.username;
    const connection = new TikTokLiveConnection(username);
    console.log(connection.fetchIsLive());
    res.json({ username, live: connection.fetchIsLive() });
    
    /*connection.connect().then(state => {
        console.log(`✅ ${username} élőben van! RoomID: ${state.roomId}`);
        connection.disconnect(); // lezárjuk a kapcsolatot
        res.json({ username, live: true, state: state });
    }).catch(err => {
        console.warn(`❌ ${username} nem élőzik vagy nem elérhető: ${err.message}`);
        res.json({ username, live: false, error: err.message });
    });*/
});

app.get('/', (req, res) => {
    res.send('✅ TikTok Live API működik (helyesen).');
});

app.listen(PORT, () => {
    console.log(`🚀 Szerver fut: http://localhost:${PORT}`);
});
