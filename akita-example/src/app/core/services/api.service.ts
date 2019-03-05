import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError } from 'rxjs/operators';
import { EMPTY } from 'rxjs';

import { AppQuery, AppService } from 'src/app/state';
import { Router } from '@angular/router';

@Injectable()
export class ApiService {
  private readonly baseRoute = '/api';

  constructor(
    private http: HttpClient,
    private appQuery: AppQuery,
    private router: Router,
    private appService: AppService
  ) {}

  getProducts() {
    const url = this.getRoute('products');
    return this.http
      .get(url, {
        headers: {
          Authorization: this.getBearerToken()
        }
      })
      .pipe(catchError(this.handleUnauthorized.bind(this)));
  }

  getProduct(id: number) {
    const url = `${this.getRoute('products')}/${id}`;
    return this.http
      .get(url, {
        headers: {
          Authorization: this.getBearerToken()
        }
      })
      .pipe(catchError(this.handleUnauthorized.bind(this)));
  }

  authLogin(model: { email: string; password: string }) {
    const url = `${this.getRoute('auth/login')}`;
    return this.http.post(url, model);
  }

  private handleUnauthorized(error) {
    // If encountered a 401 error, token has likely expired so logout the user
    // and redirect to home page, maybe show message that they have been logged out
    if (error instanceof HttpErrorResponse) {
      if (error.status === 401) {
        this.appService.unsetUserDetails();
        this.router.navigate(['unauthorized']);
      }
    }
    return EMPTY;
  }

  private getBearerToken() {
    return `Bearer ${this.appQuery.accessToken}`;
  }

  private getRoute(route: string) {
    return `${this.baseRoute}/${route}`;
  }
}
