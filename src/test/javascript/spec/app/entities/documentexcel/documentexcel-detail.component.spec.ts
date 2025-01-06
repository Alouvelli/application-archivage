/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { GestionEcoleTestModule } from '../../../test.module';
import { DocumentexcelDetailComponent } from 'app/entities/documentexcel/documentexcel-detail.component';
import { Documentexcel } from 'app/shared/model/documentexcel.model';

describe('Component Tests', () => {
    describe('Documentexcel Management Detail Component', () => {
        let comp: DocumentexcelDetailComponent;
        let fixture: ComponentFixture<DocumentexcelDetailComponent>;
        const route = ({ data: of({ documentexcel: new Documentexcel(123) }) } as any) as ActivatedRoute;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [GestionEcoleTestModule],
                declarations: [DocumentexcelDetailComponent],
                providers: [{ provide: ActivatedRoute, useValue: route }]
            })
                .overrideTemplate(DocumentexcelDetailComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(DocumentexcelDetailComponent);
            comp = fixture.componentInstance;
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(comp.documentexcel).toEqual(jasmine.objectContaining({ id: 123 }));
            });
        });
    });
});
