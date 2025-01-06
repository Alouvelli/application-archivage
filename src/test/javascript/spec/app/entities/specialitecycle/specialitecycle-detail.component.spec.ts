/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { GestionEcoleTestModule } from '../../../test.module';
import { SpecialitecycleDetailComponent } from 'app/entities/specialitecycle/specialitecycle-detail.component';
import { Specialitecycle } from 'app/shared/model/specialitecycle.model';

describe('Component Tests', () => {
    describe('Specialitecycle Management Detail Component', () => {
        let comp: SpecialitecycleDetailComponent;
        let fixture: ComponentFixture<SpecialitecycleDetailComponent>;
        const route = ({ data: of({ specialitecycle: new Specialitecycle(123) }) } as any) as ActivatedRoute;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [GestionEcoleTestModule],
                declarations: [SpecialitecycleDetailComponent],
                providers: [{ provide: ActivatedRoute, useValue: route }]
            })
                .overrideTemplate(SpecialitecycleDetailComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(SpecialitecycleDetailComponent);
            comp = fixture.componentInstance;
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(comp.specialitecycle).toEqual(jasmine.objectContaining({ id: 123 }));
            });
        });
    });
});
