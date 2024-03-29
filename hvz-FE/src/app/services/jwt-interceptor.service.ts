import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { KeycloakService } from './keycloak.service';

@Injectable()
export class JwtInterceptor implements HttpInterceptor {
  constructor(private keycloakService: KeycloakService) {}

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    if (this.keycloakService.isAuthenticated && this.keycloakService.token) {
      const token = this.keycloakService.token;
      const authRequest = request.clone({
        setHeaders: { Authorization: `Bearer ${token}` },
      });
      return next.handle(authRequest);
    }
    return next.handle(request);
  }
}
