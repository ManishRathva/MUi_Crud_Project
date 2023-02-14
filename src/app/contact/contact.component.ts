import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent implements OnInit{
  loginForm!: FormGroup;
  submitted = false;
  constructor(private formBuilder:FormBuilder , private router:Router){
    this.loginForm = this.formBuilder.group({
      firstName:['',[Validators.required, Validators.minLength(5)]],
      lastName:['',[Validators.required,Validators.minLength(5)]],
      email:['',[Validators.required,Validators.email]],
      password:['',[Validators.required,
      Validators.minLength(8)]],
      select:['',Validators.required],
    })
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
