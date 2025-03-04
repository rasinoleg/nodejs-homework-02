const mongoose = require("mongoose");

const contactSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  phone: {
    type: Number,
    default: 2000,
  },
  favorite: {
    type: Boolean,
    default: false,
  },
  userid: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
  },
}, {
  versionKey: false,
  timestamps: true,
});

module.exports = mongoose.model("Contact", contactSchema);



