import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Rx';
import { EventManager , JhiLanguageService  } from 'ng-jhipster';

import { Application } from './application.model';
import { ApplicationService } from './application.service';

@Component({
    selector: 'jhi-application-detail',
    templateUrl: './application-detail.component.html'
})
export class ApplicationDetailComponent implements OnInit, OnDestroy {

    application: Application;
    private subscription: any;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: EventManager,
        private jhiLanguageService: JhiLanguageService,
        private applicationService: ApplicationService,
        private route: ActivatedRoute
    ) {
        this.jhiLanguageService.setLocations(['application']);
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInApplications();
    }

    load(id) {
        this.applicationService.find(id).subscribe((application) => {
            this.application = application;
        });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInApplications() {
        this.eventSubscriber = this.eventManager.subscribe(
            'applicationListModification',
            (response) => this.load(this.application.id)
        );
    }
}
