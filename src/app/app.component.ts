import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  styleUrls: ['./app.component.css'],
  template: `
    <div class="title">💰💰💰 S1 Demo 💰💰💰</div>
    <header class="header">
      <a *ngFor="let route of routes"
         routerLinkActive="active-link"
         [routerLinkActiveOptions]="{exact: true}"
         [routerLink]="route.route">{{route.title}}
      <span class="marker"></span>
      </a>
    </header>
    <router-outlet></router-outlet>

  `

})
export class AppComponent {
  routes = [
    {title: 'HOME', route: '/' },
    {title: 'D3CHART', route: 'd3chart' },
    {title: 'LOTTIE', route: 'lottie' },
  ];
}
