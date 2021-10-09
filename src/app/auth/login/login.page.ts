/* eslint-disable object-shorthand */
import { AuthService } from './../../services/auth/auth.service';
import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import { Router } from '@angular/router';
import { LoadingController, ToastController } from '@ionic/angular';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  email: string;
  password: string;

  constructor(
    private afs: AngularFirestore,
    private afauth: AngularFireAuth,
    private loadingCtrl: LoadingController,
    private toastr: ToastController,
    private router: Router,
    private auth: AuthService
  ) { }

  ngOnInit() {
  }

  async login(){
    if(this.email && this.password)
    {
      const loading = await this.loadingCtrl.create({
        message: 'Logging in..',
        spinner: 'crescent',
        showBackdrop: true
      });

      loading.present();

      this.auth.login(this.email, this.password)
      .then(()=> {
        loading.dismiss();
        this.router.navigate(['/tab/timeline-post']);
      })
      .catch((error)=> {
        loading.dismiss();
        this.toast(error.message, 'danger');
      });
    }else{
      this.toast('Please enter your correct email and password!', 'danger');
    }
  } //end of login

 forgot(){
  this.router.navigate(['/forgot-password']);
 }//end of forgot password

 register()
  {
    this.router.navigate(['/register']);
  } //end of register

 async toast(message, status){
   const toast = await this.toastr.create({
     message: message,
     position: 'top',
     color: status,
     duration: 1000
   });
   toast.present();
 }//end of toast
}
