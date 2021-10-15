import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { CategoryService } from 'src/app/services/category.service';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-user-side-bar',
  templateUrl: './user-side-bar.component.html',
  styleUrls: ['./user-side-bar.component.css']
})
export class UserSideBarComponent implements OnInit {

  categories = [];
  constructor(private loginService: LoginService, private router: Router,
    private _category: CategoryService,
    private _snack: MatSnackBar) { }

  ngOnInit(): void {
    this._category.getCategories().subscribe(
      data=>{
        this.categories = data;
      },
      error=>{
        this._snack.open('Error occured on loading categories', '', {
          duration: 3000
        })
      }
    )
  }

  // logout(){
  //   this.loginService.logout();
  //   this.router.navigateByUrl('/login');
  // }
}
