import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter, withComponentInputBinding } from '@angular/router';
import { RouterTestingHarness } from '@angular/router/testing';
import { of } from 'rxjs';

import { SemestreDetailComponent } from './semestre-detail.component';

describe('Semestre Management Detail Component', () => {
  let comp: SemestreDetailComponent;
  let fixture: ComponentFixture<SemestreDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SemestreDetailComponent],
      providers: [
        provideRouter(
          [
            {
              path: '**',
              loadComponent: () => import('./semestre-detail.component').then(m => m.SemestreDetailComponent),
              resolve: { semestre: () => of({ id: 22194 }) },
            },
          ],
          withComponentInputBinding(),
        ),
      ],
    })
      .overrideTemplate(SemestreDetailComponent, '')
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SemestreDetailComponent);
    comp = fixture.componentInstance;
  });

  describe('OnInit', () => {
    it('should load semestre on init', async () => {
      const harness = await RouterTestingHarness.create();
      const instance = await harness.navigateByUrl('/', SemestreDetailComponent);

      // THEN
      expect(instance.semestre()).toEqual(expect.objectContaining({ id: 22194 }));
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
