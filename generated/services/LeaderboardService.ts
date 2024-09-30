/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class LeaderboardService {
    /**
     * Get the easy leaderboard
     * @returns any Successfully fetched leaderboard
     * @throws ApiError
     */
    public static getLeaderboardEasy(): CancelablePromise<Array<{
        name?: string;
        easyAttempt?: number;
    }>> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/leaderboard/easy',
            errors: {
                500: `Server Error`,
            },
        });
    }
    /**
     * Get the medium leaderboard
     * @returns any Successfully fetched leaderboard
     * @throws ApiError
     */
    public static getLeaderboardMedium(): CancelablePromise<Array<{
        name?: string;
        mediumAttempt?: number;
    }>> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/leaderboard/medium',
            errors: {
                500: `Server Error`,
            },
        });
    }
    /**
     * Get the hard leaderboard
     * @returns any Successfully fetched leaderboard
     * @throws ApiError
     */
    public static getLeaderboardHard(): CancelablePromise<Array<{
        name?: string;
        hardAttempt?: number;
    }>> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/leaderboard/hard',
            errors: {
                500: `Server Error`,
            },
        });
    }
}
