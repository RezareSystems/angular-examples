import { Component, OnInit } from '@angular/core';

import { AppService, AppQuery } from './state';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'akita-example';
  userDetails$: Observable<any>;

  constructor(private appService: AppService, private appQuery: AppQuery) {}

  ngOnInit() {
    this.userDetails$ = this.appQuery.select(s => s.userDetails);
  }
}
