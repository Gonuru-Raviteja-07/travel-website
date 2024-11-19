import { HttpClient } from '@angular/common/http';
import { Component, inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DataService } from '../ServiceFile/data.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent{

  router = inject(Router);
  http = inject(HttpClient);
  info = inject(DataService);

  errorMsg: string='';

  usersData: any;

  ngOnInit(): void {
    //getting users details from db
    this.info.getUsers().subscribe((users) => {
      this.usersData = users;
    },
    ((err : any)=>{console.log(err.error.message)})
  )}

  //validating username & password
  validate(data: any) {
    this.usersData.forEach((user: any) => {
      if (data.value.username === user.userName && data.value.password === user.userPassword) {
        this.info.saveUserNameInSessionStorage(data.value.username);
        this.info.isLogged=true;
        this.router.navigateByUrl('/office');
      }
      else {
        this.errorMsg = 'Invalid User';
      }
    });
  }
}
