/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class GuessService {
    /**
     * Submit a guess for the game
     * @param gameId The ID of the game
     * @param requestBody
     * @returns any Guess result
     * @throws ApiError
     */
    public static postGuess(
        gameId: string,
        requestBody: {
            guess: number;
        },
    ): CancelablePromise<{
        result?: string;
    }> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/guess/{gameId}',
            path: {
                'gameId': gameId,
            },
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                401: `Unauthorized`,
                404: `Game not found`,
                500: `Server Error`,
            },
        });
    }
}
