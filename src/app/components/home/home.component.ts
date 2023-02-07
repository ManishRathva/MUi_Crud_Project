import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AddEmployeeComponent } from 'src/app/add-employee/add-employee.component';
import { EmployeeService } from 'src/app/employee.service';
import { user } from 'src/app/userdata';
import { MatTableDataSource } from '@angular/material/table';
import { EditEmployeeComponent } from 'src/app/edit-employee/edit-employee.component';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit{
displayedColumns: string[] = ['id','image','firstName','lastName', 'maidenName','age','gender','Action','Action1'];
employee:user['users']=[];
dataSource = this.employee;

@ViewChild(MatPaginator) paginator!:MatPaginator;
@ViewChild(MatSort) sort!:MatSort;

ngOnInit():void{
}

constructor(public dialog:MatDialog, private employeeService:EmployeeService){
 this.employeeService.getUser().subscribe((val:user[])=>{
  this.dataSource = val;
  this.dataSource['users'] = new MatTableDataSource(this.dataSource['users']);
  this.dataSource['users'].paginator = this.paginator;
  this.dataSource['users'].sort = this.sort;
})

  }
 openDialog(){
   const dialogRef = this.dialog.open(AddEmployeeComponent)
   dialogRef.afterClosed().subscribe((result:any)=>{
   this.dataSource['users'].data.unshift(result);
  });
  }
findUserByName(name : HTMLInputElement){
this.applyFilter(name.value);
}
applyFilter(filterValue : string) {
filterValue = filterValue.trim();
filterValue = filterValue.toLowerCase();
this.dataSource['users'].filter = filterValue;
}
deleteData(id:number){
this.dataSource['users'].data = this.dataSource['users'].data.filter((val:any) =>
val.id !== id);
}
 editData(data:Element){
 this.dialog.open(EditEmployeeComponent,{
  data
 });
  }

}



