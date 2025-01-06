/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { GestionEcoleTestModule } from '../../../test.module';
import { EquipementsalleDetailComponent } from 'app/entities/equipementsalle/equipementsalle-detail.component';
import { Equipementsalle } from 'app/shared/model/equipementsalle.model';

describe('Component Tests', () => {
    describe('Equipementsalle Management Detail Component', () => {
        let comp: EquipementsalleDetailComponent;
        let fixture: ComponentFixture<EquipementsalleDetailComponent>;
        const route = ({ data: of({ equipementsalle: new Equipementsalle(123) }) } as any) as ActivatedRoute;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [GestionEcoleTestModule],
                declarations: [EquipementsalleDetailComponent],
                providers: [{ provide: ActivatedRoute, useValue: route }]
            })
                .overrideTemplate(EquipementsalleDetailComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(EquipementsalleDetailComponent);
            comp = fixture.componentInstance;
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(comp.equipementsalle).toEqual(jasmine.objectContaining({ id: 123 }));
            });
        });
    });
});
