import React, { createContext, useContext, useEffect, useState } from 'react';
import * as Y from 'yjs';
import { WebsocketProvider } from 'y-websocket';
import { Client } from '@stomp/stompjs';

// const WebSocketContext = createContext<WebsocketProvider | undefined>(undefined);
// export function useWebSocket(): WebsocketProvider | undefined {
//   return useContext(WebSocketContext);
// }

const WebSocketContext = createContext<Client | undefined>(undefined);
export function useWebSocket(): Client | undefined {
  return useContext(WebSocketContext);
}

export default function SocketProvider({ children }: { children: React.ReactNode }) {
  // const [stompClient, setStompClient] = useState<WebsocketProvider | undefined>(undefined);
  // useEffect(() => {
  //   const doc = new Y.Doc();
  //   const wsProvider = new WebsocketProvider('wss://share-p.com/api/gs-guide-websocket', '', doc);

  //   wsProvider.on('status', (event: any) => {
  //     console.log(event.status); // logs "connected" or "disconnected"
  //   });
  // }, []);

  const [stompClient, setStompClient] = useState<Client | undefined>(undefined);
  const client = new Client({
    brokerURL: 'wss://share-p.com/api/gs-guide-websocket',
    onConnect: frame => {
      console.log(`test :`, frame.body);
      client.subscribe('/topic/greetings', message => console.log(`Received: ${message.body}`));
      client.publish({ destination: '/app/hello', body: 'First Message' });
    },
  });
  client.activate();

  return <WebSocketContext.Provider value={stompClient}>{children}</WebSocketContext.Provider>;
}
