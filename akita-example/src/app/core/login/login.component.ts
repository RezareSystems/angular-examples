import { Component } from '@angular/core';

import { ApiService } from '../services/api.service';
import { HttpErrorResponse } from '@angular/common/http';
import { AppService } from 'src/app/state';
import { Router } from '@angular/router';

@Component({
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  model = { email: '', password: '' };
  incorrect = false;

  constructor(
    private apiService: ApiService,
    private appService: AppService,
    private router: Router
  ) {}

  onSubmit() {
    this.apiService.authLogin(this.model).subscribe(
      (success: {
        user: { id: number; name: string; email: string };
        access_token: string;
      }) => {
        this.appService.setUserDetails(
          success.user.id,
          success.user.name,
          success.user.email,
          success.access_token
        );
        this.router.navigate(['']);
      },
      (error: HttpErrorResponse) => {
        // Show error saying incorrect email or password
        if (error.status === 401) {
          this.incorrect = true;
        }
      }
    );
  }
}
