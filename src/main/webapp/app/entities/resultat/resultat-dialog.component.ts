import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Response } from '@angular/http';

import { Observable } from 'rxjs/Rx';
import { NgbActiveModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { Resultat } from './resultat.model';
import { ResultatPopupService } from './resultat-popup.service';
import { ResultatService } from './resultat.service';

@Component({
    selector: 'jhi-resultat-dialog',
    templateUrl: './resultat-dialog.component.html'
})
export class ResultatDialogComponent implements OnInit {

    resultat: Resultat;
    isSaving: boolean;

    constructor(
        public activeModal: NgbActiveModal,
        private alertService: JhiAlertService,
        private resultatService: ResultatService,
        private eventManager: JhiEventManager
    ) {
    }

    ngOnInit() {
        this.isSaving = false;
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    save() {
        this.isSaving = true;
        if (this.resultat.id !== undefined) {
            this.subscribeToSaveResponse(
                this.resultatService.update(this.resultat));
        } else {
            this.subscribeToSaveResponse(
                this.resultatService.create(this.resultat));
        }
    }

    private subscribeToSaveResponse(result: Observable<Resultat>) {
        result.subscribe((res: Resultat) =>
            this.onSaveSuccess(res), (res: Response) => this.onSaveError(res));
    }

    private onSaveSuccess(result: Resultat) {
        this.eventManager.broadcast({ name: 'resultatListModification', content: 'OK'});
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
}

@Component({
    selector: 'jhi-resultat-popup',
    template: ''
})
export class ResultatPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private resultatPopupService: ResultatPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.resultatPopupService
                    .open(ResultatDialogComponent as Component, params['id']);
            } else {
                this.resultatPopupService
                    .open(ResultatDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
