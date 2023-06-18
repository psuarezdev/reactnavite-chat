import io from 'socket.io-client';
import { createContext } from 'react';
import { SERVER_URL } from '../config/config';

export const SocketContext = createContext();

export function SocketProvider({ children }) {
  const socket = io(SERVER_URL);

  return(
    <SocketContext.Provider value={socket}>
      {children}
    </SocketContext.Provider>
  );
};