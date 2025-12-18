import { Server } from 'ws';

let wss: Server;
export const initWebSocket = (server: any) => {
  wss = new Server({ server });
  wss.on('connection', ws => {
    ws.send('WebSocket bağlantısı kuruldu.');
  });
};

export const broadcastNotification = (message: string) => {
  if (wss) {
    wss.clients.forEach(client => {
      if (client.readyState === 1) {
        client.send(message);
      }
    });
  }
};
