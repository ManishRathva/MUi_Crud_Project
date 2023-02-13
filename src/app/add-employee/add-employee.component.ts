import { Component, OnInit } from '@angular/core';
import { FormGroup,FormControl,Validator, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { HomeComponent } from '../components/home/home.component';
import { EmployeeService } from '../employee.service';
import { user } from '../userdata';

@Component({
  selector: 'app-add-employee',
  templateUrl: './add-employee.component.html',
  styleUrls: ['./add-employee.component.css']
})
export class AddEmployeeComponent implements OnInit {
  employeeForm = new FormGroup({
  image : new FormControl ('',[Validators.required]),
  firstName : new FormControl ('',[Validators.required]),
  lastName : new FormControl ('',[Validators.required]),
  maidenName : new FormControl ('',[Validators.required]),
  age: new FormControl ('',[Validators.required]),
  gender: new FormControl ('',[Validators.required]),
});

url = '';
adingData:user['users'] = [];
constructor(private dialogRef:MatDialogRef<HomeComponent> ,private employeeService:EmployeeService){}
ngOnInit(): void {

}
// addData(data:any){
//   this.adingData.image = this.url;
//   this.adingData.firstName = data.firstName;
//   this.adingData.lastName = data.lastName;
//   this.adingData.maidenName = data.maidenName;
//   this.adingData.age = data.age;
//   this.adingData.gender = data.gender;
//   this.dialogRef.close(this.adingData);
//  }
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
// this.dialogRef.close( data);
this.employeeService.addEmpData(data).subscribe((val)=>{
  this.dialogRef.close(val)

  // this.employeeService.addEmpData(this.employeeForm.value).subscribe((val:any)=>{
      alert("data added");
      this.employeeForm.reset();
      this.adingData.image = this.url;
      this.adingData.firstName = val.firstName;
      this.adingData.lastName = val.lastName;
      this.adingData.maidenName = val.maidenName;
      this.adingData.age = val.age;
      this.adingData.gender = val.gender;
      this.dialogRef.close(this.adingData);
      });
   }
  }

