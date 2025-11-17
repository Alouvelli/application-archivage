import {Component, ElementRef, OnInit} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import * as moment from 'moment';
import {JhiAlertService, JhiDataUtils} from 'ng-jhipster';
import { IInscription } from 'app/shared/model/inscription.model';
import { InscriptionService } from './inscription.service';
import { IEtudiant } from 'app/shared/model/etudiant.model';
import { EtudiantService } from 'app/entities/etudiant';
import { IClasse } from 'app/shared/model/classe.model';
import { ClasseService } from 'app/entities/classe';
import { IAnneescolaire } from 'app/shared/model/anneescolaire.model';
import { AnneescolaireService } from 'app/entities/anneescolaire';
import { IDocument } from 'app/shared/model/document.model';
import { DocumentService } from 'app/entities/document';
import {TypeDocumentService} from "../type-document/type-document.service";

@Component({
    selector: 'jhi-inscription-update',
    templateUrl: './inscription-update.component.html'
})
export class InscriptionUpdateComponent implements OnInit {
    inscription: IInscription;
    isSaving: boolean;
    document:null;
    alert:String[]=[];
    etudiants: IEtudiant[];
    nbr=0;
    classes: IClasse[];
    etudiantRight={
        id:null,
        matricule:null,
        nom:null,
        prenom:null,
        dateNaissance:null,
        tel:null,
        email:null,
        adresse:null,
        etat:null
    };
    anneescolaires: IAnneescolaire[];
    documents: IDocument[];

    document1: IDocument[10]=[];
    dateDp: any;

    constructor(
        protected dataUtils: JhiDataUtils,
        protected jhiAlertService: JhiAlertService,
        protected inscriptionService: InscriptionService,
        protected etudiantService: EtudiantService,
        protected classeService: ClasseService,
        protected anneescolaireService: AnneescolaireService,
        protected documentService: DocumentService,
        protected typedocumentService:TypeDocumentService,

        protected activatedRoute: ActivatedRoute,
        protected elementRef: ElementRef,
    ) {}

    ngOnInit() {

       this.etudiantService.query().subscribe(
            (data)=>{
                this.etudiants=data.body;
            }
        );
        this.alert=[];
        this.isSaving = false;
       /* for(let i=0;i<4;i++){
            this.document1[i]=new Document();
        }*/
        this.activatedRoute.data.subscribe(({ inscription }) => {
            this.inscription = inscription;

            if(this.inscription.id){
                this.etudiantRight=this.inscription.etudiant;
                for(let i=0;i<this.inscription.documents.length;i++){

                  //  this.document1[i]=this.inscription.documents[i];
                    this.charge(this.inscription.documents[i],i);
                }
                console.log(this.inscription);
            }

        });
        this.etudiantService
            .query()
            .pipe(
                filter((mayBeOk: HttpResponse<IEtudiant[]>) => mayBeOk.ok),
                map((response: HttpResponse<IEtudiant[]>) => response.body)
            )
            .subscribe((res: IEtudiant[]) => (this.etudiants = res), (res: HttpErrorResponse) => this.onError(res.message));
        this.classeService
            .allClasse()
            .pipe(
                filter((mayBeOk: HttpResponse<IClasse[]>) => mayBeOk.ok),
                map((response: HttpResponse<IClasse[]>) => response.body)
            )
            .subscribe((res: IClasse[]) => (this.classes = res), (res: HttpErrorResponse) => this.onError(res.message));
        this.anneescolaireService
            .query()
            .pipe(
                filter((mayBeOk: HttpResponse<IAnneescolaire[]>) => mayBeOk.ok),
                map((response: HttpResponse<IAnneescolaire[]>) => response.body)
            )
            .subscribe((res: IAnneescolaire[]) => (this.anneescolaires = res), (res: HttpErrorResponse) => this.onError(res.message));
        this.documentService
            .query()
            .pipe(
                filter((mayBeOk: HttpResponse<IDocument[]>) => mayBeOk.ok),
                map((response: HttpResponse<IDocument[]>) => response.body)
            )
            .subscribe((res: IDocument[]) => {
            this.documents = res;


            }, (res: HttpErrorResponse) => this.onError(res.message));

    }

    previousState() {
        window.history.back();
    }
charge(x,i){

    this.typedocumentService.typeDocument(x.id).subscribe(
        (data)=>{
            x.typeDocument=data.body[0];
            this.document1[i]=x;
            if(x.document1ContentType==null){

               this.alert.push(x.typeDocument.libelle);
            }

        }
    )
}
    save() {
        this.isSaving = true;

        if (this.inscription.id !== undefined) {
           // this.inscription.documents=[];

            let cpt=0;
            this.inscription.manquant=false;
            for(let i=0;i<this.inscription.documents.length;i++){

               if(this.document1[i].id){

                   if(this.document1[i].document1ContentType==null){

                       this.inscription.manquant=true;
                   }
                   this.documentService.update(this.document1[i]).subscribe(
                       ()=>{

                       }
                   );
                   this.inscription.documents[i]=this.document1[i];
                   cpt++;
                   if(cpt==this.inscription.documents.length){
                       this.inscriptionService.update(this.inscription).subscribe(
                           ()=>{
                               this.etudiantService.update(this.etudiantRight).subscribe(
                                   ()=>{
                                       this.previousState();
                                   }
                               )
                           }
                       )

                   }

               }



            }

        } else {

            console.log(this.etudiantRight);

                this.inscription.manquant=false;

            this.etudiantService.create(this.etudiantRight).subscribe(
                ()=>{

                    this.etudiantService.maxEtudiant().subscribe(
                        (data)=>{

                            this.etudiantService.find(data.body[0]).subscribe(
                                (data)=>{

                                    this.inscription.etudiant=data.body;

                                    this.inscription.documents=[];
                                    let cpt=0;
                                    for(let i=0;i<this.inscription.classe.niveau.typeDocuments.length;i++){
                                        if(this.document1[i].document1ContentType==null){

                                            this.inscription.manquant=true;
                                        }
                                                this.document1[i].ref= i;

                                                 this.documentService.create(this.document1[i]).subscribe(
                                            ()=>{

                                                this.documentService.maxDocument(this.document1[i].ref).subscribe(
                                                    (data)=>{
                                                                    console.log(data.body);
                                                        this.documentService.find(data.body[0]).subscribe(
                                                            (data)=>{
                                                                cpt++;
                                                                this.inscription.documents.push(data.body);
                                                                if(cpt==this.inscription.classe.niveau.typeDocuments.length){


                                                                    this.inscriptionService.create(this.inscription).subscribe(
                                                                        ()=>{
                                                                            console.log("sucess");
                                                                            this.previousState();
                                                                        }
                                                                    )
                                                                }
                                                                console.log(this.inscription)   ;

                                                            }
                                                        )
                                                    }
                                                );



                                            }
                                        );



                                    }




                                    console.log(this.inscription);



                                }
                            )
                        }
                    )
                },
                ()=>{


                                    this.inscription.etudiant=this.etudiants.filter((a)=>a.matricule==this.etudiantRight.matricule)[0];

                                    this.inscription.documents=[];
                                    let cpt=0;
                                    for(let i=0;i<this.inscription.classe.niveau.typeDocuments.length;i++){
                                        if(this.document1[i].document1ContentType==null){

                                            this.inscription.manquant=true;
                                        }
                                        this.document1[i].ref= i;

                                        this.documentService.create(this.document1[i]).subscribe(
                                            ()=>{

                                                this.documentService.maxDocument(this.document1[i].ref).subscribe(
                                                    (data)=>{
                                                        console.log(data.body);
                                                        this.documentService.find(data.body[0]).subscribe(
                                                            (data)=>{
                                                                cpt++;
                                                                this.inscription.documents.push(data.body);
                                                                if(cpt==this.inscription.classe.niveau.typeDocuments.length){


                                                                    this.inscriptionService.create(this.inscription).subscribe(
                                                                        ()=>{
                                                                            console.log("sucess");
                                                                            this.previousState();
                                                                        }
                                                                    )
                                                                }
                                                                console.log(this.inscription)   ;

                                                            }
                                                        )
                                                    }
                                                );



                                            }
                                        );



                                    }




                                    console.log(this.inscription);




                }
            )

        }
    }
    clickClasse(){
        this.document1=[];

        for(let i=0;i<this.inscription.classe.niveau.typeDocuments.length;i++){
            this.document1[i]=new Document();
            this.document1[i].typeDocument=this.inscription.classe.niveau.typeDocuments[i];
        }
        console.log(this.document1);
    }
    delay(ms: number) {
        return new Promise( resolve => setTimeout(resolve, ms) );
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

    clearInputImage(document,field: string, fieldContentType: string, idInput: string) {
        this.dataUtils.clearInputImage(document, this.elementRef, field, fieldContentType, idInput);
    }

    protected subscribeToSaveResponse(result: Observable<HttpResponse<IInscription>>) {
        result.subscribe((res: HttpResponse<IInscription>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
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

    trackEtudiantById(index: number, item: IEtudiant) {
        return item.id;
    }

    trackClasseById(index: number, item: IClasse) {
        return item.id;
    }

    trackAnneescolaireById(index: number, item: IAnneescolaire) {
        return item.id;
    }

    trackDocumentById(index: number, item: IDocument) {
        return item.id;
    }

    getSelected(selectedVals: Array<any>, option: any) {
        if (selectedVals) {

            for (let i = 0; i < selectedVals.length; i++) {
                if (option.id === selectedVals[i].id) {

                    return selectedVals[i];
                }
            }
        }
        return option;
    }
}
