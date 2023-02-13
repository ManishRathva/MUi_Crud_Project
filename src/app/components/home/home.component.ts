import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { AddEmployeeComponent } from 'src/app/add-employee/add-employee.component';
import { EmployeeService } from 'src/app/employee.service';
import { user } from 'src/app/userdata';
import { MatTableDataSource } from '@angular/material/table';
import { EditEmployeeComponent } from 'src/app/edit-employee/edit-employee.component';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { FormGroup , FormControl , Validators } from '@angular/forms';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit{
displayedColumns: string[] = ['id','image','firstName','lastName', 'maidenName','age','gender','Action'];
employee:user['users']=[];
dataSource = this.employee;
jasonData:user['users']=[];
newData:any;
url = '';

employeeForm = new FormGroup({
  image : new FormControl ('',[Validators.required]),
  firstName : new FormControl ('',[Validators.required]),
  lastName : new FormControl ('',[Validators.required]),
  maidenName : new FormControl ('',[Validators.required]),
  age: new FormControl ('',[Validators.required]),
  gender: new FormControl ('',[Validators.required]),
});


@ViewChild(MatPaginator) paginator!:MatPaginator;
@ViewChild(MatSort) sort!:MatSort;
constructor(public dialog:MatDialog, private employeeService:EmployeeService){
 this.employeeService.getUser().subscribe((val:user['users'])=>{
  this.employeeService.getData().subscribe((data)=>{
  this.dataSource['users'] = [...data].concat(val['users']);
  this.dataSource['users'] = new MatTableDataSource(this.dataSource['users']);
  this.dataSource['users'].paginator = this.paginator;
  this.dataSource['users'].sort = this.sort;
});
});
}
ngOnInit():void{
  this.getDatajson();
  }

//  openDialog(){
//    const dialogRef = this.dialog.open(AddEmployeeComponent)
//    dialogRef.afterClosed().subscribe((result:any)=>{
//     if(result == ' '){
//     }else{
//     this.dataSource.users.data = [result].concat(this.dataSource['users'].data);
//     console.log(this.dataSource.users.data);
//     }
//   })
//   }
findUserByName(name : HTMLInputElement){
this.applyFilter(name.value);
}
applyFilter(filterValue : string) {
filterValue = filterValue.trim();
filterValue = filterValue.toLowerCase();
this.dataSource['users'].filter = filterValue;
}
deleteData(id:number){
this.employeeService.deleteUser(id).subscribe(()=>{
this.dataSource['users'].data = this.dataSource['users'].data.filter((val:any)=>
 val.id !== id);
 })
 this.employeeService.deletejson(id).subscribe(()=>{
  this.dataSource['users'].data = this.dataSource['users'].data.filter((val:any)=>
   val.id !== id);
   })
}
 editData(data:Element){
 const dialogRef = this.dialog.open(EditEmployeeComponent,{
  data
 });
 dialogRef.afterClosed().subscribe((data:any)=>{
 this.employeeService.updateUser(data).subscribe();
 this.employeeService.updateJson(data).subscribe();
 });
 }

getDatajson(){
  this.employeeService.getData().subscribe((val:any)=>{
  this.jasonData = val;
})
}
onselectFile(e: any) {
  if (e.target.files) {
    let reader = new FileReader();
    reader.readAsDataURL(e.target.files[0]);
    reader.onload = (event: any) => {
    this.url = event.target.result;
    };
  }
}
addData(data:any){

data.image = this.url;
console.log(data);
this.employeeService.addEmpData(data).subscribe((data:any)=>{
if(data == ' '){
}else{
this.dataSource['users'].data = [({image:this.url,firstName:data.firstName ,lastName:data.lastName,maidenName:data.maidenName,age:data.age,gender:data.gender})].concat(this.dataSource['users'].data);
console.log(this.dataSource['users'].data);

// ({image:this.url,firstName:data.firstName ,lastName:data.lastName,maidenName:data.maidenName,age:data.age,gender:data.gender})
// if(data == ' '){
// }else{
// this.dataSource.users.data = [data].concat(this.dataSource['users'].data);
//
    }
   })
  }
}


