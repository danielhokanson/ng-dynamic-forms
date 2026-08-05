import { Component, ChangeDetectionStrategy, inject } from '@angular/core';
import { Router, NavigationEnd, RouterOutlet, RouterLink } from '@angular/router';
import { NgStyle } from '@angular/common';

@Component({
    selector: 'ng-dynamic-forms-app-root',
    templateUrl: './app.component.html',
    standalone: true,
    changeDetection: ChangeDetectionStrategy.Eager,
    imports: [RouterOutlet, RouterLink, NgStyle]
})
export class AppComponent {
    private router = inject(Router);

    routeData: any = {};
    url: string;

    constructor() {
        this.router.events.subscribe(event => {
            if (event instanceof NavigationEnd) {
                if (this.url !== '/' && this.url !== event.url) {
                    location.reload(); // reload to avoid CSS side effects // DON'T DO this in production !!!

                } else {
                    this.routeData = this.router.routerState.snapshot.root.firstChild?.data;
                    this.url = event.urlAfterRedirects;
                }
            }
        });

        this.url = this.router.url;
    }
}
