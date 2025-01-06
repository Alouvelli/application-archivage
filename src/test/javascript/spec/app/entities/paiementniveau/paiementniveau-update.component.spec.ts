/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';

import { GestionEcoleTestModule } from '../../../test.module';
import { PaiementniveauUpdateComponent } from 'app/entities/paiementniveau/paiementniveau-update.component';
import { PaiementniveauService } from 'app/entities/paiementniveau/paiementniveau.service';
import { Paiementniveau } from 'app/shared/model/paiementniveau.model';

describe('Component Tests', () => {
    describe('Paiementniveau Management Update Component', () => {
        let comp: PaiementniveauUpdateComponent;
        let fixture: ComponentFixture<PaiementniveauUpdateComponent>;
        let service: PaiementniveauService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [GestionEcoleTestModule],
                declarations: [PaiementniveauUpdateComponent]
            })
                .overrideTemplate(PaiementniveauUpdateComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(PaiementniveauUpdateComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(PaiementniveauService);
        });

        describe('save', () => {
            it(
                'Should call update service on save for existing entity',
                fakeAsync(() => {
                    // GIVEN
                    const entity = new Paiementniveau(123);
                    spyOn(service, 'update').and.returnValue(of(new HttpResponse({ body: entity })));
                    comp.paiementniveau = entity;
                    // WHEN
                    comp.save();
                    tick(); // simulate async

                    // THEN
                    expect(service.update).toHaveBeenCalledWith(entity);
                    expect(comp.isSaving).toEqual(false);
                })
            );

            it(
                'Should call create service on save for new entity',
                fakeAsync(() => {
                    // GIVEN
                    const entity = new Paiementniveau();
                    spyOn(service, 'create').and.returnValue(of(new HttpResponse({ body: entity })));
                    comp.paiementniveau = entity;
                    // WHEN
                    comp.save();
                    tick(); // simulate async

                    // THEN
                    expect(service.create).toHaveBeenCalledWith(entity);
                    expect(comp.isSaving).toEqual(false);
                })
            );
        });
    });
});
