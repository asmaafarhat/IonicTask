import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import * as firebase from 'firebase/app';
import { Observable } from 'rxjs';
import { GooglePlus } from '@ionic-native/google-plus/ngx';
import { Facebook } from '@ionic-native/facebook/ngx';
import { Platform } from '@ionic/angular';
import { AngularFireAuth } from '@angular/fire/auth';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  user: Observable<firebase.User>;
  constructor(private authService: AuthService, public router: Router,
    private afAuth: AngularFireAuth, private gplus: GooglePlus, private fb: Facebook,
    private platform: Platform) {
    this.user = this.afAuth.authState;
  }

  ngOnInit() {
  }

  // loginWithFacebook() {
  //   this.authService.loginWithFacebook().then(res => {
  //     this.router.navigate(['/home']);
  //   })
  //     .catch(e => console.log('Error logging into Facebook', e));
  // }


  // Google
  loginWithGoogle() {
    if (this.platform.is('cordova')) {
      this.nativeGoogleLogin();
    }
    else {
      this.webGoogleLogin();
    }
  }

  async nativeGoogleLogin(): Promise<firebase.auth.UserCredential> {
    try {
      const gplusUser = await this.gplus.login({
        'webClientId': '104018840871135217397',
        'offline': true,
        'scopes': 'profile email'
      })

      this.router.navigate(['/home']);
      return await this.afAuth.signInWithCredential(
        firebase.auth.GoogleAuthProvider.credential(gplusUser.idToken)
      )
    } catch (err) {
      console.log(err)
    }
  }
  async webGoogleLogin(): Promise<void> {
    try {
      const provider = new firebase.auth.GoogleAuthProvider();
      const credential = await this.afAuth.signInWithPopup(provider);
      this.router.navigate(['/home']);

    } catch (err) {
      console.log(err)
    }
  }
  // Facebook
  loginWithFacebook() {
    if (this.platform.is('cordova')) {
      this.nativeFacebookLogin();
    }
    else {
      this.webFacebookLogin();
    }
  }

  async nativeFacebookLogin(): Promise<firebase.auth.UserCredential> {
    try {
      return this.authService.loginWithFacebook();
    } catch (err) {
      console.log(err)
    }
  }
  async webFacebookLogin(): Promise<void> {
    try {
      const provider = new firebase.auth.FacebookAuthProvider();
      const credential = await this.afAuth.signInWithPopup(provider);
      this.router.navigate(['/home']);

    } catch (err) {
      console.log(err)
    }
  }
  // Twitter
  loginWithTwitter() {
  }
}
