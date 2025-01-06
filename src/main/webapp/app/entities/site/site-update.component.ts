import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { JhiAlertService } from 'ng-jhipster';
import { ISite } from 'app/shared/model/site.model';
import { SiteService } from './site.service';
import { IEcole } from 'app/shared/model/ecole.model';
import { EcoleService } from 'app/entities/ecole';
import { IModule } from 'app/shared/model/module.model';
import { ModuleService } from 'app/entities/module';

@Component({
    selector: 'jhi-site-update',
    templateUrl: './site-update.component.html',
    styleUrls:['./site.scss']
})
export class SiteUpdateComponent implements OnInit {
    site: ISite;
    isSaving: boolean;
    validFile=true;
    validFile1=true;
    validFile2=true;


    ecoles: IEcole[];

    modules: IModule[];

    constructor(
        protected jhiAlertService: JhiAlertService,
        protected siteService: SiteService,
        protected ecoleService: EcoleService,
        protected moduleService: ModuleService,
        protected activatedRoute: ActivatedRoute
    ) {}
    dane($event){

        if($event.originalTarget.value.length>0){
            this.site.enteteSite=  $event.originalTarget.value
            this.validFile=true;
        }

    }
    dane1($event){

        if($event.originalTarget.value.length>0){
            this.site.logoSite=  $event.originalTarget.value
            this.validFile1=true;
        }

    } dane2($event){

        if($event.originalTarget.value.length>0){
            this.site.basPageSite=  $event.originalTarget.value
            this.validFile2=true;
        }

    }
    ngOnInit() {

        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ site }) => {
            this.site = site;
        });
        this.ecoleService
            .query()
            .pipe(
                filter((mayBeOk: HttpResponse<IEcole[]>) => mayBeOk.ok),
                map((response: HttpResponse<IEcole[]>) => response.body)
            )
            .subscribe((res: IEcole[]) => (this.ecoles = res), (res: HttpErrorResponse) => this.onError(res.message));
        this.moduleService
            .query()
            .pipe(
                filter((mayBeOk: HttpResponse<IModule[]>) => mayBeOk.ok),
                map((response: HttpResponse<IModule[]>) => response.body)
            )
            .subscribe((res: IModule[]) => (this.modules = res), (res: HttpErrorResponse) => this.onError(res.message));
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

           /* $('#field_enteteSite').on('input', function() {
               console.log($(this).val())   // get the current value of the input field.
            });
            $('#field_enteteSite').bind('input', function() {
                console.log($(this).val()) // get the current value of the input field.
            });*/

        },1000));

        if(!this.site.id){
            this.validFile=true;
            this.validFile1=true;
            this.validFile2=true;
            this.site.encours=1;
            this.site.etatSite=1
        }


    }

    previousState() {
        window.history.back();
    }
    changeEtat(){
        if(this.site.etatSite==1){
            this.site.etatSite=0
        }else{
            this.site.etatSite=1
        }

    }
    changeENCOURS(){
        if(this.site.encours==1){
            this.site.encours=0
        }else{
            this.site.encours=1
        }

    }
    save() {
        console.log(this.site);
        this.isSaving = true;
        if (this.site.id !== undefined) {
            this.site.logoSite= document.getElementById('field_logoSite1').value;
            this.site.enteteSite= document.getElementById('field_enteteSite').value;
            this.site.basPageSite= document.getElementById('field_basPageSite2').value;
            this.subscribeToSaveResponse(this.siteService.update(this.site));
        } else {
            this.site.logoSite= document.getElementById('field_logoSite1').value;
            this.site.enteteSite= document.getElementById('field_enteteSite').value;
            this.site.basPageSite= document.getElementById('field_basPageSite2').value;
            this.subscribeToSaveResponse(this.siteService.create(this.site));
        }
    }

    protected subscribeToSaveResponse(result: Observable<HttpResponse<ISite>>) {
        result.subscribe((res: HttpResponse<ISite>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
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

    trackModuleById(index: number, item: IModule) {
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

    change(){

        if(document.getElementById('field_enteteSite').value.length>0){

        }else{
            document.getElementById('field_enteteSite').value=""
            this.validFile=false

        }}
        change1(){

            if(document.getElementById('field_logoSite1').value.length>0){

            }else{
                document.getElementById('field_logoSite1').value=""
                this.validFile1=false;




    }}
    change2(){

        if(document.getElementById('field_basPageSite2').value.length>0){

        }else{
            document.getElementById('field_basPageSite2').value=""
            this.validFile2=false




        }}
}
