//* CLIENTE CONFIG
const CLIENT_IP = '192.168.1.81';
const CLIENT_PORT = 19000;
const CLIENT_URL = `exp://${CLIENT_IP}:${CLIENT_PORT}`;

//* SERVER CONFIG
const SERVER_IP = '192.168.1.81';
const SERVER_PORT = 3900;
const SERVER_URL = `http://${SERVER_IP}:${SERVER_PORT}`;

//* API CONFIG
const API_IP = '192.168.1.81';
const API_PORT = 4000;
const API_URL = `http://${API_IP}:${API_PORT}/`;

//* DATABASE CONFIG
const HOST = 'localhost';
const USER = 'root';
const PASSWORD = '';
const DB = 'realtime-chat';
const dialect = 'mysql';
const pool = {
  max: 5,
  min: 0,
  acquire: 30000,
  idle: 10000
};

export { CLIENT_IP, CLIENT_PORT, CLIENT_URL, SERVER_IP, SERVER_PORT, SERVER_URL, API_IP, API_URL, API_PORT, HOST, USER, PASSWORD, DB, dialect, pool };