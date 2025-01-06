import { Component, OnInit, ElementRef } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { JhiAlertService, JhiDataUtils } from 'ng-jhipster';
import { IDocumentclasse } from 'app/shared/model/documentclasse.model';
import { DocumentclasseService } from './documentclasse.service';
import { IClasse } from 'app/shared/model/classe.model';
import { ClasseService } from 'app/entities/classe';
import {AnneescolaireService} from "../anneescolaire/anneescolaire.service";
import { SemestreService } from 'app/entities/semestre';
import {ISemestre} from "../../shared/model/semestre.model";
@Component({
    selector: 'jhi-documentclasse-update',
    templateUrl: './documentclasse-update.component.html'
})
export class DocumentclasseUpdateComponent implements OnInit {
    semestres: ISemestre[];
    documentclasse: IDocumentclasse;
    isSaving: boolean;
    motclasse:string;
    classes: IClasse[];
    anneeScolaire:[];
    constructor(
        protected dataUtils: JhiDataUtils,
        protected jhiAlertService: JhiAlertService,
        protected documentclasseService: DocumentclasseService,
        protected classeService: ClasseService,
        protected semestreService: SemestreService,
        protected elementRef: ElementRef,
        protected activatedRoute: ActivatedRoute,
        protected annneScolaireService: AnneescolaireService,

    ) {}

    ngOnInit() {
        this.isSaving = false;
        this.motclasse=this.activatedRoute.snapshot.paramMap.get("name");
        this.activatedRoute.data.subscribe(({ documentclasse }) => {
            this.documentclasse = documentclasse;

        });
        this.semestreService
            .query()
            .pipe(
                filter((mayBeOk: HttpResponse<ISemestre[]>) => mayBeOk.ok),
                map((response: HttpResponse<ISemestre[]>) => response.body)
            )
            .subscribe((res: ISemestre[]) => (this.semestres = res), (res: HttpErrorResponse) => this.onError(res.message));
        this.classeService
            .query()
            .pipe(
                filter((mayBeOk: HttpResponse<IClasse[]>) => mayBeOk.ok),
                map((response: HttpResponse<IClasse[]>) => response.body)
            )
            .subscribe((res: IClasse[]) => (this.classes = res), (res: HttpErrorResponse) => this.onError(res.message));
        this.annneScolaireService.query().subscribe(
            (data)=>{
                this.anneeScolaire=data.body;
                this.anneeScolaire.filter((a)=>a.libelle==this.documentclasse.ref)[0].select=true;

            }
        );
    }

    byteSize(field) {
        return this.dataUtils.byteSize(field);
    }

    openFile(contentType, field) {
        return this.dataUtils.openFile(contentType, field);
    }

    setFileData(event, entity, field, isImage) {
        this.dataUtils.setFileData(event, entity, field, isImage);
    }

    clearInputImage(field: string, fieldContentType: string, idInput: string) {
        this.dataUtils.clearInputImage(this.documentclasse, this.elementRef, field, fieldContentType, idInput);
    }

    previousState() {
        window.history.back();
    }

    save() {
        this.isSaving = true;
        if (this.documentclasse.id !== undefined) {

            console.log(this.documentclasse);
            this.subscribeToSaveResponse(this.documentclasseService.update(this.documentclasse));
        } else {


            console.log(this.documentclasse);
            this.subscribeToSaveResponse(this.documentclasseService.create(this.documentclasse));
        }
    }

    protected subscribeToSaveResponse(result: Observable<HttpResponse<IDocumentclasse>>) {
        result.subscribe((res: HttpResponse<IDocumentclasse>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
    }

    protected onSaveSuccess() {
        this.isSaving = false;
        this.previousState();
    }

    protected onSaveError() {
        this.isSaving = false;
    }

    protected onError(errorMessage: string) {
        this.jhiAlertService.error(errorMessage, null, null);
    }

    trackClasseById(index: number, item: IClasse) {
        return item.id;
    }
    setFileData(event, entity, field, isImage) {
        this.dataUtils.setFileData(event, entity, field, isImage);
    }
}
