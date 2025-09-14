import mongoose, { Schema, models } from "mongoose";

const ExtraPriceSchema = new Schema({
  name: String,
  price: Number,
});

const menuItemSchema = new Schema(
  {
    image: { type: String },
    name: { type: String, required: true },
    description: { type: String },
    basePrice: { type: Number },
    category: { type: Schema.Types.ObjectId, ref: "Category" },
    sizes: { type: [ExtraPriceSchema] },
    extraIngredientPrices: { type: [ExtraPriceSchema] },
  },
  { timestamps: true }
);

const MenuItem = models.MenuItem || mongoose.model("MenuItem", menuItemSchema);

export default MenuItem;
