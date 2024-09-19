const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const clubSchema = new Schema({
  name: { type: String, required: true },
  description: { type: String },
  owner: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  members: [{ type: Schema.Types.ObjectId, ref: 'User' }],
  readingList: [{ type: Schema.Types.ObjectId, ref: 'Book' }],  
}, {
  timestamps: true,
});

module.exports = mongoose.model('Club', clubSchema);
