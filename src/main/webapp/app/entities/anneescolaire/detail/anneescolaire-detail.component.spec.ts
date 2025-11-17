import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter, withComponentInputBinding } from '@angular/router';
import { RouterTestingHarness } from '@angular/router/testing';
import { of } from 'rxjs';

import { AnneescolaireDetailComponent } from './anneescolaire-detail.component';

describe('Anneescolaire Management Detail Component', () => {
  let comp: AnneescolaireDetailComponent;
  let fixture: ComponentFixture<AnneescolaireDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AnneescolaireDetailComponent],
      providers: [
        provideRouter(
          [
            {
              path: '**',
              loadComponent: () => import('./anneescolaire-detail.component').then(m => m.AnneescolaireDetailComponent),
              resolve: { anneescolaire: () => of({ id: 3716 }) },
            },
          ],
          withComponentInputBinding(),
        ),
      ],
    })
      .overrideTemplate(AnneescolaireDetailComponent, '')
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AnneescolaireDetailComponent);
    comp = fixture.componentInstance;
  });

  describe('OnInit', () => {
    it('should load anneescolaire on init', async () => {
      const harness = await RouterTestingHarness.create();
      const instance = await harness.navigateByUrl('/', AnneescolaireDetailComponent);

      // THEN
      expect(instance.anneescolaire()).toEqual(expect.objectContaining({ id: 3716 }));
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
