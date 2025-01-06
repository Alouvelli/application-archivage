/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';

import { GestionEcoleTestModule } from '../../../test.module';
import { SerieUpdateComponent } from 'app/entities/serie/serie-update.component';
import { SerieService } from 'app/entities/serie/serie.service';
import { Serie } from 'app/shared/model/serie.model';

describe('Component Tests', () => {
    describe('Serie Management Update Component', () => {
        let comp: SerieUpdateComponent;
        let fixture: ComponentFixture<SerieUpdateComponent>;
        let service: SerieService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [GestionEcoleTestModule],
                declarations: [SerieUpdateComponent]
            })
                .overrideTemplate(SerieUpdateComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(SerieUpdateComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(SerieService);
        });

        describe('save', () => {
            it(
                'Should call update service on save for existing entity',
                fakeAsync(() => {
                    // GIVEN
                    const entity = new Serie(123);
                    spyOn(service, 'update').and.returnValue(of(new HttpResponse({ body: entity })));
                    comp.serie = entity;
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
                    const entity = new Serie();
                    spyOn(service, 'create').and.returnValue(of(new HttpResponse({ body: entity })));
                    comp.serie = entity;
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
