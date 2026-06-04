import { Service, signal } from '@angular/core';

@Service()
export class AuthService {
    readonly #isAuthenticated = signal(true);
    readonly isAuthenticated = this.#isAuthenticated.asReadonly();

    login() {
        this.#isAuthenticated.set(true);
    }

    logout() {
        this.#isAuthenticated.set(false);
    }
}
