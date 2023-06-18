import models from '../models/models.js';
import bcrypt from 'bcrypt';
import fs from 'fs';
import { createToken } from '../services/jwt.js'

const User = models.User;

const all = async(req, res) => {
  try {
    const users = await User.findAll({
      attributes: { exclude: ['password'] }
    });

    if(!users) throw new Error('Failed to obtain users');

    return res.status(200).json({
      status: 'success',
      message: 'Successful obtained users',
      users    
    });
  } catch (error) {
    return res.status(500).json({
      status: 'error',
      message: error.message
    });
  }
};

const one = async(req, res) => {
  try {
    const { id } = req.params

    if(!id) throw new Error('Missing parameters');

    const user = await User.findByPk(id, {
      attributes: { exclude: ['password'] }
    });

    if(!user) throw new Error('Failed to obtain user');

    return res.status(200).json({
      status: 'success',
      message: 'Successful obtained user',
      user   
    });
  } catch (error) {
    return res.status(500).json({
      status: 'error',
      message: error.message
    });
  }
};

const login = async(req, res) => {
  try {
    const { email, password } = req.body;

    if(!email || !password) throw new Error('Missing parameters');

    const user = await User.findOne({ 
      where: { email: email.toLowerCase() } 
    });

    if(!user) throw new Error('Email not registered');

    const password_verify = bcrypt.compareSync(password, user.password);

    if(!password_verify) throw new Error('Incorrect password');

    const user_logged = user.toJSON();
    delete user_logged.password;

    const token = createToken(user_logged);

    return res.status(200).json({
      status: 'success',
      message: 'Login successful',
      user: user_logged,
      token
    });
  } catch (error) {
    return res.status(500).json({
      status: 'error',
      message: error.message
    });
  }
};

const register = async(req, res) => {
  try {
    const { name, surnames, nick, email, password } = req.body;

    if(!name || !surnames || !nick || !email || !password) throw new Error('Missing parameters');

    const user_exists = await User.findOne({ 
      where: { email: email.toLowerCase() } 
    });

    if(user_exists) throw new Error('Email already registered');

    const secure_password = await bcrypt.hash(password, 10);

    if(!secure_password) throw new Error('Error hashing password');

    const { dataValues } = new User({
      name, surnames, nick, email: email.toLowerCase(), password: secure_password
    });

    const user_created = await User.create(dataValues);

    if(!user_created) throw new Error('Error creating user');

    const user_registered = user_created.toJSON();
    delete user_registered.password;

    const token = createToken(user_registered);

    return res.status(200).json({
      status: 'success',
      message: 'User created succesfully',
      user: user_registered,
      token
    });
  } catch (error) {
    return res.status(500).json({
      status: 'error',
      message: error.message
    });
  }
};

const update = async(req, res) => {
  try {
    const { id } = req.params;

    if(!id) throw new Error('Missing parameters');

    const { name, surnames, nick, bio, email } = req.body;

    if(!name || !surnames || !nick || !email) throw new Error('Missing parameters');

    const user_exists = await User.findOne({ 
      where: { email: email.toLowerCase() } 
    });

    if(user_exists && user_exists.dataValues.id != id) throw new Error('Email already registered');

    const user_to_update = {
      name, 
      surnames, 
      nick, 
      bio: null,
      email: email.toLowerCase()
    };

    if(bio) user_to_update.bio = bio;

    const user_updated = await User.update(user_to_update, { where: { id } });

    if(!user_updated) throw new Error('Error updating user');

    const user_to_return = await User.findByPk(id, {
      attributes: { exclude: ['password'] }
    });

    if(!user_to_return) throw new Error('Error getting the updated user data');

    const token = createToken(user_to_return);

    if(!token) throw new Error('Error getting the updated user token');

    return res.status(200).json({
      status: 'success',
      message: 'User updated succesfully',
      user: user_to_return,
      token
    });
  } catch (error) {
    return res.status(500).json({
      status: 'error',
      message: error.message
    });
  }
};

export default {
  all,
  one,
  login,
  register,
  update
}
