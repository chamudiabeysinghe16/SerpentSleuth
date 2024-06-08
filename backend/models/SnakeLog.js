const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const SnakeLogSchema = new Schema({
  username: { type: String, required: true },
  imageUrl: { type: String, required: true },
  prediction: { type: String, required: true },
  date: { type: Date, default: Date.now },
});

module.exports = mongoose.model('SnakeLog', SnakeLogSchema);
