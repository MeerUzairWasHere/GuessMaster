// models/ApiKey.js
import mongoose from 'mongoose';

const ApiKeySchema = new mongoose.Schema({
    key: { type: String, required: true, unique: true },
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    createdAt: { type: Date, default: Date.now, expires: '30d' }, // Optional: auto-expire after 30 days
});

export default mongoose.model('ApiKey', ApiKeySchema);
