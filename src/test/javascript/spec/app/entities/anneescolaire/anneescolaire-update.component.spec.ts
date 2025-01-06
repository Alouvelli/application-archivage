/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';

import { GestionEcoleTestModule } from '../../../test.module';
import { AnneescolaireUpdateComponent } from 'app/entities/anneescolaire/anneescolaire-update.component';
import { AnneescolaireService } from 'app/entities/anneescolaire/anneescolaire.service';
import { Anneescolaire } from 'app/shared/model/anneescolaire.model';

describe('Component Tests', () => {
    describe('Anneescolaire Management Update Component', () => {
        let comp: AnneescolaireUpdateComponent;
        let fixture: ComponentFixture<AnneescolaireUpdateComponent>;
        let service: AnneescolaireService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [GestionEcoleTestModule],
                declarations: [AnneescolaireUpdateComponent]
            })
                .overrideTemplate(AnneescolaireUpdateComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(AnneescolaireUpdateComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(AnneescolaireService);
        });

        describe('save', () => {
            it(
                'Should call update service on save for existing entity',
                fakeAsync(() => {
                    // GIVEN
                    const entity = new Anneescolaire(123);
                    spyOn(service, 'update').and.returnValue(of(new HttpResponse({ body: entity })));
                    comp.anneescolaire = entity;
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
                    const entity = new Anneescolaire();
                    spyOn(service, 'create').and.returnValue(of(new HttpResponse({ body: entity })));
                    comp.anneescolaire = entity;
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
