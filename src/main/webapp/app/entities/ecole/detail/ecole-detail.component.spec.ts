import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter, withComponentInputBinding } from '@angular/router';
import { RouterTestingHarness } from '@angular/router/testing';
import { of } from 'rxjs';

import { EcoleDetailComponent } from './ecole-detail.component';

describe('Ecole Management Detail Component', () => {
  let comp: EcoleDetailComponent;
  let fixture: ComponentFixture<EcoleDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EcoleDetailComponent],
      providers: [
        provideRouter(
          [
            {
              path: '**',
              loadComponent: () => import('./ecole-detail.component').then(m => m.EcoleDetailComponent),
              resolve: { ecole: () => of({ id: 29955 }) },
            },
          ],
          withComponentInputBinding(),
        ),
      ],
    })
      .overrideTemplate(EcoleDetailComponent, '')
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EcoleDetailComponent);
    comp = fixture.componentInstance;
  });

  describe('OnInit', () => {
    it('should load ecole on init', async () => {
      const harness = await RouterTestingHarness.create();
      const instance = await harness.navigateByUrl('/', EcoleDetailComponent);

      // THEN
      expect(instance.ecole()).toEqual(expect.objectContaining({ id: 29955 }));
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
