import { Component, OnInit ,Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { HomeComponent } from '../components/home/home.component';
import { user } from '../userdata';

@Component({
  selector: 'app-edit-employee',
  templateUrl: './edit-employee.component.html',
  styleUrls: ['./edit-employee.component.css']
})
export class EditEmployeeComponent implements OnInit {
  url ='';
  editData:user['users']=[];
  constructor(private dialogRef:MatDialogRef<HomeComponent>, @Inject(MAT_DIALOG_DATA) public data:any){}
  ngOnInit(): void {
  this.editData = this.data;
}
  onSubmit(data:any){
  this.editData.image = this.url;
  this.editData.firstName = data.firstName;
  this.editData.lastName = data.lastName;
  this.editData.maidenName = data.maidenName;
  this.editData.age = data.age;
  this.editData.gender = data.gender;
  this.dialogRef.close(this.editData);
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
}
