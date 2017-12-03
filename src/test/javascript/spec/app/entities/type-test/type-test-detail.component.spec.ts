/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { DatePipe } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/Rx';
import { JhiDateUtils, JhiDataUtils, JhiEventManager } from 'ng-jhipster';
import { QualiToastTestModule } from '../../../test.module';
import { MockActivatedRoute } from '../../../helpers/mock-route.service';
import { TypeTestDetailComponent } from '../../../../../../main/webapp/app/entities/type-test/type-test-detail.component';
import { TypeTestService } from '../../../../../../main/webapp/app/entities/type-test/type-test.service';
import { TypeTest } from '../../../../../../main/webapp/app/entities/type-test/type-test.model';

describe('Component Tests', () => {

    describe('TypeTest Management Detail Component', () => {
        let comp: TypeTestDetailComponent;
        let fixture: ComponentFixture<TypeTestDetailComponent>;
        let service: TypeTestService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [QualiToastTestModule],
                declarations: [TypeTestDetailComponent],
                providers: [
                    JhiDateUtils,
                    JhiDataUtils,
                    DatePipe,
                    {
                        provide: ActivatedRoute,
                        useValue: new MockActivatedRoute({id: 123})
                    },
                    TypeTestService,
                    JhiEventManager
                ]
            }).overrideTemplate(TypeTestDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(TypeTestDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(TypeTestService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
            // GIVEN

            spyOn(service, 'find').and.returnValue(Observable.of(new TypeTest(10)));

            // WHEN
            comp.ngOnInit();

            // THEN
            expect(service.find).toHaveBeenCalledWith(123);
            expect(comp.typeTest).toEqual(jasmine.objectContaining({id: 10}));
            });
        });
    });

});
