import { Injectable } from '@angular/core';
import { Facebook, FacebookLoginResponse } from '@ionic-native/facebook/ngx';
import { auth } from 'firebase';
import { AngularFireAuth } from "@angular/fire/auth";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private fb: Facebook, private AFauth : AngularFireAuth) { }

  loginWithFacebook() {
    return this.fb.login(['email','user_location'])
      .then((res: FacebookLoginResponse) => {
        const credential_fb=auth.FacebookAuthProvider.credential(res.authResponse.accessToken);
        console.log('Logged into Facebook!', res)
        return this.AFauth.signInWithCredential(credential_fb);
      })
  }
}
