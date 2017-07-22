import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { TypeTest } from './type-test.model';
import { TypeTestPopupService } from './type-test-popup.service';
import { TypeTestService } from './type-test.service';

@Component({
    selector: 'jhi-type-test-delete-dialog',
    templateUrl: './type-test-delete-dialog.component.html'
})
export class TypeTestDeleteDialogComponent {

    typeTest: TypeTest;

    constructor(
        private typeTestService: TypeTestService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.typeTestService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'typeTestListModification',
                content: 'Deleted an typeTest'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-type-test-delete-popup',
    template: ''
})
export class TypeTestDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private typeTestPopupService: TypeTestPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.typeTestPopupService
                .open(TypeTestDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
