import mongoose from "mongoose";

const productSchema = mongoose.Schema(
  {
    name: { type: String, required: true, trim: true, index: true },
    description: { type: String, trim: true },
    price: { type: Number, required: true },
    category: { type: String, required: true, trim: true },
    subCategory: { type: String, required: true, trim: true },
    images: [{ type: String }],
    stock: { type: Number, default: 0 },
    rating: { type: Number, default: 0 },
    reviews: { type: Number, default: 0 },
    sizes: { type: [String], default: [] },
    status: {
      type: String,
      enum: ["Active", "Draft"],
      default: "Draft",
    },
  },
  {
    timestamps: true,
  },
);

export default mongoose.model("Product", productSchema);
