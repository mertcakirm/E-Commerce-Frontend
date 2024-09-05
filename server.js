const WebSocket = require('ws');

const server = new WebSocket.Server({ port: 8080 });

server.on('connection', (ws) => {
  console.log('Client connected');

  // Mesaj aldığında cevap ver
  ws.on('message', (message) => {
    console.log(`Received: ${message}`);
    ws.send(`Server: ${message}`);
  });

  // Bağlantı kapandığında log yaz
  ws.on('close', () => {
    console.log('Client disconnected');
  });
});

console.log('WebSocket server is listening on ws://localhost:8080');
