import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss'],
})
export class LoginPageComponent implements OnInit {
  formLogin!: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private _http: HttpClient,
    private router: Router
  ) {}
  ngOnInit(): void {
    this.formLogin = this.formBuilder.group({
      email: [''],
      password: [''],
    });
  }

  logIn() {
    this._http.get<any>('http://localhost:3000/signup').subscribe(
      (res) => {
        const user = res.find((a: any) => {
          return (
            a.email === this.formLogin.value.email &&
            a.password === this.formLogin.value.password
          );
        });
        if (user) {
          alert('User login is sucessfull');
          this.formLogin.reset();
          this.router.navigate(['employee']);
        } else {
          alert('User not found');
        }
      },
      (err) => {
        alert('Server side error');
      }
    );
  }
}
