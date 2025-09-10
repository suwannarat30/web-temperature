const protocol = location.protocol === 'https:' ? 'wss://' : 'ws://';
const ws = new WebSocket(protocol + location.host);

ws.onmessage = event => {
  const data = JSON.parse(event.data);
  document.getElementById('temp').textContent = data.temperature + ' °C';
  document.getElementById('hum').textContent = data.humidity + ' %';
};

