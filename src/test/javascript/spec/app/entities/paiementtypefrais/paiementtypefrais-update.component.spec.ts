/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';

import { GestionEcoleTestModule } from '../../../test.module';
import { PaiementtypefraisUpdateComponent } from 'app/entities/paiementtypefrais/paiementtypefrais-update.component';
import { PaiementtypefraisService } from 'app/entities/paiementtypefrais/paiementtypefrais.service';
import { Paiementtypefrais } from 'app/shared/model/paiementtypefrais.model';

describe('Component Tests', () => {
    describe('Paiementtypefrais Management Update Component', () => {
        let comp: PaiementtypefraisUpdateComponent;
        let fixture: ComponentFixture<PaiementtypefraisUpdateComponent>;
        let service: PaiementtypefraisService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [GestionEcoleTestModule],
                declarations: [PaiementtypefraisUpdateComponent]
            })
                .overrideTemplate(PaiementtypefraisUpdateComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(PaiementtypefraisUpdateComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(PaiementtypefraisService);
        });

        describe('save', () => {
            it(
                'Should call update service on save for existing entity',
                fakeAsync(() => {
                    // GIVEN
                    const entity = new Paiementtypefrais(123);
                    spyOn(service, 'update').and.returnValue(of(new HttpResponse({ body: entity })));
                    comp.paiementtypefrais = entity;
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
                    const entity = new Paiementtypefrais();
                    spyOn(service, 'create').and.returnValue(of(new HttpResponse({ body: entity })));
                    comp.paiementtypefrais = entity;
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
