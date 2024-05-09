import React, { createContext, useContext, useEffect, useState } from 'react';
import * as Y from 'yjs';

const WebSocketContext = createContext<WebSocket | null>(null);

export function useWebSocket(): WebSocket | null {
  return useContext(WebSocketContext);
}

export function SocketProvider({ children }: { children: React.ReactNode }) {
  const [socket, setSocket] = useState<WebSocket | null>(null);

  useEffect(() => {
    const chatWebSocket = new WebSocket(import.meta.env.VITE_DEV_SOKET_SERVER);
    setSocket(chatWebSocket);
  }, []);

  return <WebSocketContext.Provider value={socket}>{children}</WebSocketContext.Provider>;
}

// const WebSocketContext = createContext<Client | null>(null);

// export function useWebSocket(): Client | null {
//   return useContext(WebSocketContext);
// }

// export function SocketProvider({ children }: { children: React.ReactNode }) {
//   const [stompClient, setStompClient] = useState<Client | null>(null);

//   useEffect(() => {
//     const client = new Client({
//       brokerURL: 'ws://192.168.31.153:8080/ws-chat',
//       onConnect: frame => {
//         client.subscribe('/topic/greetings', message => console.log(`Received: ${message.body}`));
//         client.publish({ destination: '/app/hello', body: 'First Message' });
//       },
//     });

//     setStompClient(client);
//     client.activate();
//   }, []);

//   return <WebSocketContext.Provider value={stompClient}>{children}</WebSocketContext.Provider>;
// }
