import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter, withComponentInputBinding } from '@angular/router';
import { RouterTestingHarness } from '@angular/router/testing';
import { of } from 'rxjs';

import { RubriqueProfilDetailComponent } from './rubrique-profil-detail.component';

describe('RubriqueProfil Management Detail Component', () => {
  let comp: RubriqueProfilDetailComponent;
  let fixture: ComponentFixture<RubriqueProfilDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RubriqueProfilDetailComponent],
      providers: [
        provideRouter(
          [
            {
              path: '**',
              loadComponent: () => import('./rubrique-profil-detail.component').then(m => m.RubriqueProfilDetailComponent),
              resolve: { rubriqueProfil: () => of({ id: 1884 }) },
            },
          ],
          withComponentInputBinding(),
        ),
      ],
    })
      .overrideTemplate(RubriqueProfilDetailComponent, '')
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RubriqueProfilDetailComponent);
    comp = fixture.componentInstance;
  });

  describe('OnInit', () => {
    it('should load rubriqueProfil on init', async () => {
      const harness = await RouterTestingHarness.create();
      const instance = await harness.navigateByUrl('/', RubriqueProfilDetailComponent);

      // THEN
      expect(instance.rubriqueProfil()).toEqual(expect.objectContaining({ id: 1884 }));
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
