import {computed, inject, Injectable, signal} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {catchError, map, Observable, of, tap, throwError} from 'rxjs';
import {User} from '../interfaces/user.interface';
import { AuthResponse } from '../interfaces/authresponse.interface';
import {environment} from '@environment/environment';
import {rxResource} from '@angular/core/rxjs-interop';

type AuthStatus = 'checking' | 'authenticated' | 'not-authenticated'
const baseUrl = environment.userUrl

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private http = inject(HttpClient)

  private _authStatus = signal<AuthStatus>('checking')
  private _user = signal<User|null>(null)
  private _token = signal<string|null>(localStorage.getItem('tokenValo'))

  checkStatusResource = rxResource({
    loader: () => this.checkStatus()
  })

  authStatus = computed<AuthStatus>(() => {
    if(this._authStatus() === 'checking') return 'checking';

    if(this._user()){
      return 'authenticated';
    }

    return 'not-authenticated';
  })

  user = computed(() => this._user())
  token = computed(this._token)
  isAdmin = computed(() => this._user()?.rol === 'admin')

  login(email: string, password: string) : Observable<boolean>{
    return this.http.post<AuthResponse>(`${baseUrl}/auth/login`,{
      email: email,
      password: password,
    }).pipe(
      map(resp => this.handleAuthSuccess(resp)),
      catchError((error: any) => {
        this.handleAuthError(error)
        return throwError(() => new Error('Login failed, please try again.'));
      })
    )
  }

  register(email: string, password: string, name: string): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(`${baseUrl}/auth/register`, {
      email: email,
      password: password,
      name: name
    }).pipe(
      catchError((error) => {
        this.handleAuthError(error)
        return throwError(() => new Error('Registration failed, please try again.'));
      })
    );
  }

  uploadProfileImage(id:string, formData :FormData):Observable<boolean>{
    return this.http.post<AuthResponse>(`${baseUrl}/api/user/${id}/upload-icon`,formData).pipe(
      map(resp => this.handleAuthSuccess(resp)),
      catchError((error: any) => {
        this.handleAuthError(error)
        return throwError(() => new Error('Login failed, please try again.'));
      })
    )
  }

  checkStatus() : Observable<boolean>{
    const token = localStorage.getItem('token')
    if(!token){
      this.logout()
      return of(false)
    }

    return this.http.get<AuthResponse>(`${baseUrl}/auth/check-status`,{
    }).pipe(
      map((resp) => {
        return this.handleAuthSuccess(resp)
      }

      ),

      catchError((error: any) => this.handleAuthError(error))
    )
  }


  logout(){
    this._user.set(null)
    this._token.set(null)
    this._authStatus.set('not-authenticated')

    localStorage.removeItem('tokenValo')
  }

  private handleAuthSuccess({token, user}: AuthResponse){
    this._user.set(user);
    this._authStatus.set('authenticated');
    this._token.set(token);

    localStorage.setItem('tokenValo', token)

    return true;
  }

  private handleAuthError(error: any){

    this.logout();

    return of(false)
  }

}
