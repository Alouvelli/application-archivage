import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter, withComponentInputBinding } from '@angular/router';
import { RouterTestingHarness } from '@angular/router/testing';
import { of } from 'rxjs';

import { SiteProfilDetailComponent } from './site-profil-detail.component';

describe('SiteProfil Management Detail Component', () => {
  let comp: SiteProfilDetailComponent;
  let fixture: ComponentFixture<SiteProfilDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SiteProfilDetailComponent],
      providers: [
        provideRouter(
          [
            {
              path: '**',
              loadComponent: () => import('./site-profil-detail.component').then(m => m.SiteProfilDetailComponent),
              resolve: { siteProfil: () => of({ id: 25887 }) },
            },
          ],
          withComponentInputBinding(),
        ),
      ],
    })
      .overrideTemplate(SiteProfilDetailComponent, '')
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SiteProfilDetailComponent);
    comp = fixture.componentInstance;
  });

  describe('OnInit', () => {
    it('should load siteProfil on init', async () => {
      const harness = await RouterTestingHarness.create();
      const instance = await harness.navigateByUrl('/', SiteProfilDetailComponent);

      // THEN
      expect(instance.siteProfil()).toEqual(expect.objectContaining({ id: 25887 }));
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
