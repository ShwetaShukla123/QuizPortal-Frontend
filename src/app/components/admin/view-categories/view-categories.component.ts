import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { CategoryService } from '../../../services/category.service';

@Component({
  selector: 'app-view-categories',
  templateUrl: './view-categories.component.html',
  styleUrls: ['./view-categories.component.css']
})
export class ViewCategoriesComponent implements OnInit {

  categories = [];
  constructor(private _category: CategoryService) { }

  ngOnInit(): void {
    this._category.getCategories().subscribe(
      data=>{
        this.categories = data;
      },
      error=>{
        Swal.fire('Error!', 'Could not load data', 'error');
      }
    )
  }

}
