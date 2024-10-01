import { StatusCodes } from "http-status-codes";
import {
    BadRequestError,
    NotFoundError,
    UnauthenticatedError,
} from "../errors/customErrors.js";

import ApiKey from '../models/apiKey.model.js';
import { v4 as uuidv4 } from 'uuid';


export const generateKey = async (req, res) => {
    const userId = req.user.userId // Assuming you have user authentication
    const apiKey = uuidv4(); // Generate a unique API key

    const newApiKey = new ApiKey({ key: apiKey, userId });

    if(!newApiKey){
        throw new NotFoundError('Error generating Api Key')
    }
    await newApiKey.save();
    res.status(StatusCodes.CREATED).json({ apiKey });


};
