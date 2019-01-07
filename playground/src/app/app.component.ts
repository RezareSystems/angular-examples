import { Component, OnInit } from '@angular/core';
import { ApiService } from './core/services/api.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'playground';

  constructor(private api: ApiService) {}

  ngOnInit() {
    this.api.getPosts().subscribe(data => console.log(data));
    this.api.getPost(2).subscribe(data => console.log(data));
  }
}
