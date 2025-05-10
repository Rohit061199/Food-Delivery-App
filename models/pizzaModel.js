const mongoose = require("mongoose");

const pizzaSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    varients: { type: [String], required: true },  // Array of variants like 'small', 'medium', 'large'
    prices: [
      {
        small: { type: Number, required: true },
        medium: { type: Number, required: true },
        large: { type: Number, required: true },
      },
    ],
    category: { type: String, required: true },
    image: { type: String, required: true },  // Image URL for the pizza
    description: { type: String, required: true },  // Description of the pizza
  },
  { timestamps: true } // Automatically add createdAt and updatedAt fields
);

// Creating the Pizza model from the schema
const Pizza = mongoose.model("Pizza", pizzaSchema);

module.exports = Pizza;