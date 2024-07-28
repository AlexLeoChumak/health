import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { IonApp, IonRouterOutlet } from '@ionic/angular/standalone';
import { filter } from 'rxjs';

import { HeaderComponent } from 'src/app/shared/components/header/header.component';
import { FooterComponent } from 'src/app/shared/components/footer/footer.component';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['./app.component.scss'],
  standalone: true,
  imports: [IonApp, IonRouterOutlet, HeaderComponent, FooterComponent],
})
export class AppComponent implements OnInit {
  showHeaderFooter: boolean = true;

  constructor(private router: Router) {}

  ngOnInit(): void {
    this.router.events
      .pipe(
        filter(
          (event): event is NavigationEnd => event instanceof NavigationEnd
        )
      )
      .subscribe((event: NavigationEnd) => {
        this.showHeaderFooter = !event.url.includes('auth');
      });
  }
}
