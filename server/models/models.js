import { DB, USER, PASSWORD, HOST, dialect as _dialect, pool as _pool } from '../config/config.js';
import { Sequelize, DataTypes } from 'sequelize';

import User from './User.js';
import Message from './Message.js';
import Chat from './Chat.js';

const sequelize = new Sequelize(
  DB,
  USER,
  PASSWORD, 
  {
    host: HOST,
    dialect: _dialect,
    operatorsAliases: false,
    pool: {
      max: _pool.max,
      min: _pool.min,
      acquire: _pool.acquire,
      idle: _pool.idle
    }
  }
);

sequelize.authenticate()
  .then(() => {
    console.log('Conexión exitosa a la base de datos');
  })
  .catch(err => console.log(`Error: ${err}`));

const db = {};

db.Sequelize = Sequelize; 
db.sequelize = sequelize;

db.User = User(sequelize, DataTypes);
db.Message = Message(sequelize, DataTypes);
db.Chat = Chat(sequelize, DataTypes);

db.sequelize.sync({ force: false })
  .then(() => console.log('Sync completed'))
  .catch(error => console.log(`Error ${error}`));

export default db;