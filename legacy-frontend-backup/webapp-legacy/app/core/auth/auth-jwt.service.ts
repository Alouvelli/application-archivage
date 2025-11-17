import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { LocalStorageService, SessionStorageService } from 'ngx-webstorage';
import { SERVER_API_URL } from 'app/app.constants';

@Injectable({ providedIn: 'root' })
export class AuthServerProvider {
    constructor(
        private http: HttpClient,
        private $localStorage: LocalStorageService,
        private $sessionStorage: SessionStorageService
    ) {}

    login(credentials): Observable<string> {
        const data = {
            username: credentials.username,
            password: credentials.password,
            rememberMe: credentials.rememberMe,
        };

        return this.http.post(`${SERVER_API_URL}api/authenticate`, data, { observe: 'response' }).pipe(
            map(response => {
                // 🔹 Premier cas : token dans les headers
                const bearerToken = response.headers.get('Authorization');
                if (bearerToken && bearerToken.startsWith('Bearer ')) {
                    const jwt = bearerToken.substring(7);
                    this.storeAuthenticationToken(jwt, credentials.rememberMe);
                    return jwt;
                }

                // 🔹 Deuxième cas : token dans le corps de la réponse (standard JHipster)
                if (response.body && (response.body as any).id_token) {
                    const jwt = (response.body as any).id_token;
                    this.storeAuthenticationToken(jwt, credentials.rememberMe);
                    return jwt;
                }

                // 🔹 Si aucun token trouvé
                throw new Error('Aucun token JWT reçu du backend');
            })
        );
    }

    storeAuthenticationToken(jwt: string, rememberMe: boolean): void {
        if (rememberMe) {
            this.$localStorage.store('jhi-authenticationToken', jwt);
        } else {
            this.$sessionStorage.store('jhi-authenticationToken', jwt);
        }
    }

    getToken(): string | null {
        return (
            this.$localStorage.retrieve('jhi-authenticationToken') ||
            this.$sessionStorage.retrieve('jhi-authenticationToken')
        );
    }

    logout(): Observable<void> {
        return new Observable(observer => {
            this.$localStorage.clear('jhi-authenticationToken');
            this.$sessionStorage.clear('jhi-authenticationToken');
            observer.complete();
        });
    }
}
