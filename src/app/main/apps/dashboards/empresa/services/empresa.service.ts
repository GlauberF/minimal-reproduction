/*
 * @author Glauber Funez
 * @package Vimbo
 * Vimbo Tecnologia Ltda ME
 * Copyright (c) 2019.
 */

import { Injectable } from '@angular/core';
import {
    ActivatedRouteSnapshot,
    Resolve,
    RouterStateSnapshot
} from '@angular/router';
import { Observable } from 'rxjs';
import { LazyServiceModuleDashboardEmpresa } from './lazy-service.module';

@Injectable({
    providedIn: LazyServiceModuleDashboardEmpresa
})
export class ProjectDashboardService implements Resolve<any> {
    /**
     * Constructor
     *
     */
    constructor() {}

    /**
     * Resolver
     *
     * @param {ActivatedRouteSnapshot} route
     * @param {RouterStateSnapshot} state
     * @returns {Observable<any> | Promise<any> | any}
     */
    resolve(
        route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot
    ): Observable<any> | Promise<any> | any {
        return new Promise((resolve, reject) => {
            Promise.all([]).then(() => {
                resolve();
            }, reject);
        });
    }

    /**
     * Get Random Sentence
     */
    getRandomSentence(): string {
        const _sentences: string[] = [
            'Tenha excelentes negócios hoje.',
            'Mais um dia incrível para os seus negócios!'
        ];

        const index = Math.floor(Math.random() * _sentences.length);
        return _sentences[index];
    }
}
