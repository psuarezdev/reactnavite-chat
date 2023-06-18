import jwt from 'jwt-simple';
import moment from 'moment';

import { JWT_SECRET } from '../services/jwt.js';

const auth = (req, res, next) => {
  const { authorization } = req.headers;

  if(!authorization) {
    return res.status(403).json({
      status: 'error',
      message: 'Missing authorization'
    });
  }
  
  const token = req.headers.authorization.replace(/['"]+/g, '');

  try {
    const payload = jwt.decode(token, JWT_SECRET);
    
    if(payload.exp <= moment().unix()) throw new Error('Invalid token');

    req.user = payload;
    next();
  } catch (error) {
    return res.status(401).json({
      status: 'error',
      message: 'Invalid token'
    });
  }
};

export default auth;