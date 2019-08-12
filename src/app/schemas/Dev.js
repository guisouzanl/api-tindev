import mongoose from 'mongoose';

const DevSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    user: {
      type: String,
      required: true,
    },
    bio: {
      type: String,
    },
    avatar: {
      type: String,
      required: true,
    },
    likes: [
      {
        type: mongoose.Types.ObjectId,
        ref: 'Dev',
      },
    ],
    dislikes: [
      {
        type: mongoose.Types.ObjectId,
        ref: 'Dev',
      },
    ],
  },
  {
    timestamps: true,
  }
);

export default mongoose.model('Dev', DevSchema);
