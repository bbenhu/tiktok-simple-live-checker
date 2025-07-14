import express from 'express';
import { TikTokLiveConnection } from 'tiktok-live-connector';

const app = express();
const PORT = process.env.PORT || 10000;

app.get('/isLive/:username', async (req, res) => {
  const username = req.params.username;
  const connection = new TikTokLiveConnection(username);

  try {
    const state = await connection.connect();

    // Ha ide eljut, akkor élőben van
    await connection.disconnect(); // csak ellenőrzésre használtuk
    res.json({ username, live: true, roomId: state.roomId });
  } catch (err) {
    // Ha nem élőzik vagy unreachable, ide fut
    res.json({ username, live: false, error: err.message });
  }
});

app.get('/', (_, res) => {
  res.send('✅ TikTok Live API működik (v2).');
});

app.listen(PORT, () => {
  console.log(`TikTok Live checker fut a ${PORT} porton`);
});
