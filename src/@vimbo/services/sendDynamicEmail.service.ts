import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '@env/environment';

@Injectable({
    providedIn: 'root'
})
export class SendDynamicEmailService {
    constructor(private _httpClient: HttpClient) {}

    /**
     *
     * @param nomeRemetente
     * @param emailRemetente
     * @param nomeDestinatario
     * @param emailDestinario
     * @param assunto
     * @param mensagem
     */
    sendEmail(
        nomeRemetente: string,
        emailRemetente: string,
        nomeDestinatario: string,
        emailDestinario: string,
        assunto: string,
        mensagem: string
    ): Promise<any> {
        return new Promise((resolve, reject) => {
            this._httpClient
                .post(environment.CoreAPIV1 + 'emails/enviar', {
                    'nome-remetente': nomeRemetente,
                    'email-remetente': emailRemetente,
                    'nome-destinatario': nomeDestinatario,
                    'email-destinatario': emailDestinario,
                    'assunto': assunto,
                    'mensagem': mensagem
                })
                .subscribe((val: any) => {
                    resolve(val);
                }, reject);
        });
    }
}
