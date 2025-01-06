/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { GestionEcoleTestModule } from '../../../test.module';
import { DocumentclasseDetailComponent } from 'app/entities/documentclasse/documentclasse-detail.component';
import { Documentclasse } from 'app/shared/model/documentclasse.model';

describe('Component Tests', () => {
    describe('Documentclasse Management Detail Component', () => {
        let comp: DocumentclasseDetailComponent;
        let fixture: ComponentFixture<DocumentclasseDetailComponent>;
        const route = ({ data: of({ documentclasse: new Documentclasse(123) }) } as any) as ActivatedRoute;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [GestionEcoleTestModule],
                declarations: [DocumentclasseDetailComponent],
                providers: [{ provide: ActivatedRoute, useValue: route }]
            })
                .overrideTemplate(DocumentclasseDetailComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(DocumentclasseDetailComponent);
            comp = fixture.componentInstance;
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(comp.documentclasse).toEqual(jasmine.objectContaining({ id: 123 }));
            });
        });
    });
});
