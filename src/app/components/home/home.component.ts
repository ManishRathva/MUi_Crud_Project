import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AddEmployeeComponent } from 'src/app/add-employee/add-employee.component';
import { EmployeeService } from 'src/app/employee.service';
import { user } from 'src/app/userdata';
import { MatTableDataSource } from '@angular/material/table';
import { EditEmployeeComponent } from 'src/app/edit-employee/edit-employee.component';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit{
addData:user['users']=[];
newEditData:user['users']=[];
displayedColumns: string[] = ['id', 'firstName','lastName', 'maidenName','age','gender','Action','Action1'];
employee : user['users']=[];
dataSource = this.employee;


constructor(public dialog:MatDialog, private employeeService:EmployeeService){
 this.employeeService.getUser().subscribe((val:user[])=>{
  this.dataSource= val;
 })

  }
  ngOnInit(): void {
 }
 openDialog(){
   const dialogRef = this.dialog.open(AddEmployeeComponent)
   dialogRef.afterClosed().subscribe((result:any)=>{
   this.dataSource['users'].push(result);
   console.log(this.dataSource);
  })
}
findUserByName(name:HTMLInputElement){
this.applyFilter(name.value);
}
applyFilter(filterValue : string) {
filterValue = filterValue.trim();
filterValue = filterValue.toLowerCase();
this.dataSource['users'].filter = filterValue;
  // const filterValue = (event.target as HTMLInputElement).value;
  // this.dataSource.filter = filterValue.trim().toLowerCase();
}
deleteData(id:number){
this.dataSource['users'] = this.dataSource['users'].filter((val:any) => val.id !== id)
}
 editData(data:Element){
 this.dialog.open(EditEmployeeComponent,{
  data
 });
  }
}



