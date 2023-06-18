import { useContext } from 'react';
import { SocketContext } from '../context/SocketContext';

const useSocket = () => useContext(SocketContext);

export default useSocket;