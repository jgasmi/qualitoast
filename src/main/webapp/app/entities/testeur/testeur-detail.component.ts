import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Rx';
import { EventManager , JhiLanguageService  } from 'ng-jhipster';

import { Testeur } from './testeur.model';
import { TesteurService } from './testeur.service';

@Component({
    selector: 'jhi-testeur-detail',
    templateUrl: './testeur-detail.component.html'
})
export class TesteurDetailComponent implements OnInit, OnDestroy {

    testeur: Testeur;
    private subscription: any;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: EventManager,
        private jhiLanguageService: JhiLanguageService,
        private testeurService: TesteurService,
        private route: ActivatedRoute
    ) {
        this.jhiLanguageService.setLocations(['testeur']);
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInTesteurs();
    }

    load(id) {
        this.testeurService.find(id).subscribe((testeur) => {
            this.testeur = testeur;
        });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInTesteurs() {
        this.eventSubscriber = this.eventManager.subscribe(
            'testeurListModification',
            (response) => this.load(this.testeur.id)
        );
    }
}
