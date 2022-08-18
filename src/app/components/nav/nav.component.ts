import { Component, OnInit } from '@angular/core';
import { StoreService } from "../../services/store.service";
import { AuthService } from "../../services/auth.service";
import { User } from "../../models/user.model";
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
  // profile: User = {
  //   id: '',
  //   email: '',
  //   password: '',
  //   name: ''
  // }

  constructor(
    private storeService: StoreService,
    private authService: AuthService
  ) { }

  ngOnInit(): void {
    this.storeService.myCart$.subscribe(products => {
      this.counter = products.length;
    });
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

  // getProfile() {
  //   console.log(this.token);
  //   this.authService.profile()
  //   .subscribe(profile => {
  //     console.log(profile);
  //     this.profile = profile;
  //   });
  // }
}
