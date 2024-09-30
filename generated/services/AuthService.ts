/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class AuthService {
    /**
     * Register a new user
     * @param requestBody
     * @returns any User registered successfully
     * @throws ApiError
     */
    public static postAuthRegister(
        requestBody: {
            name: string;
            email: string;
            password: string;
        },
    ): CancelablePromise<{
        msg?: string;
    }> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/auth/register',
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                400: `Invalid input`,
                500: `Server Error`,
            },
        });
    }
    /**
     * Log in an existing user
     * @param requestBody
     * @returns any Successfully logged in
     * @throws ApiError
     */
    public static postAuthLogin(
        requestBody: {
            email: string;
            password: string;
        },
    ): CancelablePromise<{
        user?: {
            name?: string;
            email?: string;
        };
    }> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/auth/login',
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                401: `Invalid credentials`,
                500: `Server Error`,
            },
        });
    }
    /**
     * Log out a user
     * @returns any Successfully logged out
     * @throws ApiError
     */
    public static deleteAuthLogout(): CancelablePromise<{
        msg?: string;
    }> {
        return __request(OpenAPI, {
            method: 'DELETE',
            url: '/auth/logout',
            errors: {
                500: `Server Error`,
            },
        });
    }
}
