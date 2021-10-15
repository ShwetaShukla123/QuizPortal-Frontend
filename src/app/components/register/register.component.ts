import { Component, OnInit } from '@angular/core';
import { User } from '../../model/user';
import { UserService } from '../../services/user.service';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  constructor(private userService: UserService,
    private router: Router) { }

  ngOnInit(): void {
  }

  onSubmit(user: User) {
    this.userService.addUser(user).subscribe(
      data=>{
        Swal.fire('Success', 'Registration Successful!', 'success');
        this.router.navigateByUrl('/login')
      },
      error=>{
        Swal.fire('Oops...', 'Something went wrong!', 'error');
      }
    )
  }

}
