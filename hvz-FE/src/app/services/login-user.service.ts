import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Observable, catchError, throwError } from 'rxjs';
import { LoginUser } from '../models/LoginUser';

@Injectable({
  providedIn: 'root',
})
export class LoginUserService {
  private readonly GAME_URL: string = environment.GAME_URL;

  constructor(private http: HttpClient) {}

  public getLoginUser(loginUserId: string | undefined): Observable<any> {
    return this.http
      .get<any>(`${this.GAME_URL}/loginuser/${loginUserId}/player`)
      .pipe(
        catchError((error) => {
          console.error('Failed to fetch login user.', error);
          return throwError(() => new Error('Failed to fetch login user.'));
        })
      );
  }

  public saveLoginUser(loginUser: LoginUser): Observable<void> {
    return this.http.post<void>(`${this.GAME_URL}/loginuser/`, loginUser).pipe(
      catchError((error) => {
        console.error('Failed to save login user.', error);
        return throwError(() => new Error('Failed to save login user.'));
      })
    );
  }
}
