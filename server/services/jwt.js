import jwt from 'jwt-simple';
import moment from 'moment';

export const JWT_SECRET = '6d0e1b94940f152aaa4850d0a633d1b3bb2cf4fc3c2cb30d53636cdfc7a4a453';

export const createToken = (user) => {
  const payload = {
    id: user.id,
    name: user.name,
    surnames: user.surnames,
    nick: user.nick,
    email: user.email,
    image: user.image,
    role: user.role,
    iat: moment().unix(),
    exp: moment().add(30, 'days').unix()
  }; 

  return jwt.encode(payload, JWT_SECRET);
};