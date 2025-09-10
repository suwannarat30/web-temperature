const express = require('express');
const { WebSocketServer } = require('ws');
const path = require('path');

const app = express();

// Serve frontend static files
app.use(express.static(path.join(__dirname, '../frontend/public')));

// Start server
const server = app.listen(process.env.PORT || 3001, () => {
  console.log('Server running');
});

// WebSocket server
const wss = new WebSocketServer({ server });

wss.on('connection', (ws) => {
  console.log('Client connected');

  // ส่งข้อมูล temperature + humidity ทุก 2 วินาที (demo)
  const sendData = () => {
    const temperature = (20 + Math.random() * 10).toFixed(2);
    const humidity = (40 + Math.random() * 20).toFixed(2);
    ws.send(JSON.stringify({ temperature, humidity }));
  };

  const interval = setInterval(sendData, 2000);

  ws.on('close', () => clearInterval(interval));
});
