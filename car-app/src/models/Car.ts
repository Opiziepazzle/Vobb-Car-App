import mongoose from 'mongoose';

const carSchema = new mongoose.Schema(
  {
    brand: { type: String, required: true },
    model: { type: String, required: true },
    price: { type: Number, required: true },
    availability: { type: Boolean, default: true },
    category: { type: mongoose.Schema.Types.ObjectId, ref: 'Category' },
  },
  { timestamps: true }
);

export default mongoose.model('Car', carSchema);
