import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
    providedIn: 'root'
})
export class VimboHelperJwtService {
    jwtHelper: JwtHelperService;

    constructor() {
        this.jwtHelper = new JwtHelperService();
    }

    /**
     * Get payload of token
     * @param token
     */
    decodedToken(token: string): any {
        if (!token) {
            return;
        }
        return this.jwtHelper.decodeToken(token);
    }

    /**
     * Get expiration date of token
     * @param token
     */
    expirationDate(token: string): any {
        if (!token) {
            return;
        }
        return this.jwtHelper.getTokenExpirationDate(token);
    }

    /**
     * Check is token is expired
     * @param token
     */
    isExpired(token: string): any {
        if (!token) {
            return;
        }
        return this.jwtHelper.isTokenExpired(token);
    }
}
