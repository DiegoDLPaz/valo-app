import {inject, Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '@environment/environment.development';
import {Observable, of, tap} from 'rxjs';
import {User} from '../../../auth/interfaces/user.interface';

const baseUrl = environment.userUrl

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  private http = inject(HttpClient)

  getAllUsers():Observable<User[]>{
    return this.http.get<User[]>(`${baseUrl}/api/users`)
  }

  getUserById(id:string):Observable<User>{
    return this.http.get<User>(`${baseUrl}/api/user/${id}`)
  }

  deleteUserById(id:string):Observable<string>{
    return this.http.delete<string>(`${baseUrl}/api/user/${id}`)
  }

  updateUserById(id:string,name:string,email:string,rol:string):Observable<User>{
    return this.http.patch<User>(`${baseUrl}/api/user/${id}`,{
      name: name,
      email: email,
      rol: rol
    })
  }
}
