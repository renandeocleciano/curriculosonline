import mongoose from "mongoose";
const Schema = mongoose.Schema;

var schema = new Schema(
  {
    name: { type: String, required: true },
    filepath: { type: String, required: true },
    isPremium: { type: Boolean, default: false },
    downloads: { type: Number },
    created_at: { type: Date, default: Date.now },
  },
  {
    toJSON: { getters: true },
  }
);

module.exports = mongoose.model("Templates", schema, "Templates");
