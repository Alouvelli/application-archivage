import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
    selector: 'jhi-error',
    templateUrl: './error.component.html'
})
export class ErrorComponent implements OnInit {
    errorMessage = '';
    error403 = false;
    error404 = false;

    constructor(private route: ActivatedRoute) {}

    ngOnInit() {
        this.route.data.subscribe(routeData => {
            if (routeData.error403) {
                this.error403 = routeData.error403;
            }
            if (routeData.error404) {
                this.error404 = routeData.error404;
            }
            if (routeData.errorMessage) {
                this.errorMessage = routeData.errorMessage;
            }
        });
    }
}
