import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { from } from 'rxjs';

import { getUserRole } from 'src/app/utils/util';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {environment} from '../../environments/environment';

export interface ISignInCredentials {
  username: string;
  password: string;
}

export interface ICreateCredentials {
  email: string;
  password: string;
  displayName: string;
}

export interface IPasswordReset {
  code: string;
  newPassword: string;
}


@Injectable({ providedIn: 'root' })
export class AuthService {
  token: string;
  apiKey: string;

  constructor(private auth: AngularFireAuth, private http: HttpClient) {}

  // // tslint:disable-next-line:typedef
  // signIn(credentials: ISignInCredentials) {
  //   return this.auth
  //     .signInWithEmailAndPassword(credentials.email, credentials.password)
  //     .then(({ user }) => {
  //       return user;
  //     });
  // }

  signIn(credentials: ISignInCredentials) {
    // return from(this.afAuth.auth.signInWithEmailAndPassword(credentials.email, credentials.password));
    return this.http.post(environment.apiUrl + '/admin/authenticate',  credentials, this.getHttpOptions());
  }
  signOut = () => from(this.auth.signOut());

  // tslint:disable-next-line:typedef
  register(credentials: ICreateCredentials) {
    return this.auth
      .createUserWithEmailAndPassword(credentials.email, credentials.password)
      .then(async ({ user }) => {
        user.updateProfile({
          displayName: credentials.displayName,
        });
        this.auth.updateCurrentUser(user);
        return user;
      });
  }

  // tslint:disable-next-line:typedef
  sendPasswordEmail(email) {
    return this.auth.sendPasswordResetEmail(email).then(() => {
      return true;
    });
  }

  // tslint:disable-next-line:typedef
  resetPassword(credentials: IPasswordReset) {
    return this.auth
      .confirmPasswordReset(credentials.code, credentials.newPassword)
      .then((data) => {
        return data;
      });
  }

  // tslint:disable-next-line:typedef
  async getUser() {
    const u = await this.auth.currentUser;
    return { ...u, role: getUserRole() };
  }

  // isAuthenticated() {
  //   this.token = localStorage.getItem('authToken');
  //   if (this.token === null || this.token === '') {
  //     return false;
  //   } else {
  //     return true;
  //   }
  // }

  isAuthenticated() {
    this.apiKey = localStorage.getItem('apiKey');
    if (this.apiKey === null || this.apiKey === '') {
      return false;
    } else {
      return true;
    }
  }

  getHttpOptions() {
    return  {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };
  }
}
