import { Component, OnInit } from '@angular/core';
import { StoreService } from "../../services/store.service";
import { AuthService } from "../../services/auth.service";
import { CategoriesService } from "../../services/categories.service";
import { User } from "../../models/user.model";
import { Category } from "../../models/category.model";
import { switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss']
})
export class NavComponent implements OnInit {

  activeMenu: boolean = false;
  counter: number = 0;
  token: string = '';
  profile: User | null = null;
  categories: Category[] = [];

  constructor(
    private storeService: StoreService,
    private authService: AuthService,
    private categoriesService: CategoriesService
  ) { }

  ngOnInit(): void {
    this.storeService.myCart$.subscribe(products => {
      this.counter = products.length;
    });
    this.getAllCategories();
  }

  toggleMenu(){
    this.activeMenu = !this.activeMenu;
  }

  login(){
    this.authService.loginAndGet( 'Jorgito@gmail.com','123456')
    .subscribe(profile=> {
      this.profile = profile;
    });
  }

  getAllCategories(){
    this.categoriesService.getAll()
    .subscribe(data => {
      this.categories = data;
    });
  }
}
