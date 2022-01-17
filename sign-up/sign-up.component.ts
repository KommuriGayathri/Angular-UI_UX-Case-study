import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss'],
})
export class SignUpComponent implements OnInit {
  formSignUp!: FormGroup;
  constructor(
    private formBuilder: FormBuilder,
    private _http: HttpClient,
    private router: Router
  ) {}
  ngOnInit(): void {
    this.formSignUp = this.formBuilder.group({
      name: [''],
      mobile: [''],
      email: [''],
      password: [''],
    });
  }
  signUp() {
    this._http
      .post<any>('http://localhost:3000/signup', this.formSignUp.value)
      .subscribe(
        (res) => {
          alert('Registration Sucessfully');
          this.formSignUp.reset();
          this.router.navigate(['login']);
        },
        (err) => {
          alert('login Failed');
        }
      );
  }
}
