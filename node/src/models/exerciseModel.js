import mongoose from 'mongoose';

const { Schema } = mongoose;

// Define the Exercise Schema
const exerciseSchema = new Schema(
  {
    user: {
      type: Schema.Types.ObjectId,  // Reference to the User model
      ref: 'User',
      required: true,
      // Ensure this field is not unique
    },
    exercises: [
      {
        name: { 
          type: String, 
          required: true,
        },
        description: { 
          type: String, 
          required: true,
        },
      },
    ],
    injuryType: {
      type: String,
      required: true,
    },
    injuryDuration: {
      type: String,
      required: true,
    },
    injurySeverity: {
      type: String,
      required: true,
    },
    additionalDetails: {
      type: String,
      required: false,
    },
  },
  {
    timestamps: true, // Automatically adds createdAt and updatedAt fields
  }
);

// Create the Exercise model
const Exercise = mongoose.model('Exercise', exerciseSchema);

export default Exercise;
