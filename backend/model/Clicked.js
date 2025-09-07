const mongoose = require("mongoose");

const clickSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "account" },
  roomId: { type: mongoose.Schema.Types.ObjectId, ref: "post" },
  count: { type: Number, default: 0 }
});

module.exports = mongoose.model("Click", clickSchema);
