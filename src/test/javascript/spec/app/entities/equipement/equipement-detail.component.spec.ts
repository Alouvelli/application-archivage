/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { GestionEcoleTestModule } from '../../../test.module';
import { EquipementDetailComponent } from 'app/entities/equipement/equipement-detail.component';
import { Equipement } from 'app/shared/model/equipement.model';

describe('Component Tests', () => {
    describe('Equipement Management Detail Component', () => {
        let comp: EquipementDetailComponent;
        let fixture: ComponentFixture<EquipementDetailComponent>;
        const route = ({ data: of({ equipement: new Equipement(123) }) } as any) as ActivatedRoute;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [GestionEcoleTestModule],
                declarations: [EquipementDetailComponent],
                providers: [{ provide: ActivatedRoute, useValue: route }]
            })
                .overrideTemplate(EquipementDetailComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(EquipementDetailComponent);
            comp = fixture.componentInstance;
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(comp.equipement).toEqual(jasmine.objectContaining({ id: 123 }));
            });
        });
    });
});
