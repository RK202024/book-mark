const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const clubSchema = new Schema({
  name: { type: String, required: true },
  owner: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  members: [{ type: Schema.Types.ObjectId, ref: 'User' }],
  books: [{ type: Schema.Types.ObjectId, ref: 'Book' }]
}, {
  timestamps: true,
});

module.exports = mongoose.model('Club', clubSchema);