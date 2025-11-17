import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import * as moment from 'moment';
import { JhiAlertService } from 'ng-jhipster';
import { IApplication } from 'app/shared/model/application.model';
import { ApplicationService } from './application.service';
import { IEcole } from 'app/shared/model/ecole.model';
import { EcoleService } from 'app/entities/ecole';
import {ISite} from "../../shared/model/site.model";
import {SiteService} from "../site/site.service";

@Component({
    selector: 'jhi-application-update',
    templateUrl: './application-update.component.html',
    styleUrls:['./application.scss']
})
export class ApplicationUpdateComponent implements OnInit {
    application: IApplication={};
    applications: IApplication[];
    isSaving: boolean;
    ecole: IEcole={
        adresseEcole: null,
        application:null,
        basPageEcole:null,
        codeEcole:null,
        emailEcole:null,
        encours:null,
        enteteEcole:null,
        etatEcole:null,
        faxEcole:null,
        logoEcole:null,
        nineaEcole:null,
        rang:null,
        selectedSite:null,
        sigleEcole:null,
        telephoneEcole:null,
    };
    site:ISite={
        adresseSite:null,
        basPageSite:null,
        codeSite:null,
        ecole:null,
        emailSite:null,
        encours:null,
        enteteSite: null,
        etatSite:null,
        faxEcole:null,
        logoSite:null,
        modules:null,
        nineaSite:null,
        profils:null,
        rang:null,
        sigleSite:null,
        telephone:null
    };
    ecoles: IEcole[];
    dateVenteDp: any;
    dateDebutDp: any;
    dateFinDp: any;

    constructor(
        protected jhiAlertService: JhiAlertService,
        protected applicationService: ApplicationService,
        protected ecoleService: EcoleService,
        protected activatedRoute: ActivatedRoute,
        protected siteService: SiteService,
        protected route: Router

    ) {}

    ngOnInit() {
        this.isSaving = false;
        //this.activatedRoute.data.subscribe(({ application }) => {
        //  this.application = application;

        // });
        this.ecoleService
            .query()
            .pipe(
                filter((mayBeOk: HttpResponse<IEcole[]>) => mayBeOk.ok),
                map((response: HttpResponse<IEcole[]>) => response.body)
            )
            .subscribe((res: IEcole[]) => (this.ecoles = res), (res: HttpErrorResponse) => this.onError(res.message));

        this.loadAllApplication();
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
    changeMaintenance(){
        if(this.application.maintenance==1){
            this.application.maintenance=0
        }else{
            this.application.maintenance=1
        }

    }
    previousState() {
        window.history.back();
    }

    save() {
        console.log(this.ecole);
        this.isSaving = true;
        if (this.application.id !== undefined) {
            this.application.logoApplication= document.getElementById('field_logoApplication').value;
            this.application.contratMaintenance= document.getElementById('field_contratMaintenance').value;

            this.applicationService.update(this.application).subscribe(
                ()=>{

                }
            );
        } else {
            this.echangeValue();
            this.application.etatApplication=1
            this.application.logoApplication= document.getElementById('field_logoApplication').value;
            this.application.contratMaintenance= document.getElementById('field_contratMaintenance').value;
            this.applicationService.create(this.application).subscribe(
                ()=>{
                    this.applicationService.allApplication().subscribe(
                        (data)=>{
                            this.applications = data.body;

                            this.ecole.application = this.applications[this.applications.length - 1]; // L'application est liée
                            this.ecoleService.create(this.ecole).subscribe(
                                () => {
                                    this.echangeValue(); // Copie des propriétés de ecole vers site
                                    this.applicationService.allEcole().subscribe( // Recharge toutes les écoles
                                        (data) => {
                                            this.site.ecole = data.body[data.body.length - 1]; // La nouvelle école est liée
                                            if (!this.ecole.selectedSite) {
                                                this.siteService.create(this.site).subscribe(
                                                    ()=>{

                                                    }
                                                )
                                            }
                                        }
                                    )

                                }
                            )
                        }
                    )
                }
            );


            this.previousState();


        }
    }

    protected subscribeToSaveResponse(result: Observable<HttpResponse<IApplication>>) {
        result.subscribe((res: HttpResponse<IApplication>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
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

    trackEcoleById(index: number, item: IEcole) {
        return item.id;
    }
    echangeValue(){
        this.site['adresseSite']=this.ecole['adresseEcole']
        this.site['basPageSite']=this.ecole['basPageEcole']
        this.site['codeSite']=    this.ecole['codeEcole']
        this.site['emailSite']=    this.ecole['emailEcole']
        this.site['encours']=    this.ecole['encours']
        this.site['enteteSite']=    this.ecole['enteteEcole']
        this.site['etatSite']= this.ecole['etatEcole']
        this.site['faxSite']=this.ecole['faxEcole']
        this.site['logoSite']=this.ecole['logoEcole']
        this.site['nineaSite']=this.ecole['nineaEcole']
        this.site['rang']=this.ecole['rang']
        this.site['sigleSite']=this.ecole['sigleEcole']
        this.site['telephone']=this.ecole['telephoneEcole']

        /* ecole:null,*/


    }
    loadAllApplication(){
        this.applicationService.allApplication().subscribe(
            (data)=>{
                if(data.body.length!=0){

                    this.application=data.body[0];
                    console.log(this.application);
                }
            }
        );
    }


}
