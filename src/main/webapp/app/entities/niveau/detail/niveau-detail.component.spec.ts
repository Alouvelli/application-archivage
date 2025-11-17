import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter, withComponentInputBinding } from '@angular/router';
import { RouterTestingHarness } from '@angular/router/testing';
import { of } from 'rxjs';

import { NiveauDetailComponent } from './niveau-detail.component';

describe('Niveau Management Detail Component', () => {
  let comp: NiveauDetailComponent;
  let fixture: ComponentFixture<NiveauDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NiveauDetailComponent],
      providers: [
        provideRouter(
          [
            {
              path: '**',
              loadComponent: () => import('./niveau-detail.component').then(m => m.NiveauDetailComponent),
              resolve: { niveau: () => of({ id: 17269 }) },
            },
          ],
          withComponentInputBinding(),
        ),
      ],
    })
      .overrideTemplate(NiveauDetailComponent, '')
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NiveauDetailComponent);
    comp = fixture.componentInstance;
  });

  describe('OnInit', () => {
    it('should load niveau on init', async () => {
      const harness = await RouterTestingHarness.create();
      const instance = await harness.navigateByUrl('/', NiveauDetailComponent);

      // THEN
      expect(instance.niveau()).toEqual(expect.objectContaining({ id: 17269 }));
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
