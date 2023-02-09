import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { user } from './userdata';
import { forkJoin } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {
uUrl='https://dummyjson.com/users/'
constructor(private http:HttpClient) { }
 getUser():Observable<user['users']>{
  return this.http.get<user['users']>(this.uUrl);
 }
addEmpData(data:any){
  return this.http.post<any>("http://localhost:3000/employeedata/",data)
 }
 
 getData(){
  return this.http.get<any>("http://localhost:3000/employeedata")
 }

 deleteUser(id:number):Observable<user['users']>{
 return this.http.delete<user['users']>(this.uUrl +'/'+id);
 }

 updateUser(User: user['users']): Observable<user> {
  return this.http.patch<user['users']>(`${this.uUrl}/${User.id}`, User);
}
 addUser(User: user): Observable<user> {
  return this.http.post<user>(`${this.uUrl}/add`, user);
}
}
