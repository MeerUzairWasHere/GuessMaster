import mongoose from "mongoose";

const guessSchema = new mongoose.Schema({
    gameId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Game',
        required: true
      },
      userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
      },
      guess: {
        type: Number,
        required: true
      },
      result: {
        type: String,
        enum: ['too low', 'too high', 'correct'],
        required: true
      },
      createdAt: {
        type: Date,
        default: Date.now
      }
});

export default mongoose.model("Guess", guessSchema);
