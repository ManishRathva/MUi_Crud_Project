import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { user } from './userdata';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {
uUrl='https://dummyjson.com/users'
constructor(private http:HttpClient) { }
 getUser():Observable<user['users']>{
  return this.http.get<user['users']>(this.uUrl);
 }
 deleteUser(id:number):Observable<any>{
 return this.http.delete(this.uUrl +'/'+id);
 }
}
