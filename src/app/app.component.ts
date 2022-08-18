import { Component } from '@angular/core';
import { AuthService } from './services/auth.service';
import { UsersService } from './services/users.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  imgParent = '';
  showImg:boolean = true;

  constructor(
    private authService: AuthService,
    private usersService: UsersService
  ) { }


  onLoaded(img:string) {
    console.log('log padre ', img);
  }

  toggleImg() {
    this.showImg = !this.showImg;
  }

  createUser(){
    this.usersService.create({
      name: 'Jorge',
      email: 'Jorgito@gmail.com',
      password: '123456'
    })
    .subscribe(rta => {
      console.log(rta);
    });
  }

  login(){
    this.authService.login( 'Jorgito@gmail.com','123456')
    .subscribe(rta => {
      console.log(rta.access_Token);
    });
  }
}
