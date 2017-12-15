import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { QualiToastSharedModule } from '../../shared';
import {
    CampagneService,
    CampagnePopupService,
    CampagneComponent,
    CampagneDetailComponent,
    CampagneDialogComponent,
    CampagnePopupComponent,
    CampagneDeletePopupComponent,
    CampagneDeleteDialogComponent,
    campagneRoute,
    campagnePopupRoute,
    CampagneResolvePagingParams,
} from './';

const ENTITY_STATES = [
    ...campagneRoute,
    ...campagnePopupRoute,
];

@NgModule({
    imports: [
        QualiToastSharedModule,
        RouterModule.forChild(ENTITY_STATES)
    ],
    declarations: [
        CampagneComponent,
        CampagneDetailComponent,
        CampagneDialogComponent,
        CampagneDeleteDialogComponent,
        CampagnePopupComponent,
        CampagneDeletePopupComponent,
    ],
    entryComponents: [
        CampagneComponent,
        CampagneDialogComponent,
        CampagnePopupComponent,
        CampagneDeleteDialogComponent,
        CampagneDeletePopupComponent,
    ],
    providers: [
        CampagneService,
        CampagnePopupService,
        CampagneResolvePagingParams,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class QualiToastCampagneModule {}
