const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    price: {
      type: Number,
      required: true,
      min: 0,
    },
    description: {
      type: String,
      default: "Beautiful handmade accessory made with love 💙",
    },
    image: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      default: "Accessories",
    },
    stock: {
      type: Number,
      default: 10,
    },
    inStock: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Product", productSchema);
