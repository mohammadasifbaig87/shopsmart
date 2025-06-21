import mongoose from "mongoose";

const addressSchema = new mongoose.Schema({
  userId: { type: String, required: true, ref: "User" },
  street: { type: String, required: true },
  city: { type: String, required: true },
  state: { type: String, required: true },
  country: { type: String, required: true },
  pincode: { type: String },
}, { timestamps: true });

const Address = mongoose.models.Address || mongoose.model("Address", addressSchema);
export default Address;
