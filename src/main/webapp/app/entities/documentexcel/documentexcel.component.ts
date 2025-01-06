import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpErrorResponse, HttpHeaders, HttpResponse } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { JhiEventManager, JhiParseLinks, JhiAlertService, JhiDataUtils } from 'ng-jhipster';
import Swal from 'sweetalert2';
import { IDocumentexcel } from 'app/shared/model/documentexcel.model';
import { AccountService } from 'app/core';
import * as XLSX from 'xlsx';
import { ITEMS_PER_PAGE } from 'app/shared';
import { DocumentexcelService } from './documentexcel.service';
import {IAnneescolaire} from "../../shared/model/anneescolaire.model";
import {InscriptionService} from "../inscription/inscription.service";
import {EtudiantService} from "../etudiant/etudiant.service";
import {AnneescolaireService} from "../anneescolaire/anneescolaire.service";
import {ClasseService} from "../classe/classe.service";
import {IClasse} from "../../shared/model/classe.model";
import {DocumentService} from "../document/document.service";
import {Etudiant, IEtudiant} from "../../shared/model/etudiant.model";
import {Inscription} from "../../shared/model/inscription.model";

@Component({
    selector: 'jhi-documentexcel',
    templateUrl: './documentexcel.component.html'
})
export class DocumentexcelComponent implements OnInit, OnDestroy {
    comp:any;
    currentAccount: any;
    documentexcels: IDocumentexcel[];
    error: any;
    success: any;
    eventSubscriber: Subscription;
    routeData: any;
    links: any;
    totalItems: any;
    itemsPerPage: any;
    page: any;
    predicate: any;
    previousPage: any;
    reverse: any;
    classe:IClasse[];
    etudiants:IEtudiant[];
    annee:IAnneescolaire[];
    compeur=0;
    constructor(
        protected documentexcelService: DocumentexcelService,
        protected parseLinks: JhiParseLinks,
        protected jhiAlertService: JhiAlertService,
        protected accountService: AccountService,
        protected activatedRoute: ActivatedRoute,
        protected dataUtils: JhiDataUtils,
        protected router: Router,
        protected eventManager: JhiEventManager,
        protected classeService: ClasseService,
        protected anneService: AnneescolaireService,
        protected etudiantService: EtudiantService,
        protected documentService: DocumentService,
        protected inscriptionService: InscriptionService,
    ) {
        this.itemsPerPage = ITEMS_PER_PAGE;
        this.routeData = this.activatedRoute.data.subscribe(data => {
            this.page = data.pagingParams.page;
            this.previousPage = data.pagingParams.page;
            this.reverse = data.pagingParams.ascending;
            this.predicate = data.pagingParams.predicate;
        });
    }

    loadAll() {
        this.documentexcelService
            .query({
                page: this.page - 1,
                size: this.itemsPerPage,
                sort: this.sort()
            })
            .subscribe(
                (res: HttpResponse<IDocumentexcel[]>) => this.paginateDocumentexcels(res.body, res.headers),
                (res: HttpErrorResponse) => this.onError(res.message)
            );
    }

    loadPage(page: number) {
        if (page !== this.previousPage) {
            this.previousPage = page;
            this.transition();
        }
    }

    transition() {
        this.router.navigate(['/documentexcel'], {
            queryParams: {
                page: this.page,
                size: this.itemsPerPage,
                sort: this.predicate + ',' + (this.reverse ? 'asc' : 'desc')
            }
        });
        this.loadAll();
    }

    clear() {
        this.page = 0;
        this.router.navigate([
            '/documentexcel',
            {
                page: this.page,
                sort: this.predicate + ',' + (this.reverse ? 'asc' : 'desc')
            }
        ]);
        this.loadAll();
    }
    confirmDelete(id: number) {
        this.documentexcelService.delete(id).subscribe(response => {
            this.eventManager.broadcast({
                name: 'documentexcelListModification',
                content: 'Deleted an documentexcel'
            });
            //this.activeModal.dismiss(true);
        });
    }
    deleteSupprimer(id){
        Swal.fire({
            title: 'Êtes-vous sûr de vouloir supprimer.',
            text: "A revoir ...",
            type: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
        }).then((result) => {
            if (result.value) {
                this.confirmDelete(id);
                Swal.fire(
                    'Supprimé!',
                    'Supprimé avec succès',
                    'success'
                )
            }else {

            }
        })
    }

    confirmeCharge($event){
        Swal.fire({
            title: 'Êtes-vous sûr de vouloir charger des etudiants.',
            text: "A revoir ...",
            type: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
        }).then((result) => {
            if (result.value) {
                this.onFileChange($event);
                Swal.fire(
                    'Effecter!',
                    'Effectuer avec succès',
                    'success'
                )
            }else {

            }
        })
    }
    ngOnInit() {
        this.comp=this;
        this.loadAll();
        this.accountService.identity().then(account => {
            this.currentAccount = account;
        });
        this.etudiantService.query().subscribe(
            (data)=>{
                this.etudiants=data.body;
            }
        );
        this.registerChangeInDocumentexcels();
        this.classeService.allClasse().subscribe(

            (data)=>{
                console.log(data);
                this.classe=data.body;
                console.log(this.classe);

            }
        );

        this.anneService.query().subscribe(

            (data)=>{
                console.log(data);
                this.annee=data.body;
                console.log(this.annee);
            }

        );
        jQuery(document).ready(setTimeout(function() {




            // Form Switcher
            $('#form-switcher > button').on('click', function() {
                var btnData = $(this).data('form-layout');
                var btnActive = $('#form-elements-pane .admin-form.active');

                // Remove any existing animations and then fade current form out
                btnActive.removeClass('slideInUp').addClass('animated fadeOutRight animated-shorter');
                // When above exit animation ends remove leftover classes and animate the new form in
                btnActive.one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function() {
                    btnActive.removeClass('active fadeOutRight animated-shorter');
                    $('#' + btnData).addClass('active animated slideInUp animated-shorter')
                });
            });

            // Cache several DOM elements
            var pageHeader = $('.content-header').find('b');
            var adminForm = $('.admin-form');
            var options = adminForm.find('.option');
            var switches = adminForm.find('.switch');
            var buttons = adminForm.find('.button');
            var Panel = adminForm.find('.panel');

            // Form Skin Switcher
            $('#skin-switcher a').on('click', function() {
                var btnData = $(this).data('form-skin');

                $('#skin-switcher a').removeClass('item-active');
                $(this).addClass('item-active')

                adminForm.each(function(i, e) {
                    var skins = 'theme-primary theme-info theme-success theme-warning theme-danger theme-alert theme-system theme-dark';
                    var panelSkins = 'panel-primary panel-info panel-success panel-warning panel-danger panel-alert panel-system panel-dark';
                    $(e).removeClass(skins).addClass('theme-' + btnData);
                    Panel.removeClass(panelSkins).addClass('panel-' + btnData);
                    pageHeader.removeClass().addClass('text-' + btnData);
                });

                $(options).each(function(i, e) {
                    if ($(e).hasClass('block')) {
                        $(e).removeClass().addClass('block mt15 option option-' + btnData);
                    } else {
                        $(e).removeClass().addClass('option option-' + btnData);
                    }
                });
                $(switches).each(function(i, ele) {
                    if ($(ele).hasClass('switch-round')) {
                        if ($(ele).hasClass('block')) {
                            $(ele).removeClass().addClass('block mt15 switch switch-round switch-' + btnData);
                        } else {
                            $(ele).removeClass().addClass('switch switch-round switch-' + btnData);
                        }
                    } else {
                        if ($(ele).hasClass('block')) {
                            $(ele).removeClass().addClass('block mt15 switch switch-' + btnData);
                        } else {
                            $(ele).removeClass().addClass('switch switch-' + btnData);
                        }
                    }

                });
                buttons.removeClass().addClass('button btn-' + btnData);
            });

            setTimeout(function() {
                adminForm.addClass('theme-primary');
                Panel.addClass('panel-primary');
                pageHeader.addClass('text-primary');

                $(options).each(function(i, e) {
                    if ($(e).hasClass('block')) {
                        $(e).removeClass().addClass('block mt15 option option-primary');
                    } else {
                        $(e).removeClass().addClass('option option-primary');
                    }
                });
                $(switches).each(function(i, ele) {

                    if ($(ele).hasClass('switch-round')) {
                        if ($(ele).hasClass('block')) {
                            $(ele).removeClass().addClass('block mt15 switch switch-round switch-primary');
                        } else {
                            $(ele).removeClass().addClass('switch switch-round switch-primary');
                        }
                    } else {
                        if ($(ele).hasClass('block')) {
                            $(ele).removeClass().addClass('block mt15 switch switch-primary');
                        } else {
                            $(ele).removeClass().addClass('switch switch-primary');
                        }
                    }
                });
                buttons.removeClass().addClass('button btn-primary');
            }, 800);


        },1000));
    }
    login() {
        this.modalRef = this.loginModalService.open();
    }

    onFileChange(ev) {

        let workBook = null;
        let jsonData = null;
        const reader = new FileReader();
        const file = ev.target.files[0];
        reader.onload = (event) => {
            const data = reader.result;
            workBook = XLSX.read(data, { type: 'binary' });
            jsonData = workBook.SheetNames.reduce((initial, name) => {
                const sheet = workBook.Sheets[name];
                initial[name] = XLSX.utils.sheet_to_json(sheet);
                return initial;
            }, {});
            const dataString = JSON.stringify(jsonData);
            console.log(JSON.parse(dataString)['Feuil1']);
            this.Insertion( JSON.parse(dataString)['Feuil1']);

        };
        reader.readAsBinaryString(file);
    }
    Insertion(etudiant){
        console.log(etudiant);
     for(let a of etudiant){


         this.contin(a);



        }

    }
    contin(a){
        setTimeout(() =>
            {
                this.continuee(a)
            },
            5000);
    }
    continuee(a){

        let etu=new Etudiant();
        etu.matricule=a.matricule;
        etu.nom=a.nom;
        etu.prenom=a.prenom;
        etu.adresse="";
        etu.tel="";
        etu.dateNaissance=a.dateNaissance;
        etu.email="";

        this.etudiantService.create(etu).subscribe(
            ()=>{
                this.etudiantService.maxEtudiant2(etu.matricule).subscribe(
                    (data)=>{
                        this.etudiantService.find(data.body[0]).subscribe(
                            (data)=>{
                                let ins= new Inscription();
                                ins.classe=this.classe.filter((b)=>b.libelle==a.classe)[0];
                                ins.anneescolaire=this.annee.filter((b)=>b.libelle==a.anneescolaire)[0];

                                ins.etudiant=data.body;
                                console.log(this.classe.filter((b)=>b.id==a.classe)[0]);
                                let cpt=0;
                                for(let i=0;i<ins.classe.niveau.typeDocuments.length;i++){
                                    ins.manquant=true;
                                    let doc=new Document();
                                    doc.ref= this.compeur;
                                    this.compeur=this.compeur+1;
                                    doc.typeDocument=ins.classe.niveau.typeDocuments[i];
                                    ins.documents=[];
                                    this.documentService.create(doc).subscribe(
                                        ()=>{

                                            this.documentService.maxDocument(doc.ref).subscribe(
                                                (data)=>{

                                                    this.documentService.find(data.body[0]).subscribe(
                                                        (data)=>{
                                                            cpt++;
                                                            ins.documents.push(data.body);
                                                            if(cpt==ins.classe.niveau.typeDocuments.length){


                                                                this.inscriptionService.create(ins).subscribe(
                                                                    ()=>{
                                                                        console.log("sucess");

                                                                    }
                                                                )
                                                            }
                                                            console.log(ins)   ;

                                                        }
                                                    )
                                                }
                                            );



                                        }
                                    );



                                }

                            }
                        )
                    }
                )
            },
            ()=>{

                                let ins= new Inscription();
                                ins.classe=this.classe.filter((b)=>b.libelle==a.classe)[0];
                                ins.anneescolaire=this.annee.filter((b)=>b.libelle==a.anneescolaire)[0];

                                ins.etudiant=this.etudiants.filter((a)=>a.matricule==etu.matricule)[0];
                                console.log(this.classe.filter((b)=>b.id==a.classe)[0]);
                                let cpt=0;
                                for(let i=0;i<ins.classe.niveau.typeDocuments.length;i++){
                                    ins.manquant=true;
                                    let doc=new Document();
                                    doc.ref= this.compeur;
                                    this.compeur=this.compeur+1;
                                    doc.typeDocument=ins.classe.niveau.typeDocuments[i];
                                    ins.documents=[];
                                    this.documentService.create(doc).subscribe(
                                        ()=>{

                                            this.documentService.maxDocument(doc.ref).subscribe(
                                                (data)=>{

                                                    this.documentService.find(data.body[0]).subscribe(
                                                        (data)=>{
                                                            cpt++;
                                                            ins.documents.push(data.body);
                                                            if(cpt==ins.classe.niveau.typeDocuments.length){


                                                                this.inscriptionService.create(ins).subscribe(
                                                                    ()=>{
                                                                        console.log("sucess");

                                                                    }
                                                                )
                                                            }
                                                            console.log(ins)   ;

                                                        }
                                                    )
                                                }
                                            );



                                        }
                                    );



                                }


            }
        )
    }
    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: IDocumentexcel) {
        return item.id;
    }

    byteSize(field) {
        return this.dataUtils.byteSize(field);
    }

    openFile(contentType, field) {
        return this.dataUtils.openFile(contentType, field);
    }

    registerChangeInDocumentexcels() {
        this.eventSubscriber = this.eventManager.subscribe('documentexcelListModification', response => this.loadAll());
    }

    sort() {
        const result = [this.predicate + ',' + (this.reverse ? 'asc' : 'desc')];
        if (this.predicate !== 'id') {
            result.push('id');
        }
        return result;
    }

    protected paginateDocumentexcels(data: IDocumentexcel[], headers: HttpHeaders) {
        this.links = this.parseLinks.parse(headers.get('link'));
        this.totalItems = parseInt(headers.get('X-Total-Count'), 10);
        this.documentexcels = data;
    }

    protected onError(errorMessage: string) {
        this.jhiAlertService.error(errorMessage, null, null);
    }
}
