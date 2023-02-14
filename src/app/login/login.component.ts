import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl ,FormGroup,Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
loginForm!: FormGroup;
submitted = false;
constructor (private formBuilder:FormBuilder , private router:Router){
  this.loginForm = this.formBuilder.group({
    email :['',[Validators.required,Validators.email]],
    password:['',[Validators.required,
    Validators.minLength(8)]
  ],
  });
}
ngOnInit(): void {

}
login(){
this.submitted = true;
if(this.loginForm.invalid){
  return
}else{
this.router.navigate(['home'])
}
}
public hasError = (controlName: string, errorName: string) => {
  return this.loginForm.controls[controlName].hasError(errorName);
}
}

