import { Component, OnInit } from '@angular/core';
import {User} from '../data/user';
import { NgForm } from '@angular/forms';
import { DataService } from '../data/data.service';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {

originalUser : User ={
  name: '',
  email: '',
  password: '',
  rePassword: ''
}

user: User = {...this.originalUser};

  constructor(private dataService: DataService) { }

  ngOnInit(): void {
   
  }

  onSubmit(form: NgForm){
    console.log('in onSubmit: ', form.valid);
    if(form.valid&&(this.user.password==this.user.rePassword))
    {
    document.getElementById('amazonButton').blur();
    this.dataService.postUser(this.user).subscribe(
      result => console.log('success: ', result),
      error => console.log('error: ', error)
    )
    }
    else
    {
      console.log('correct errors first');
    }
  }
}
