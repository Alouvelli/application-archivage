import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpResponse, provideHttpClient } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Subject, from, of } from 'rxjs';

import { IEtudiant } from 'app/entities/etudiant/etudiant.model';
import { EtudiantService } from 'app/entities/etudiant/service/etudiant.service';
import { IClasse } from 'app/entities/classe/classe.model';
import { ClasseService } from 'app/entities/classe/service/classe.service';
import { IAnneescolaire } from 'app/entities/anneescolaire/anneescolaire.model';
import { AnneescolaireService } from 'app/entities/anneescolaire/service/anneescolaire.service';
import { IDocument } from 'app/entities/document/document.model';
import { DocumentService } from 'app/entities/document/service/document.service';
import { IInscription } from '../inscription.model';
import { InscriptionService } from '../service/inscription.service';
import { InscriptionFormService } from './inscription-form.service';

import { InscriptionUpdateComponent } from './inscription-update.component';

describe('Inscription Management Update Component', () => {
  let comp: InscriptionUpdateComponent;
  let fixture: ComponentFixture<InscriptionUpdateComponent>;
  let activatedRoute: ActivatedRoute;
  let inscriptionFormService: InscriptionFormService;
  let inscriptionService: InscriptionService;
  let etudiantService: EtudiantService;
  let classeService: ClasseService;
  let anneescolaireService: AnneescolaireService;
  let documentService: DocumentService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [InscriptionUpdateComponent],
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
      .overrideTemplate(InscriptionUpdateComponent, '')
      .compileComponents();

    fixture = TestBed.createComponent(InscriptionUpdateComponent);
    activatedRoute = TestBed.inject(ActivatedRoute);
    inscriptionFormService = TestBed.inject(InscriptionFormService);
    inscriptionService = TestBed.inject(InscriptionService);
    etudiantService = TestBed.inject(EtudiantService);
    classeService = TestBed.inject(ClasseService);
    anneescolaireService = TestBed.inject(AnneescolaireService);
    documentService = TestBed.inject(DocumentService);

    comp = fixture.componentInstance;
  });

  describe('ngOnInit', () => {
    it('should call Etudiant query and add missing value', () => {
      const inscription: IInscription = { id: 30681 };
      const etudiant: IEtudiant = { id: 3396 };
      inscription.etudiant = etudiant;

      const etudiantCollection: IEtudiant[] = [{ id: 3396 }];
      jest.spyOn(etudiantService, 'query').mockReturnValue(of(new HttpResponse({ body: etudiantCollection })));
      const additionalEtudiants = [etudiant];
      const expectedCollection: IEtudiant[] = [...additionalEtudiants, ...etudiantCollection];
      jest.spyOn(etudiantService, 'addEtudiantToCollectionIfMissing').mockReturnValue(expectedCollection);

      activatedRoute.data = of({ inscription });
      comp.ngOnInit();

      expect(etudiantService.query).toHaveBeenCalled();
      expect(etudiantService.addEtudiantToCollectionIfMissing).toHaveBeenCalledWith(
        etudiantCollection,
        ...additionalEtudiants.map(expect.objectContaining),
      );
      expect(comp.etudiantsSharedCollection).toEqual(expectedCollection);
    });

    it('should call Classe query and add missing value', () => {
      const inscription: IInscription = { id: 30681 };
      const classe: IClasse = { id: 4563 };
      inscription.classe = classe;

      const classeCollection: IClasse[] = [{ id: 4563 }];
      jest.spyOn(classeService, 'query').mockReturnValue(of(new HttpResponse({ body: classeCollection })));
      const additionalClasses = [classe];
      const expectedCollection: IClasse[] = [...additionalClasses, ...classeCollection];
      jest.spyOn(classeService, 'addClasseToCollectionIfMissing').mockReturnValue(expectedCollection);

      activatedRoute.data = of({ inscription });
      comp.ngOnInit();

      expect(classeService.query).toHaveBeenCalled();
      expect(classeService.addClasseToCollectionIfMissing).toHaveBeenCalledWith(
        classeCollection,
        ...additionalClasses.map(expect.objectContaining),
      );
      expect(comp.classesSharedCollection).toEqual(expectedCollection);
    });

    it('should call Anneescolaire query and add missing value', () => {
      const inscription: IInscription = { id: 30681 };
      const anneescolaire: IAnneescolaire = { id: 3716 };
      inscription.anneescolaire = anneescolaire;

      const anneescolaireCollection: IAnneescolaire[] = [{ id: 3716 }];
      jest.spyOn(anneescolaireService, 'query').mockReturnValue(of(new HttpResponse({ body: anneescolaireCollection })));
      const additionalAnneescolaires = [anneescolaire];
      const expectedCollection: IAnneescolaire[] = [...additionalAnneescolaires, ...anneescolaireCollection];
      jest.spyOn(anneescolaireService, 'addAnneescolaireToCollectionIfMissing').mockReturnValue(expectedCollection);

      activatedRoute.data = of({ inscription });
      comp.ngOnInit();

      expect(anneescolaireService.query).toHaveBeenCalled();
      expect(anneescolaireService.addAnneescolaireToCollectionIfMissing).toHaveBeenCalledWith(
        anneescolaireCollection,
        ...additionalAnneescolaires.map(expect.objectContaining),
      );
      expect(comp.anneescolairesSharedCollection).toEqual(expectedCollection);
    });

    it('should call Document query and add missing value', () => {
      const inscription: IInscription = { id: 30681 };
      const documents: IDocument[] = [{ id: 24703 }];
      inscription.documents = documents;

      const documentCollection: IDocument[] = [{ id: 24703 }];
      jest.spyOn(documentService, 'query').mockReturnValue(of(new HttpResponse({ body: documentCollection })));
      const additionalDocuments = [...documents];
      const expectedCollection: IDocument[] = [...additionalDocuments, ...documentCollection];
      jest.spyOn(documentService, 'addDocumentToCollectionIfMissing').mockReturnValue(expectedCollection);

      activatedRoute.data = of({ inscription });
      comp.ngOnInit();

      expect(documentService.query).toHaveBeenCalled();
      expect(documentService.addDocumentToCollectionIfMissing).toHaveBeenCalledWith(
        documentCollection,
        ...additionalDocuments.map(expect.objectContaining),
      );
      expect(comp.documentsSharedCollection).toEqual(expectedCollection);
    });

    it('should update editForm', () => {
      const inscription: IInscription = { id: 30681 };
      const etudiant: IEtudiant = { id: 3396 };
      inscription.etudiant = etudiant;
      const classe: IClasse = { id: 4563 };
      inscription.classe = classe;
      const anneescolaire: IAnneescolaire = { id: 3716 };
      inscription.anneescolaire = anneescolaire;
      const document: IDocument = { id: 24703 };
      inscription.documents = [document];

      activatedRoute.data = of({ inscription });
      comp.ngOnInit();

      expect(comp.etudiantsSharedCollection).toContainEqual(etudiant);
      expect(comp.classesSharedCollection).toContainEqual(classe);
      expect(comp.anneescolairesSharedCollection).toContainEqual(anneescolaire);
      expect(comp.documentsSharedCollection).toContainEqual(document);
      expect(comp.inscription).toEqual(inscription);
    });
  });

  describe('save', () => {
    it('should call update service on save for existing entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IInscription>>();
      const inscription = { id: 22130 };
      jest.spyOn(inscriptionFormService, 'getInscription').mockReturnValue(inscription);
      jest.spyOn(inscriptionService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ inscription });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: inscription }));
      saveSubject.complete();

      // THEN
      expect(inscriptionFormService.getInscription).toHaveBeenCalled();
      expect(comp.previousState).toHaveBeenCalled();
      expect(inscriptionService.update).toHaveBeenCalledWith(expect.objectContaining(inscription));
      expect(comp.isSaving).toEqual(false);
    });

    it('should call create service on save for new entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IInscription>>();
      const inscription = { id: 22130 };
      jest.spyOn(inscriptionFormService, 'getInscription').mockReturnValue({ id: null });
      jest.spyOn(inscriptionService, 'create').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ inscription: null });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: inscription }));
      saveSubject.complete();

      // THEN
      expect(inscriptionFormService.getInscription).toHaveBeenCalled();
      expect(inscriptionService.create).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).toHaveBeenCalled();
    });

    it('should set isSaving to false on error', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IInscription>>();
      const inscription = { id: 22130 };
      jest.spyOn(inscriptionService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ inscription });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.error('This is an error!');

      // THEN
      expect(inscriptionService.update).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).not.toHaveBeenCalled();
    });
  });

  describe('Compare relationships', () => {
    describe('compareEtudiant', () => {
      it('should forward to etudiantService', () => {
        const entity = { id: 3396 };
        const entity2 = { id: 14632 };
        jest.spyOn(etudiantService, 'compareEtudiant');
        comp.compareEtudiant(entity, entity2);
        expect(etudiantService.compareEtudiant).toHaveBeenCalledWith(entity, entity2);
      });
    });

    describe('compareClasse', () => {
      it('should forward to classeService', () => {
        const entity = { id: 4563 };
        const entity2 = { id: 23082 };
        jest.spyOn(classeService, 'compareClasse');
        comp.compareClasse(entity, entity2);
        expect(classeService.compareClasse).toHaveBeenCalledWith(entity, entity2);
      });
    });

    describe('compareAnneescolaire', () => {
      it('should forward to anneescolaireService', () => {
        const entity = { id: 3716 };
        const entity2 = { id: 28069 };
        jest.spyOn(anneescolaireService, 'compareAnneescolaire');
        comp.compareAnneescolaire(entity, entity2);
        expect(anneescolaireService.compareAnneescolaire).toHaveBeenCalledWith(entity, entity2);
      });
    });

    describe('compareDocument', () => {
      it('should forward to documentService', () => {
        const entity = { id: 24703 };
        const entity2 = { id: 4007 };
        jest.spyOn(documentService, 'compareDocument');
        comp.compareDocument(entity, entity2);
        expect(documentService.compareDocument).toHaveBeenCalledWith(entity, entity2);
      });
    });
  });
});
