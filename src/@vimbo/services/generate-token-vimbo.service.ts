import { Injectable } from '@angular/core';
import { MD5 } from 'crypto-js';

@Injectable({
    providedIn: 'root'
})
export class GenerateTokenVimboService {
    private random: any;
    private timestamp: any;
    private csrfToken: any;

    constructor() {}

    /**
     * Generate random number
     * @param min
     * @param max
     * @private
     */
    private static _getRandomInt(min, max): number {
        if (typeof window === 'undefined') {
            return;
        }
        return Math.floor(Math.random() * max) + min;
    }

    /**
     * Generate Token
     */
    generate(): string {
        if (typeof window === 'undefined') {
            return '';
        }

        this.random = GenerateTokenVimboService._getRandomInt(101, 898);
        this.timestamp = Math.floor(new Date().getTime() / 1000);
        this.csrfToken =
            this.random +
            MD5(String(this.random * this.timestamp)).toString() +
            this.timestamp;

        return this.csrfToken.toUpperCase();
    }

    /**
     * Token Is Valid
     */
    tokenVimboIsValid(value: string, token: string): boolean {
        if (!value || !token) {
            return;
        }

        // Extract from token
        const random = token.substr(0, 3);
        const hash = token.substr(3, 32);
        const timestamp = token.substr(35, 10);
        // mounts date comparison
        const today = new Date();
        const todayWithTimestamp = new Date(Number(timestamp) * 1000);
        // it's the same day and year
        if (
            today.getDay() === todayWithTimestamp.getDay() &&
            today.getFullYear() === todayWithTimestamp.getFullYear()
        ) {
            // hash extracted from token equals reassembled with random and timestamp
            return (
                hash ===
                MD5(String(Number(random) * Number(timestamp)))
                    .toString()
                    .toUpperCase()
            );
        } else {
            return false;
        }
    }
}
