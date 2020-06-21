import { Component, OnInit } from '@angular/core';
import {User} from '../data/user';
import { NgForm, FormGroup, FormBuilder, Validators, AbstractControl } from '@angular/forms';
import { DataService } from '../data/data.service';

function passwordCompare(c: AbstractControl): { [key: string]: boolean} | null {
if(c.get('userpassword').value===c.get('userrepassword').value){
  return null;
}
return { 'match': true };
}

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {
userForm: FormGroup;
user: User = new User();

  constructor(private dataService: DataService, private fb: FormBuilder) { }

  ngOnInit(): void {
    this.userForm = this.fb.group({
      username: ['', Validators.required],
      useremail: ['', [Validators.required, Validators.email]],
      passwordGroup: this.fb.group({
        userpassword: ['', [Validators.required, Validators.minLength(6)]],
        userrepassword: ['', Validators.required],
      }, {validator: passwordCompare})
      
    } )
  ;
  }

  onSubmit( ){
    document.getElementById('amazonButton').blur();
    
    if(this.userForm.valid)
    {
   console.log('in onSubmit: ', this.userForm.valid);
    this.dataService.postUser(this.userForm).subscribe(
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
