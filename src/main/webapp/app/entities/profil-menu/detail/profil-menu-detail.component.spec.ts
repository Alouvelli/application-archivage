import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter, withComponentInputBinding } from '@angular/router';
import { RouterTestingHarness } from '@angular/router/testing';
import { of } from 'rxjs';

import { ProfilMenuDetailComponent } from './profil-menu-detail.component';

describe('ProfilMenu Management Detail Component', () => {
  let comp: ProfilMenuDetailComponent;
  let fixture: ComponentFixture<ProfilMenuDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProfilMenuDetailComponent],
      providers: [
        provideRouter(
          [
            {
              path: '**',
              loadComponent: () => import('./profil-menu-detail.component').then(m => m.ProfilMenuDetailComponent),
              resolve: { profilMenu: () => of({ id: 18039 }) },
            },
          ],
          withComponentInputBinding(),
        ),
      ],
    })
      .overrideTemplate(ProfilMenuDetailComponent, '')
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProfilMenuDetailComponent);
    comp = fixture.componentInstance;
  });

  describe('OnInit', () => {
    it('should load profilMenu on init', async () => {
      const harness = await RouterTestingHarness.create();
      const instance = await harness.navigateByUrl('/', ProfilMenuDetailComponent);

      // THEN
      expect(instance.profilMenu()).toEqual(expect.objectContaining({ id: 18039 }));
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
