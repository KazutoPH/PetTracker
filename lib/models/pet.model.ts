import mongoose from "mongoose";

const petSchema = new mongoose.Schema(
  {
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    name: { type: String, required: true },
    breed: { type: String, required: true },
    gender: { type: String, required: true },
    date_of_birth: { type: Date, required: true },
    image: String,
    qr: String,
  },
  { timestamps: true }
);

const Pet = mongoose.models.Pet || mongoose.model("Pet", petSchema);

export default Pet;
