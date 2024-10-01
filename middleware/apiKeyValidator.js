// middleware/apiKeyValidator.js
import ApiKey from '../models/apiKey.model.js';

const apiKeyValidator = async (req, res, next) => {
    const apiKey = req.headers['x-api-key']; // Expecting API key in headers

    if (!apiKey) {
        return res.status(403).json({ message: 'API key is required' });
    }

    const validApiKey = await ApiKey.findOne({ key: apiKey });

    if (!validApiKey) {
        return res.status(403).json({ message: 'Invalid API key' });
    }

    req.userId = validApiKey.userId; // Optional: attach userId to request
    next();
};

export default apiKeyValidator;
