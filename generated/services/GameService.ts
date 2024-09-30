/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class GameService {
    /**
     * Create a new game
     * @param requestBody
     * @returns any Game created successfully
     * @throws ApiError
     */
    public static postGames(
        requestBody: {
            difficulty: 'easy' | 'medium' | 'hard';
        },
    ): CancelablePromise<{
        _id?: string;
        userId?: string;
        difficulty?: string;
        attempts?: number;
        createdAt?: string;
    }> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/games',
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                500: `Server Error`,
            },
        });
    }
    /**
     * Get all games of the current user
     * @returns any Successfully fetched games
     * @throws ApiError
     */
    public static getGames(): CancelablePromise<{
        games?: Array<{
            _id?: string;
            userId?: string;
            difficulty?: string;
            attempts?: number;
            createdAt?: string;
        }>;
    }> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/games',
            errors: {
                500: `Server Error`,
            },
        });
    }
    /**
     * Delete a game by its ID
     * @param id The ID of the game
     * @returns any Game deleted successfully
     * @throws ApiError
     */
    public static deleteGames(
        id: string,
    ): CancelablePromise<{
        msg?: string;
    }> {
        return __request(OpenAPI, {
            method: 'DELETE',
            url: '/games/{id}',
            path: {
                'id': id,
            },
            errors: {
                400: `Game not found`,
                500: `Server Error`,
            },
        });
    }
}
