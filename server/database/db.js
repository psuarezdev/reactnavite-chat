import { Sequelize } from 'sequelize';
import { HOST as _HOST, USER, PASSWORD, DB, dialect as _dialect } from '../config/config.js';

const sequelize = new Sequelize(DB, USER, PASSWORD, {
  host: _HOST,
  dialect: _dialect
});

sequelize
  .authenticate()
  .then(() => console.log('Successful connection to database'))
  .catch(err => console.error('Error connecting to database:', err));

export default sequelize;