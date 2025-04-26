import { Component } from '@angular/core';
import {NavigationEnd, Router} from '@angular/router';
import {AuthHttpService} from './services/AuthHttp.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  standalone: false,
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'FEstreaming';
  url=''
  constructor(private router:Router,private auth:AuthHttpService) {
  }
  ngOnInit() {
    if(!this.auth.isTokenValid()){ this.auth.logout()}
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        this.url = event.url;
        console.log(this.url);
      }
    });
  }
}
