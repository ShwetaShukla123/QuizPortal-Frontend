import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from '../../services/login.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginData = {
    username: '',
    password: ''
  }
  constructor(private loginService: LoginService,
    private router: Router) { }

  ngOnInit(): void {
  }

  onSubmit() {
    this.loginService.login(this.loginData).subscribe(
      data => {
        console.log(data);
        //storeToken
        this.loginService.storeToken(data.token);
      },
      error => {
        Swal.fire('Oops...', 'Invalid Credentials!', 'error')
      }
    )
  }
}
