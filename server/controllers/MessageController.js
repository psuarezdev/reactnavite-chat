import models from '../models/models.js';

const Message = models.Message;

const create = async(req, res) => {
  try {
    const { chat_id, transmitter, content } = req.body;
  
    if(!chat_id || !transmitter || !content) throw new Error('Missing parameters');

    const message_created = await Message.create({ chat_id, transmitter, content });

    if(!message_created) throw new Error('Error sending message');

    return res.status(200).json({
      status: 'success',
      message: 'Message created successfully',
      message_created
    });
  } catch (error) {
    return res.status(500).json({
      status: 'error',
      message: error.message
    });
  }
};

export default {
  create
}