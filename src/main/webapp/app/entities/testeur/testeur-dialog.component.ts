import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Response } from '@angular/http';

import { Observable } from 'rxjs/Rx';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { Testeur } from './testeur.model';
import { TesteurPopupService } from './testeur-popup.service';
import { TesteurService } from './testeur.service';
import { TypeTest, TypeTestService } from '../type-test';
import { Campagne, CampagneService } from '../campagne';
import { ResponseWrapper } from '../../shared';

@Component({
    selector: 'jhi-testeur-dialog',
    templateUrl: './testeur-dialog.component.html'
})
export class TesteurDialogComponent implements OnInit {

    testeur: Testeur;
    isSaving: boolean;

    typetests: TypeTest[];

    campagnes: Campagne[];

    constructor(
        public activeModal: NgbActiveModal,
        private jhiAlertService: JhiAlertService,
        private testeurService: TesteurService,
        private typeTestService: TypeTestService,
        private campagneService: CampagneService,
        private eventManager: JhiEventManager
    ) {
    }

    ngOnInit() {
        this.isSaving = false;
        this.typeTestService.query()
            .subscribe((res: ResponseWrapper) => { this.typetests = res.json; }, (res: ResponseWrapper) => this.onError(res.json));
        this.campagneService.query()
            .subscribe((res: ResponseWrapper) => { this.campagnes = res.json; }, (res: ResponseWrapper) => this.onError(res.json));
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
            this.onSaveSuccess(res), (res: Response) => this.onSaveError());
    }

    private onSaveSuccess(result: Testeur) {
        this.eventManager.broadcast({ name: 'testeurListModification', content: 'OK'});
        this.isSaving = false;
        this.activeModal.dismiss(result);
    }

    private onSaveError() {
        this.isSaving = false;
    }

    private onError(error: any) {
        this.jhiAlertService.error(error.message, null, null);
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

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private testeurPopupService: TesteurPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.testeurPopupService
                    .open(TesteurDialogComponent as Component, params['id']);
            } else {
                this.testeurPopupService
                    .open(TesteurDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
