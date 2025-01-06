/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { GestionEcoleTestModule } from '../../../test.module';
import { TypeDocumentDetailComponent } from 'app/entities/type-document/type-document-detail.component';
import { TypeDocument } from 'app/shared/model/type-document.model';

describe('Component Tests', () => {
    describe('TypeDocument Management Detail Component', () => {
        let comp: TypeDocumentDetailComponent;
        let fixture: ComponentFixture<TypeDocumentDetailComponent>;
        const route = ({ data: of({ typeDocument: new TypeDocument(123) }) } as any) as ActivatedRoute;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [GestionEcoleTestModule],
                declarations: [TypeDocumentDetailComponent],
                providers: [{ provide: ActivatedRoute, useValue: route }]
            })
                .overrideTemplate(TypeDocumentDetailComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(TypeDocumentDetailComponent);
            comp = fixture.componentInstance;
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(comp.typeDocument).toEqual(jasmine.objectContaining({ id: 123 }));
            });
        });
    });
});
