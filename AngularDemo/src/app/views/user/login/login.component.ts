import { Component, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { NotificationsService, NotificationType } from 'angular2-notifications';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/shared/auth.service';
import { environment } from 'src/environments/environment';
import {NgxSpinnerService} from 'ngx-spinner';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html'
})
export class LoginComponent {
  @ViewChild('loginForm') loginForm: NgForm;
  userNameModel = '';
  passwordModel = '';

  buttonDisabled = false;
  buttonState = '';

  constructor(private authService: AuthService, private notifications: NotificationsService, private router: Router,private spinner: NgxSpinnerService,
  ) { }

  onSuccess(content) {
    this.notifications.create('Success', content, NotificationType.Success, { theClass: 'outline primary', timeOut: 6000, showProgressBar: true });
  }
  onError(content) {
    this.notifications.create('Error', content, NotificationType.Error, { theClass: 'outline primary', timeOut: 6000, showProgressBar: true });
  }

  onSubmit() {
    if (!this.loginForm.valid || this.buttonDisabled) {
      return;
    }
    this.spinner.show();

    this.buttonDisabled = true;
    this.buttonState = 'show-spinner';
    this.authService.signIn(this.loginForm.value).subscribe((user) => {
      this.buttonDisabled = false;
      this.buttonState = '';
      if (user['success']) {
        localStorage.setItem('authToken', user['data']['authToken']);
        localStorage.setItem('user', user['data']['user']);
        this.router.navigate(['/app']);
        this.spinner.hide();
        this.onSuccess('Login Successfully');

      } else {
        this.spinner.hide();
        this.notifications.create('Error', 'Invalid Username Or Password', NotificationType.Error, { timeOut: 6000, showProgressBar: true });
      }
    }, (error) => {
      this.spinner.hide();
      this.buttonDisabled = false;
      this.buttonState = '';
      this.notifications.create('Error', 'Invalid Username Or Password', NotificationType.Bare, { theClass: 'outline primary', timeOut: 6000, showProgressBar: false });
    });
  }
}
