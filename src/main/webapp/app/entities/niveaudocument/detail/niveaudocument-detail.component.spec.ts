import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter, withComponentInputBinding } from '@angular/router';
import { RouterTestingHarness } from '@angular/router/testing';
import { of } from 'rxjs';

import { NiveaudocumentDetailComponent } from './niveaudocument-detail.component';

describe('Niveaudocument Management Detail Component', () => {
  let comp: NiveaudocumentDetailComponent;
  let fixture: ComponentFixture<NiveaudocumentDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NiveaudocumentDetailComponent],
      providers: [
        provideRouter(
          [
            {
              path: '**',
              loadComponent: () => import('./niveaudocument-detail.component').then(m => m.NiveaudocumentDetailComponent),
              resolve: { niveaudocument: () => of({ id: 21993 }) },
            },
          ],
          withComponentInputBinding(),
        ),
      ],
    })
      .overrideTemplate(NiveaudocumentDetailComponent, '')
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NiveaudocumentDetailComponent);
    comp = fixture.componentInstance;
  });

  describe('OnInit', () => {
    it('should load niveaudocument on init', async () => {
      const harness = await RouterTestingHarness.create();
      const instance = await harness.navigateByUrl('/', NiveaudocumentDetailComponent);

      // THEN
      expect(instance.niveaudocument()).toEqual(expect.objectContaining({ id: 21993 }));
    });
  });

  describe('PreviousState', () => {
    it('should navigate to previous state', () => {
      jest.spyOn(window.history, 'back');
      comp.previousState();
      expect(window.history.back).toHaveBeenCalled();
    });
  });
});
