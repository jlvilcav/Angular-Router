import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { StoreService } from "../../../services/store.service";
import { AuthService } from "../../../services/auth.service";
import { CategoriesService } from "../../../services/categories.service";
import { User } from "../../../models/user.model";
import { Category } from "../../../models/category.model";
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
    private categoriesService: CategoriesService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.storeService.myCart$.subscribe(products => {
      this.counter = products.length;
    });
    this.getAllCategories();
    this.authService.user$
    .subscribe(data => {
      this.profile = data;
    });
  }

  toggleMenu(){
    this.activeMenu = !this.activeMenu;
  }

  login(){
    this.authService.loginAndGet( 'john@mail.com','changeme')
    .subscribe(()=> {
      this.router.navigate(['/home']);
    });
  }

  getAllCategories(){
    this.categoriesService.getAll()
    .subscribe(data=> {
      this.categories = data;
      // this.router.navigate(['/home']);
    });
  }

  logout(){
    this.authService.logout();
    this.profile = null;
    this.router.navigate(['/home']);
  }
}
