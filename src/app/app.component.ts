import { Component } from '@angular/core';
import { AuthService } from './services/auth.service';
import { UsersService } from './services/users.service';
import { FilesService } from './services/files.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  imgParent = '';
  showImg:boolean = true;
  token = '';
  imgRta = '';

  constructor(
    private authService: AuthService,
    private usersService: UsersService,
    private filesService: FilesService
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

  downloadPdf(){
    this.filesService.getFiles('test.pdf', 'https://young-sands-07814.herokuapp.com/api/files/dummy.pdf', 'application/pdf')
    .subscribe();
  }

  onUpload(event: Event) {
    const element = event.target as HTMLInputElement;
    const file = element.files?.item(0);
    if (file) {
      this.filesService.uploadFile(file)
      .subscribe(rta => {
        // console.log(rta);
        this.imgRta = rta.location;
      });
    }

  }

  // login(){
  //   this.authService.login( 'Jorgito@gmail.com','123456')
  //   .subscribe(rta => {
  //     console.log(rta.access_token);
  //     this.token = rta.access_token;
  //   });
  // }

  // getProfile() {
  //   console.log(this.token);
  //   this.authService.profile(this.token)
  //   .subscribe(profile => {
  //     console.log(profile);
  //   });
  // }
}
