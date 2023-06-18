const SERVER_IP = '192.168.1.81';
const SERVER_PORT = 3900;

const API_PORT = 4000;

const API_URL = `http://${SERVER_IP}:${API_PORT}/api/v1/`;
const SERVER_URL = `http://${SERVER_IP}:${SERVER_PORT}`;

const USER_STORAGE_KEY = '@RealTimeChatApp:user';

export { API_PORT, API_URL, SERVER_IP, SERVER_PORT, SERVER_URL, USER_STORAGE_KEY };