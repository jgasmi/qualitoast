import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Response } from '@angular/http';

import { Observable } from 'rxjs/Rx';
import { NgbActiveModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { EventManager, AlertService } from 'ng-jhipster';

import { Testeur } from './testeur.model';
import { TesteurPopupService } from './testeur-popup.service';
import { TesteurService } from './testeur.service';
import { TypeTest, TypeTestService } from '../type-test';
import { Campagne, CampagneService } from '../campagne';

@Component({
    selector: 'jhi-testeur-dialog',
    templateUrl: './testeur-dialog.component.html'
})
export class TesteurDialogComponent implements OnInit {

    testeur: Testeur;
    authorities: any[];
    isSaving: boolean;

    typetests: TypeTest[];

    campagnes: Campagne[];

    constructor(
        public activeModal: NgbActiveModal,
        private alertService: AlertService,
        private testeurService: TesteurService,
        private typeTestService: TypeTestService,
        private campagneService: CampagneService,
        private eventManager: EventManager
    ) {
    }

    ngOnInit() {
        this.isSaving = false;
        this.authorities = ['ROLE_USER', 'ROLE_ADMIN'];
        this.typeTestService.query().subscribe(
            (res: Response) => { this.typetests = res.json(); }, (res: Response) => this.onError(res.json()));
        this.campagneService.query().subscribe(
            (res: Response) => { this.campagnes = res.json(); }, (res: Response) => this.onError(res.json()));
    }
    clear() {
        this.activeModal.dismiss('cancel');
    }

    save() {
        this.isSaving = true;
        if (this.testeur.id !== undefined) {
            this.subscribeToSaveResponse(
                this.testeurService.update(this.testeur));
        } else {
            this.subscribeToSaveResponse(
                this.testeurService.create(this.testeur));
        }
    }

    private subscribeToSaveResponse(result: Observable<Testeur>) {
        result.subscribe((res: Testeur) =>
            this.onSaveSuccess(res), (res: Response) => this.onSaveError(res));
    }

    private onSaveSuccess(result: Testeur) {
        this.eventManager.broadcast({ name: 'testeurListModification', content: 'OK'});
        this.isSaving = false;
        this.activeModal.dismiss(result);
    }

    private onSaveError(error) {
        try {
            error.json();
        } catch (exception) {
            error.message = error.text();
        }
        this.isSaving = false;
        this.onError(error);
    }

    private onError(error) {
        this.alertService.error(error.message, null, null);
    }

    trackTypeTestById(index: number, item: TypeTest) {
        return item.id;
    }

    trackCampagneById(index: number, item: Campagne) {
        return item.id;
    }

    getSelected(selectedVals: Array<any>, option: any) {
        if (selectedVals) {
            for (let i = 0; i < selectedVals.length; i++) {
                if (option.id === selectedVals[i].id) {
                    return selectedVals[i];
                }
            }
        }
        return option;
    }
}

@Component({
    selector: 'jhi-testeur-popup',
    template: ''
})
export class TesteurPopupComponent implements OnInit, OnDestroy {

    modalRef: NgbModalRef;
    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private testeurPopupService: TesteurPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.modalRef = this.testeurPopupService
                    .open(TesteurDialogComponent, params['id']);
            } else {
                this.modalRef = this.testeurPopupService
                    .open(TesteurDialogComponent);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
