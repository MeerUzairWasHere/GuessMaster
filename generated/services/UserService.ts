/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class UserService {
    /**
     * Get the current logged-in user's profile
     * @returns any Successfully fetched user profile
     * @throws ApiError
     */
    public static getUsersCurrentUser(): CancelablePromise<{
        user?: {
            name?: string;
            email?: string;
            easyAttempt?: number;
            mediumAttempt?: number;
            hardAttempt?: number;
        };
    }> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/users/current-user',
            errors: {
                500: `Server Error`,
            },
        });
    }
}
