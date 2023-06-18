import { Op } from 'sequelize';
import models from '../models/models.js';

const Chat = models.Chat;
const Message = models.Message;

const all = async(req, res) => {
  try {
    const { id: userId } = req.user;

    if(!userId) throw new Error('Missing parameters');

    const chats = await Chat.findAll({ 
      where: {
        [Op.or]: [
          { transmitter: userId },
          { receiver: userId }
        ]
      },
      order: [['createdAt', 'DESC']] 
    });

    if(!chats) throw new Error('Failed to obtain chats');

    return res.status(200).json({
      status: 'success',
      message: 'Successful obtained chats',
      chats    
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
    const { chatId } = req.params;

    if(!chatId) throw new Error('Missing parameters');

    const chat = await Chat.findByPk(chatId);

    if(!chat) throw new Error('Failed to obtain chat');

    return res.status(200).json({
      status: 'success',
      message: 'Successful obtained chat',
      chat    
    });
  } catch (error) {
    return res.status(500).json({
      status: 'error',
      message: error.message
    });
  }
};

const create = async(req, res) => {
  try {
    const { transmitter, receiver, transmitter_name, receiver_name } = req.body;

    if(!transmitter || !receiver || !transmitter_name || ! receiver_name) throw new Error('Missing parameters');

    const chat_exists = await Chat.findOne({
      where: {
        [Op.and]: [
          { transmitter },
          { receiver }
        ]
      }
    });
  
    if(chat_exists) {
      return res.status(500).json({
        status: 'error',
        message: 'Chat already exists',
        chat: chat_exists
      });
    } 

    const chat_created = Chat.create({ transmitter, receiver, transmitter_name, receiver_name });

    if(!chat_created) throw new Error('Failed creating chat');

    return res.status(200).json({
      status: 'success',
      message: 'Chat created succesfully',
      chat: chat_created
    });
  } catch (error) {
    return res.status(500).json({
      status: 'error',
      message: error.message
    });
  }
};

const remove = async(req, res) => {
  try {
    const { id, transmitter } = req.body;

    if(!id) throw new Error('Missing parameters');

    const chat_deleted = await Chat.destroy({
      where: { id, transmitter }
    });

    if(!chat_deleted) throw new Error('Error deleting chat');

    return res.status(200).json({
      status: 'success',
      message: 'Chat deleted succesfully'
    });
  } catch (error) {
    return res.status(500).json({
      status: 'error',
      message: error.message
    });
  }
};

const messages = async(req, res) => {
  try {
    const { chatId } = req.params;

    if(!chatId) throw new Error('Missing parameters');

    const messages = await Message.findAll({ 
      where: { chat_id: chatId },
      order: [['createdAt', 'DESC']]
    });

    if(!messages) throw new Error('Error obtaining message');

    return res.status(200).json({
      status: 'success',
      messages
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
  create,
  remove,
  messages
}