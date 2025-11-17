import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpResponse, provideHttpClient } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Subject, from, of } from 'rxjs';

import { IUser } from 'app/entities/user/user.model';
import { UserService } from 'app/entities/user/service/user.service';
import { IProfil } from 'app/entities/profil/profil.model';
import { ProfilService } from 'app/entities/profil/service/profil.service';
import { IEmploye } from '../employe.model';
import { EmployeService } from '../service/employe.service';
import { EmployeFormService } from './employe-form.service';

import { EmployeUpdateComponent } from './employe-update.component';

describe('Employe Management Update Component', () => {
  let comp: EmployeUpdateComponent;
  let fixture: ComponentFixture<EmployeUpdateComponent>;
  let activatedRoute: ActivatedRoute;
  let employeFormService: EmployeFormService;
  let employeService: EmployeService;
  let userService: UserService;
  let profilService: ProfilService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [EmployeUpdateComponent],
      providers: [
        provideHttpClient(),
        FormBuilder,
        {
          provide: ActivatedRoute,
          useValue: {
            params: from([{}]),
          },
        },
      ],
    })
      .overrideTemplate(EmployeUpdateComponent, '')
      .compileComponents();

    fixture = TestBed.createComponent(EmployeUpdateComponent);
    activatedRoute = TestBed.inject(ActivatedRoute);
    employeFormService = TestBed.inject(EmployeFormService);
    employeService = TestBed.inject(EmployeService);
    userService = TestBed.inject(UserService);
    profilService = TestBed.inject(ProfilService);

    comp = fixture.componentInstance;
  });

  describe('ngOnInit', () => {
    it('should call User query and add missing value', () => {
      const employe: IEmploye = { id: 22213 };
      const user: IUser = { id: 3944 };
      employe.user = user;

      const userCollection: IUser[] = [{ id: 3944 }];
      jest.spyOn(userService, 'query').mockReturnValue(of(new HttpResponse({ body: userCollection })));
      const additionalUsers = [user];
      const expectedCollection: IUser[] = [...additionalUsers, ...userCollection];
      jest.spyOn(userService, 'addUserToCollectionIfMissing').mockReturnValue(expectedCollection);

      activatedRoute.data = of({ employe });
      comp.ngOnInit();

      expect(userService.query).toHaveBeenCalled();
      expect(userService.addUserToCollectionIfMissing).toHaveBeenCalledWith(
        userCollection,
        ...additionalUsers.map(expect.objectContaining),
      );
      expect(comp.usersSharedCollection).toEqual(expectedCollection);
    });

    it('should call Profil query and add missing value', () => {
      const employe: IEmploye = { id: 22213 };
      const profil: IProfil = { id: 12279 };
      employe.profil = profil;

      const profilCollection: IProfil[] = [{ id: 12279 }];
      jest.spyOn(profilService, 'query').mockReturnValue(of(new HttpResponse({ body: profilCollection })));
      const additionalProfils = [profil];
      const expectedCollection: IProfil[] = [...additionalProfils, ...profilCollection];
      jest.spyOn(profilService, 'addProfilToCollectionIfMissing').mockReturnValue(expectedCollection);

      activatedRoute.data = of({ employe });
      comp.ngOnInit();

      expect(profilService.query).toHaveBeenCalled();
      expect(profilService.addProfilToCollectionIfMissing).toHaveBeenCalledWith(
        profilCollection,
        ...additionalProfils.map(expect.objectContaining),
      );
      expect(comp.profilsSharedCollection).toEqual(expectedCollection);
    });

    it('should update editForm', () => {
      const employe: IEmploye = { id: 22213 };
      const user: IUser = { id: 3944 };
      employe.user = user;
      const profil: IProfil = { id: 12279 };
      employe.profil = profil;

      activatedRoute.data = of({ employe });
      comp.ngOnInit();

      expect(comp.usersSharedCollection).toContainEqual(user);
      expect(comp.profilsSharedCollection).toContainEqual(profil);
      expect(comp.employe).toEqual(employe);
    });
  });

  describe('save', () => {
    it('should call update service on save for existing entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IEmploye>>();
      const employe = { id: 10360 };
      jest.spyOn(employeFormService, 'getEmploye').mockReturnValue(employe);
      jest.spyOn(employeService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ employe });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: employe }));
      saveSubject.complete();

      // THEN
      expect(employeFormService.getEmploye).toHaveBeenCalled();
      expect(comp.previousState).toHaveBeenCalled();
      expect(employeService.update).toHaveBeenCalledWith(expect.objectContaining(employe));
      expect(comp.isSaving).toEqual(false);
    });

    it('should call create service on save for new entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IEmploye>>();
      const employe = { id: 10360 };
      jest.spyOn(employeFormService, 'getEmploye').mockReturnValue({ id: null });
      jest.spyOn(employeService, 'create').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ employe: null });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: employe }));
      saveSubject.complete();

      // THEN
      expect(employeFormService.getEmploye).toHaveBeenCalled();
      expect(employeService.create).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).toHaveBeenCalled();
    });

    it('should set isSaving to false on error', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IEmploye>>();
      const employe = { id: 10360 };
      jest.spyOn(employeService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ employe });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.error('This is an error!');

      // THEN
      expect(employeService.update).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).not.toHaveBeenCalled();
    });
  });

  describe('Compare relationships', () => {
    describe('compareUser', () => {
      it('should forward to userService', () => {
        const entity = { id: 3944 };
        const entity2 = { id: 6275 };
        jest.spyOn(userService, 'compareUser');
        comp.compareUser(entity, entity2);
        expect(userService.compareUser).toHaveBeenCalledWith(entity, entity2);
      });
    });

    describe('compareProfil', () => {
      it('should forward to profilService', () => {
        const entity = { id: 12279 };
        const entity2 = { id: 13621 };
        jest.spyOn(profilService, 'compareProfil');
        comp.compareProfil(entity, entity2);
        expect(profilService.compareProfil).toHaveBeenCalledWith(entity, entity2);
      });
    });
  });
});
