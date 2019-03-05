import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';

import { AppQuery, AppService } from 'src/app/state';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss']
})
export class NavComponent implements OnInit {
  isAuthenticated$: Observable<boolean>;
  userDetails$: Observable<any>;

  constructor(
    private appQuery: AppQuery,
    private appService: AppService,
    private router: Router
  ) {}

  ngOnInit() {
    this.isAuthenticated$ = this.appQuery.isAuthenticated$;
    this.userDetails$ = this.appQuery.userDetails$;
  }

  logout() {
    this.appService.unsetUserDetails();
    this.router.navigate(['']);
  }
}
