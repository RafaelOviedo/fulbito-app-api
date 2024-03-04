const mongoose = require('mongoose');
const { Schema } = mongoose;

const matchSchema = new Schema({
  location: { type: String, required: true, minLength: 3 },
  date: { type: Date, required: true, minLength: 3 },
  alias: { type: String, required: true, minLength: 3 },
  players: [
    { 
      // id: { type: Schema.Types.ObjectId, default: new mongoose.Types.ObjectId, required: true },
      name: { type: String, required: true },
      payment: { type: Boolean },
      voucher: { type: Buffer }
    }
  ],
})

const Matches = mongoose.model('Match', matchSchema);

module.exports = Matches;