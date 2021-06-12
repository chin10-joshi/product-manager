import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { UserDetails } from 'src/app/shared/interfaces/user';
import { HttpService } from 'src/app/shared/services/http/http.service';
import { REGEX_EMAIL } from 'src/app/shared/constant';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { AuthService } from 'src/app/shared/services/auth/auth.service';
import { CommonService } from 'src/app/shared/services/common/common.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit, OnDestroy {

  destroy$ = new Subject();
  loginForm!: FormGroup;
  constructor(private httpService: HttpService, private router: Router, private authService: AuthService) { }

  ngOnInit(): void {
    if (this.authService.getUserDetails()) {
      this.router.navigate(['/product-list'])
    }
    this.prepareForm();
  }

  /**
   * Initiate Login Form
   */
  prepareForm() {
    this.loginForm = new FormGroup({
      userName: new FormControl('mor_2314', Validators.required),
      password: new FormControl('83r5^_', Validators.required)
    });
  }

  /**
   * Submit Form Callback
   */
  onLogin(formValue : UserDetails) {
    const {userName, password} = formValue;
    this.httpService.post<UserDetails>('auth/login', {username: userName, password}).subscribe((resp) => {
      if (resp) {
        this.router.navigate(['/product-list'])
      }
    });
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
