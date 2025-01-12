import mongoose from 'mongoose';

const progressSchema = new mongoose.Schema({
  userEmail: { type: String, required: true },
  exerciseType: { type: String, required: true },
  totalReps: { type: Number, default: 0 },
  totalTime: { type: Number, default: 0 },
  date: { type: Date, default: Date.now },
});

export default mongoose.model('Progress', progressSchema);
