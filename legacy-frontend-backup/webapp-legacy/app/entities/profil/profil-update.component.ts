import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { JhiAlertService } from 'ng-jhipster';
import { IProfil } from 'app/shared/model/profil.model';
import { ProfilService } from './profil.service';
import { IEcole } from 'app/shared/model/ecole.model';
import { EcoleService } from 'app/entities/ecole';
import { ISite } from 'app/shared/model/site.model';
import { SiteService } from 'app/entities/site';
import {IModule, Module} from "../../shared/model/module.model";
import {IRubrique, Rubrique} from "../../shared/model/rubrique.model";
import {IMenu} from "../../shared/model/menu.model";
import {ProfilModuleService} from "../profil-module/profil-module.service";
import {RubriqueProfilService} from "../rubrique-profil/rubrique-profil.service";
import {IProfilModule} from "../../shared/model/profil-module.model";
import {IRubriqueProfil} from "../../shared/model/rubrique-profil.model";
import {IProfilMenu} from "../../shared/model/profil-menu.model";
import {ProfilMenuService} from "../profil-menu/profil-menu.service";
import {SiteProfilService} from "../site-profil/site-profil.service";
import {ISiteProfil} from "../../shared/model/site-profil.model";
import {userCurrent} from "../../app.constants";

@Component({
    selector: 'jhi-profil-update',
    templateUrl: './profil-update.component.html',
    styleUrls:['./profil.scss']
})
export class ProfilUpdateComponent implements OnInit {
    profilmoduleObject:IProfilModule={};
    profilrubriqueObject:IRubriqueProfil={};
    profilMenuObject:IProfilMenu={};
    siteProfilObject:ISiteProfil={};
    siteProfilObject1:ISiteProfil={};
    profil: IProfil=null;
    isSaving: boolean;
    typedeChanmp:string;
    ecoles: IEcole[];
    compteur:number;
    sites: ISite[];

    sites1: ISite[]=[];
    sites2: ISite[]=[];
    modules: IModule[];
    rubriques: IRubrique[];
    menus: IMenu[];


    constructor(
        protected jhiAlertService: JhiAlertService,
        protected profilService: ProfilService,
        protected siteProfilService: SiteProfilService,
        protected ecoleService: EcoleService,
        protected profilMenuService: ProfilMenuService,
        protected profilmoduleService: ProfilModuleService,
        protected rubriqueprofilService: RubriqueProfilService,
        protected siteService: SiteService,
        protected activatedRoute: ActivatedRoute
    ) {}

    ngOnInit() {

        this.isSaving = false;
        this.compteur=1;
        this.activatedRoute.data.subscribe(({ profil }) => {
            this.profil = profil;
            console.log(this.profil)
            if(this.profil.ecole){
                this.typeCheckbox()
            }else{
                this.typeRadio();
            }
            if(this.profil.id){
                this.updateAllChecked(this.profil.id);
                this.compteur=2;
            }

        });

        //this.allmenu();

        if(this.compteur!=2){

            this.updateAllChecked1();
        }


        this.ecoleService
            .query()
            .pipe(
                filter((mayBeOk: HttpResponse<IEcole[]>) => mayBeOk.ok),
                map((response: HttpResponse<IEcole[]>) => response.body)
            )
            .subscribe((res: IEcole[]) => (this.ecoles = res), (res: HttpErrorResponse) => this.onError(res.message));
        this.siteService.query()
            .pipe(
                filter((mayBeOk: HttpResponse<ISite[]>) => mayBeOk.ok),
                map((response: HttpResponse<ISite[]>) => response.body)
            )
            .subscribe((res: ISite[]) => (this.sites = res), (res: HttpErrorResponse) => this.onError(res.message));



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

        jQuery(document).ready(setTimeout(function() {


            var updateOutput = function(e) {
                var list = e.length ? e : $(e.target),
                    output = list.data('output');
                if (window.JSON) {
                    output.val(window.JSON.stringify(list.nestable('serialize'))); //, null, 2));
                } else {
                    output.val('JSON browser support required for this demo.');
                }
            };

            // Init Nestable on list 1
            $('#nestable').nestable({
                group: 1
            }).on('change', updateOutput);

            // Init Nestable on list 2
            $('#nestable-alt').nestable({
                group: 2
            }).on('change', updateOutput);

            // Init Nestable on list 3
            $('#nestable-contextual').nestable({
                group: 3
            }).on('change', updateOutput);

            // nestable serialized output functionality
            updateOutput($('#nestable').data('output', $('#nestable-output')));
            updateOutput($('#nestable-alt').data('output', $('#nestable-output2')));
            updateOutput($('#nestable-contextual').data('output', $('#nestable-output3')));

            // nestable menu functionality
            $('#nestable-menu').on('change', function(e) {
                var target = $(e.target),
                    action = target.data('action');
                if (action === 'expand-all') {
                    $('.dd').nestable('expandAll');
                }
                if (action === 'collapse-all') {
                    $('.dd').nestable('collapseAll');
                }
            });

        },1000));
        if(!this.profil.id){
            this.profil.etatProfil=1;
        }
    }
    changeEtat(){
        if(this.profil.etatProfil==1){
            this.profil.etatProfil=0
        }else{
            this.profil.etatProfil=1
        }

    }
    previousState() {
        window.history.back();
    }
    changeSiteAfiche(site){
        this.diambar=site
    }
    save() {
        this.isSaving = true;
        if (this.profil.id !== undefined) {
            this.profilService.update(this.profil).subscribe(
                ()=>{
                    for(let pp of  this.sites){

                        this.miseajourSite(pp)
                    }
                }
            );
            this.previousState();


        } else {
            if( this.typedeChanmp!="radio"){
                this.profil.ecole=this.ecoles[0];
            }

            this.profilService.create(this.profil).subscribe(
                ()=>{
                    this.profilService.maxProfil().subscribe(
                        (data)=>{
                            this.profilService.find(data.body[0]).subscribe(
                                (data)=>{
                                    this.profil = data.body;

                                    for(let site of this.sites){

                                        if(site.selectedSite==true) {
                                            if( this.typedeChanmp=="radio"){
                                                this.profil.site=site
                                                this.profilService.update(this.profil).subscribe(
                                                    ()=>{

                                                    }
                                                )
                                            }

                                            if (site.enCours == true) {
                                                this.siteProfilObject.encours=true;

                                            } else {
                                                this.siteProfilObject.encours=false;
                                            }
                                            //   this.profil.site = site;
                                            this.siteProfilObject.profil=this.profil;
                                            this.siteProfilObject.site=site;
                                            this.siteProfilService.create(this.siteProfilObject).subscribe(
                                                ()=>{
//je reviens

                                                    this.profilService.maxSiteProfil(site.id).subscribe(
                                                        (data)=>{
                                                            let s=data.body[0]
                                                            this.siteProfilService.find(data.body[0]).subscribe(
                                                                (data)=>{
                                                                    for (let mod of site.modules) {
                                                                        if (mod.selectedSite == true) {
                                                                            this.profilmoduleObject.siteProfil = data.body;
                                                                            this.profilmoduleObject.module = mod;
                                                                            if (mod.enCours == true) {
                                                                                this.profilmoduleObject.encours = true;
                                                                            } else {
                                                                                this.profilmoduleObject.encours = false;
                                                                            }
                                                                            this.profilmoduleService.create(this.profilmoduleObject).subscribe(
                                                                                () => {

                                                                                    this.profilService.maxModuleProfil(mod.id,s).subscribe(
                                                                                        (data)=>{

                                                                                            let a=data.body[0];
                                                                                            this.profilmoduleService.find(data.body[0]).subscribe(
                                                                                                (data)=>{
                                                                                                    for(let rub of mod.rubriques) {
                                                                                                        if (rub.selectedSite == true) {
                                                                                                            this.profilrubriqueObject.profilModule = data.body;
                                                                                                            this.profilrubriqueObject.rubrique = rub;
                                                                                                            if (rub.enCours == true) {
                                                                                                                this.profilrubriqueObject.encours = true;
                                                                                                            } else {
                                                                                                                this.profilrubriqueObject.encours = false;
                                                                                                            }

                                                                                                            this.rubriqueprofilService.create(this.profilrubriqueObject).subscribe(
                                                                                                                () => {

                                                                                                                    this.profilService.maxRubriqueProfil(rub.id,a).subscribe(
                                                                                                                        (data)=>{
                                                                                                                            this.rubriqueprofilService.find(data.body[0]).subscribe(
                                                                                                                                (data)=>{
                                                                                                                                    for(let menu of rub.menus) {
                                                                                                                                        if( menu.profilMenu.supprimer==1 || menu.profilMenu.modifier==1  || menu.profilMenu.voir==1 ||
                                                                                                                                            menu.profilMenu.ajouter==1 || menu.profilMenu.imprimer==1) {
                                                                                                                                            console.log("modife")
                                                                                                                                            console.log("modife")
                                                                                                                                            this.profilMenuObject.menu = menu;
                                                                                                                                            this.profilMenuObject.rubriqueProfil = data.body;
                                                                                                                                            this.profilMenuObject.supprimer = menu.profilMenu.supprimer;
                                                                                                                                            this.profilMenuObject.modifier = menu.profilMenu.modifier;
                                                                                                                                            this.profilMenuObject.ajouter = menu.profilMenu.ajouter;
                                                                                                                                            this.profilMenuObject.imprimer = menu.profilMenu.imprimer;
                                                                                                                                            this.profilMenuObject.voir = menu.profilMenu.voir;
                                                                                                                                            this.profilMenuService.create(this.profilMenuObject).subscribe(
                                                                                                                                                () => {


                                                                                                                                                }
                                                                                                                                            )
                                                                                                                                        }

                                                                                                                                    }
                                                                                                                                }
                                                                                                                            )
                                                                                                                        });


                                                                                                                }
                                                                                                            )
                                                                                                        }
                                                                                                    }

                                                                                                }
                                                                                            )
                                                                                        }
                                                                                    )

                                                                                }
                                                                            )
                                                                        }
                                                                    }
                                                                }
                                                            )
                                                        }
                                                    )

                                                }
                                            )

                                        }}
                                }

                            )
                        }

                    )

                }
            )

            //this.previousState();
        }
    }

    public profilModule(a){

    }
    protected subscribeToSaveResponse(result: Observable<HttpResponse<IProfil>>) {
        result.subscribe((res: HttpResponse<IProfil>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
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

    trackSiteById(index: number, item: ISite) {
        return item.id;
    }
    typeRadio(){
        this.typedeChanmp="radio"
    }
    typeCheckbox(){
        this.typedeChanmp="checkbox"
    }
    changeEtatSite(a,b){
        if(b=="radio"){

            for(let a of this.sites){
                a.selectedSite=false;
            }
            a.selectedSite=true;
        }else{

            if(a.selectedSite==true ){
                a.type="update"
            }else {
                a.type="insert"
            }
            a.selectedSite=!a.selectedSite;
            console.log(a)
        }

    }
    changeEncoursSite(a){
        console.log(this.profil)
        if(!this.profil.id) {
            a.enCours = true
            for (let s of this.sites) {
                if (a.id != s.id) {
                    s.enCours = false
                }
            }
        }else {
            a.encours1=1
            a.ancienEncours=false
            a.type="update"
            for(let s of this.sites){
                if(a.id!=s.id){
                    if(s.encours1==1 && s.ancien1==1){

                        s.ancienEncours=true
                        console.log(s)
                    }else{
                        s.ancienEncours=false
                    }
                    s.encours1=0
                }
            }
        }
    }
    changeEncoursModule(site,a){
        if (!this.profil.id) {
            a.enCours=true
            for(let m of site.modules){
                if(a.id!=m.id){
                    m.enCours=false
                }
            }}else {
            a.encours1=1
            a.ancienEncours=false
            a.type="update"
            for(let m of site.modules){
                if(a.id!=m.id){
                    if(m.encours1==1 && m.ancien1==1){

                        m.ancienEncours=true

                    }else{
                        m.ancienEncours=false
                    }
                    m.encours1=0
                }
            }
        }
        console.log(a)
    }
    changeEtatModule(a){

        if(!this.profil.id) {

            a.type = "update"
        } else {
            a.type = "insert"
        }
        a.selectedSite = !a.selectedSite;
        console.log(a)

    }

    changeEtatRubrique(a){

        if(a.selectedSite==true ){
            a.type="update"
        }else {
            a.type="insert"
        }
        a.selectedSite=!a.selectedSite;
        console.log(a)
    }
    changeEncoursRubrique(mod,a){
        if(!this.profil.id){
            a.enCours=true
            for(let r of mod.rubriques){
                if(a.id!=r.id){
                    r.enCours=false
                }
            }}else {
            a.encours1=1
            a.ancienEncours=false
            a.type="update"
            for(let r of mod.rubriques){
                if(a.id!=r.id){
                    if(r.encours1==1 && r.ancien1==1){

                        r.ancienEncours=true

                    }else{
                        r.ancienEncours=false
                    }
                    r.encours1=0
                }
            }
        }
        console.log(a)
    }
    changeEtatMenu(a,num){
        if(!this.profil.id) {
            if (!a.profilMenu) {
                a.profilMenu = {
                    ajouter: null,
                    enCours: null,
                    id: null,
                    imprimer: null,
                    menu: null,
                    modifier: null,
                    profil: null,
                    selectedSite: null,
                    supprimer: null,
                    voir: null
                }

            }
            if (num == 1) {

                if (a.profilMenu.voir == 1) {
                    a.profilMenu.voir = 0
                } else {
                    a.profilMenu.voir = 1
                }

            }
            if (num == 2) {

                if (a.profilMenu.ajouter == 1) {
                    a.profilMenu.ajouter = 0
                } else {
                    a.profilMenu.ajouter = 1
                }

            }
            if (num == 3) {
                if (a.profilMenu.modifier == 1) {
                    a.profilMenu.modifier = 0
                } else {
                    a.profilMenu.modifier = 1
                }

            }
            if (num == 4) {
                if (a.profilMenu.supprimer == 1) {
                    a.profilMenu.supprimer = 0
                } else {
                    a.profilMenu.supprimer = 1
                }

            }
            if (num == 5) {

                if (a.profilMenu.imprimer == 1) {
                    a.profilMenu.imprimer = 0
                } else {
                    a.profilMenu.imprimer = 1
                }

            }


            console.log(a)
        }else {
            if (!a.profilMenu) {
                a.profilMenu = {
                    ajouter: null,
                    enCours: null,
                    id: null,
                    imprimer: null,
                    menu: null,
                    modifier: null,
                    profil: null,
                    selectedSite: null,
                    supprimer: null,
                    voir: null
                }

            }
            if (num == 1) {

                if (a.voir == 1) {
                    a.voir = 0
                } else {
                    a.voir = 1
                }

            }
            if (num == 2) {

                if (a.ajouter == 1) {
                    a.ajouter = 0
                } else {
                    a.ajouter = 1
                }

            }
            if (num == 3) {
                if (a.modifier == 1) {
                    a.modifier = 0
                } else {
                    a.modifier = 1
                }

            }
            if (num == 4) {
                if (a.supprimer == 1) {
                    a.supprimer = 0
                } else {
                    a.supprimer = 1
                }

            }
            if (num == 5) {

                if (a.imprimer == 1) {
                    a.imprimer = 0
                } else {
                    a.imprimer = 1
                }
            }


            a.deselect=false;
            if(a.ajouter!=1 && a.modifier!=1
                && a.voir!=1 && a.supprimer!=1 && a.imprimer!=1 ){
                a.deselect=true;
            }

            if(a.ancien1==1 && (a.ajouter!=1 && a.modifier!=1
                    && a.voir!=1 && a.supprimer!=1 && a.imprimer!=1) ){
                a.deselect=true;
                console.log("cool2")
            }
            if(!a.ancien1 &&( a.ajouter==1 || a.modifier==1
                    || a.voir==1 || a.supprimer==1 || a.imprimer==1) ){
                console.log("cool")
                a.selectedSite=true;
            }
            if(!a.ancien1 && (a.ajouter!=1 && a.modifier!=1
                    && a.voir!=1 && a.supprimer!=1 && a.imprimer!=1) ){
                a.selectedSite=false;
                console.log("cool1")
            }

            console.log(a)
        }
    }



    allSite(){
        let ad:IRubrique[]=[];
        for (let site of this.sites) {
            this.siteService.getModule(site.id).subscribe(
                (data)=> {
                    site.modules=[];
                    for(let x of this.modules) {
                        for (let dat of data.body){
                            if(x.id==dat.id){
                                let ad: IRubrique[] = [];
                                for (let y of x.rubriques) {
                                    ad.push({
                                        id: y.id,
                                        libelleRubrique: y.libelleRubrique,
                                        rangRubrique: y.rangRubrique,
                                        iconeRubrique: y.iconeRubrique,
                                        etatRubrique: y.etatRubrique,
                                        rang: y.rang,
                                        menus: y.menus,
                                        rubriqueProfils: y.rubriqueProfils,
                                        module: y.module,
                                        selectedSite: y.selectedSite,
                                        enCours: y.enCours,


                                    })

                                }
                                site.modules.push({
                                    id: x.id,
                                    libelleModule: x.libelleModule,
                                    logoModule: x.logoModule,
                                    etatModule: x.etatModule,
                                    rang: x.rang,
                                    rubriques: ad,
                                    profilModules: x.profilModules,
                                    sites: x.sites
                                });}


                        }
                    }
                })

        }
    }
    allmodule(){
        this.profilService.allmodule().subscribe(
            (data)=>{
                for (let mod of data.body){
                    mod.rubriques=[];
                    for(let x of this.rubriques){
                        if(mod.id==x.module.id){
                            mod.rubriques.push({
                                enCours: x.enCours,
                                etatRubrique: x.etatRubrique,
                                iconeRubrique: x.iconeRubrique,
                                id: x.id,
                                libelleRubrique: x.libelleRubrique,
                                menus: x.menus,
                                module: x.module,
                                rang: x.rang,
                                rangRubrique: x.rangRubrique,
                                rubriqueProfils: x.rubriqueProfils,
                                selectedSite: x.selectedSite
                            }    );}
                    }
                }
                this.modules=data.body;
                this.allSite();
            }
        )
    }
    allmenu(){

        this.profilService.allmenu().subscribe(
            (data)=>{
                this.menus=data.body;

                this.allrubrique();
            })
    }

    allrubrique(){

        this.profilService.allrubrique().subscribe(
            (data)=>{
                for (let rub of data.body){

                    rub.menus=[]

                    for(let x of this.menus){

                        if(x.rubrique.id==rub.id) {


                            rub.menus.push({
                                codeMenu: x.codeMenu,
                                enCours: x.enCours,
                                etatMenu: x.etatMenu,
                                iconeMenu: x.iconeMenu,
                                id: x.id,
                                libelleMenu: x.libelleMenu,
                                profilMenu: x.profilMenu,
                                profilMenus: x.profilMenus,
                                rangMenu: x.rangMenu,
                                rubrique: x.rubrique,
                                selectedSite: x.selectedSite,
                                urlMenu: x.urlMenu
                            })
                        }
                    }

                }

                this.rubriques=data.body;
                this.allmodule();
            })
    }

    updateAllChecked(id){
        this.allsiteProfilUpdate(id);
    }
    updateAllChecked1(){
        this.allsiteProfilUpdate1();

    }

    //update
    allsiteProfilUpdate(id){

        this.siteService.getallsite(id).subscribe(
            (data)=>{
                this.sites=data.body;
                this.profilService.siteprofilsall(id).subscribe(
                    (data)=>{

                        for(let s of data.body){
                            s.site.selectedSite=true
                            s.site.idMere=s.id;

                            for(let sa of this.sites){
                                if(s.site.id==sa.id) {
                                    s.site.ancien1=1;
                                    if(s.encours==true){
                                        s.site.encours1=1
                                    }else {
                                        s.site.encours1=0
                                    }
                                    this.sites1.push(s.site);
                                }
                            }

                        }
                        for(let sa of this.sites){
                            let i=0;
                            for(let s of data.body){
                                if(s.site.id==sa.id) {
                                    i++;
                                }
                            }
                            if(i==0){
                                this.sites1.push(sa)
                            }

                        }
                        this.sites=this.sites1;

                        for(let pp of  this.sites){
                            this.allModuleProfilUpdate(pp);
                        }

                    })}
        )

    }
    allModuleProfilUpdate(s){
        let modulenoncocher=[];

        let modules1=[];


        this.profilService.getallModuleX(s.id).subscribe(
            (data)=>{
                modulenoncocher=data.body
                this.siteProfilService.profilSiteAll(this.profil.id,s.id).subscribe(

                    (data)=>{
                        let siteprofil=data.body[0]
                        if(data.body[0]){

                            this.profilmoduleService.profilModuleAll(data.body[0].id).subscribe(
                                (data)=>{

                                    ////////////
                                    for(let m of data.body){
                                        m.module.idMere=m.id
                                        m.module.selectedSite=true

                                        for(let ma of modulenoncocher){
                                            if(m.module.id==ma.id) {
                                                m.module.ancien1=1;
                                                if(m.encours==true){
                                                    m.module.encours1=1
                                                }else {
                                                    m.module.encours1=0
                                                }
                                                modules1.push(m.module);
                                            }
                                        }

                                    }
                                    for(let ma of  modulenoncocher){
                                        let i=0;
                                        for(let m of data.body){
                                            if(m.module.id==ma.id) {
                                                i++;
                                            }
                                        }
                                        if(i==0){
                                            // ma.selectedSite=false
                                            modules1.push(ma)
                                        }

                                    }
                                    s.modules=modules1;

                                    for(let pp of s.modules){

                                        this.allRubriqueProfilUpdate(siteprofil.id,pp);
                                    }

                                }
                            )}

                        if(!siteprofil){

                            s.modules=modulenoncocher

                            for(let pp of s.modules){

                                this.allRubriqueProfilUpdate(-1,pp);
                            }
                        }
                    }
                )

            }
        );


    }
    allRubriqueProfilUpdate(siteprofil,m){

        let rubriquenoncocher=[];
        let rubriques1=[];

        this.profilService.getallRubriqueX(m.id).subscribe(
            (data)=>{

                rubriquenoncocher=data.body


                this.profilmoduleService.profilModuleAllX(m.id,siteprofil).subscribe(

                    (data)=>{

                        var moduleprofil=data.body[0];
                        rubriques1=data.body

                        if(data.body[0]){

                            this.rubriqueprofilService.profilRubriqueAll(data.body[0].id).subscribe(
                                (data)=>{
                                    let kk=[]
                                    for(let r of data.body){
                                        r.rubrique.idMere=r.id
                                        r.rubrique.selectedSite=true

                                        for(let ra of rubriquenoncocher){
                                            if(r.rubrique.id==ra.id) {
                                                r.rubrique.ancien1=1;
                                                if(r.encours==true){
                                                    r.rubrique.encours1=1
                                                }else {
                                                    r.rubrique.encours1=0
                                                }


                                            }

                                            let p=0;
                                            for(let x of kk){
                                                if(x.id==r.rubrique.id){
                                                    p++
                                                }
                                            }
                                            if(p==0){
                                                kk.push(r.rubrique);
                                            }


                                        }
                                    }
                                    for(let ra of  rubriquenoncocher){
                                        let i=0;
                                        for(let r of data.body){
                                            if(r.rubrique.id==ra.id) {
                                                i++;
                                            }
                                        }
                                        if(i==0){
                                            kk.push(ra)
                                        }

                                    }

                                    m.rubriques=kk

                                    for(let r of m.rubriques){

                                        this.allMenuProfilUpdate( moduleprofil.id,r);
                                    }









                                    ////////////

                                }
                            )}

                        if(!moduleprofil){

                            m.rubriques=rubriquenoncocher

                            for(let r of m.rubriques){

                                this.allMenuProfilUpdate(-1,r);
                            }
                        }


                    }
                )

            }
        );


    }
    allMenuProfilUpdate(moduleprofil,r){


        let rubriquenoncocher=[];
        let menus1=[];

        this.profilService.getallMenuX(r.id).subscribe(
            (data)=>{
                rubriquenoncocher=data.body;
                if(moduleprofil) {
                    this.rubriqueprofilService.profilRubriqueAllX(r.id, moduleprofil).subscribe(
                        (data) => {

                            if (data.body.length != 0) {
                                this.profilMenuService.profilMenuAll(data.body[0].id).subscribe(
                                    (data) => {

                                        for (let r of data.body) {
                                            r.menu.idMere=r.id
                                            r.menu.idMere= r.id;
                                            r.menu.selectedSite = true;
                                            r.menu.voir = r.voir;
                                            r.menu.imprimer = r.imprimer;
                                            r.menu.supprimer = r.supprimer;
                                            r.menu.modifier = r.modifier;
                                            r.menu.ajouter = r.ajouter;


                                            for (let ra of rubriquenoncocher) {
                                                if (r.menu.id == ra.id) {
                                                    r.menu.ancien1 = 1;
                                                    if (r.encours == true) {
                                                        r.menu.encours1 = 1
                                                    } else {
                                                        r.menu.encours1 = 0
                                                    }
                                                    menus1.push(r.menu);
                                                }
                                            }

                                        }
                                        for (let ra of rubriquenoncocher) {
                                            let i = 0;
                                            for (let r of data.body) {
                                                if (r.menu.id == ra.id) {
                                                    i++;
                                                }
                                            }
                                            if (i == 0) {
                                                menus1.push(ra)
                                            }

                                        }
                                        r.menus = menus1;


                                        ////////////

                                    }
                                )
                            }else {
                                r.menus=rubriquenoncocher
                            }

                        }
                    )
                }

            }
        );

        console.log(this.sites)
    }

//Creation
    allsiteProfilUpdate1(){

        this.siteService.getallsite().subscribe(
            (data)=>{
                this.sites2=data.body;

                for(let pp of  this.sites2){
                    this.allModuleProfilUpdate1(pp);


                }
            }
        )

    }
    allModuleProfilUpdate1(s){

        this.profilService.getallModuleX(s.id).subscribe(
            (data)=>{
                s.modules=data.body
                for(let pp of s.modules){

                    this.allRubriqueProfilUpdate1(pp);
                }

            }
        );


    }
    allRubriqueProfilUpdate1(m){

        this.profilService.getallRubriqueX(m.id).subscribe(
            (data)=>{

                m.rubriques=data.body
                for(let r of m.rubriques){

                    this.allMenuProfilUpdate1(r);
                }


            }
        );


    }
    allMenuProfilUpdate1(r){

        this.profilService.getallMenuX(r.id).subscribe(
            (data)=>{
                r.menus =data.body;
                this.sites=this.sites2;
            }

        );



    }

//mise a jour
    miseajourSite(pp){
        if(pp.selectedSite==false && pp.ancien1==1){
            this.siteProfilService.delete(pp.idMere).subscribe(
                ()=>{
                    console.log("delete avec succes")
                }
            )
        }
        if(pp.selectedSite==true && !pp.ancien1){

            if (pp.encours1 == true) {
                this.siteProfilObject.encours=true;

            } else {
                this.siteProfilObject.encours=false;
            }
            //   this.profil.site = site;
            this.siteProfilObject.profil=this.profil;
            this.siteProfilObject.site=pp;
            this.siteProfilService.create(this.siteProfilObject).subscribe(
                ()=>{
//je reviens


                    for (let mod of pp.modules) {
                        this.miseajourModule(mod,pp);
                    }
                }
            )





            console.log("insert")
        }
        if(pp.ancien1==1 && pp.selectedSite==true){

            this.siteProfilService.find(pp.idMere).subscribe(
                (data)=>{
                    console.log(data.body)
                    if( pp.encours1==true){
                        data.body.encours=true;
                    }
                    if( pp.ancienEncours==true){
                        data.body.encours=false;
                    }


                    this.siteProfilService.update(data.body).subscribe(
                        ()=>{
                            for (let mod of pp.modules) {
                                this.miseajourModule(mod,pp);
                            }
                        }
                    )

                }
            )

        }


    }
    miseajourModule(m,site){

        if(m.selectedSite==false && m.ancien1==1){
            this.profilmoduleService.delete(m.idMere).subscribe(
                ()=>{
                    console.log("delete avec succes")
                }
            )
        }
        if(m.ancien1==1 && m.selectedSite==true){

            this.profilmoduleService.find(m.idMere).subscribe(
                (data)=>{

                    if( m.encours1==1){
                        data.body.encours=true;
                    }
                    if( m.ancienEncours==true){
                        data.body.encours=false;
                    }


                    this.profilmoduleService.update(data.body).subscribe(
                        ()=>{
                            for(let r of m.rubriques){
                                this.miseajourRubrique(r,m,site)
                            }
                        }
                    )

                }
            )

        }
        if(m.selectedSite==true && !m.ancien1){
            this.siteProfilService.profilSiteAll(this.profil.id,site.id).subscribe(
                (data)=>{
                    this.profilmoduleObject.siteProfil = data.body[0];
                    this.profilmoduleObject.module = m;
                    if (m.encours1 == 1) {
                        this.profilmoduleObject.encours = true;
                    } else {
                        this.profilmoduleObject.encours = false;
                    }
                    this.profilmoduleService.create(this.profilmoduleObject).subscribe(
                        () => {


                            for(let rub of m.rubriques) {

                                this.miseajourRubrique(rub,m,site)

                            }



                        }
                    )


                }
            )






            console.log("insert")
        }



    }
    miseajourRubrique(rub,mod,site) {
        if (rub.selectedSite == false && rub.ancien1 == 1) {
            this.rubriqueprofilService.delete(rub.idMere).subscribe(
                () => {
                    console.log("delete avec succes")
                }
            )
        }
        if (rub.ancien1 == 1 && rub.selectedSite == true) {

            this.rubriqueprofilService.find(rub.idMere).subscribe(
                (data) => {

                    if (rub.encours1 == true) {
                        data.body.encours = true;
                    }
                    if (rub.ancienEncours == true) {
                        data.body.encours = false;
                    }


                    this.rubriqueprofilService.update(data.body).subscribe(
                        () => {
                            for(let mn of rub.menus){
                                this.miseajourMenu(rub,mod,site,mn)
                            }
                        }
                    )

                }
            )

        }

        if(rub.selectedSite==true && !rub.ancien1){
            console.log("dane")
            this.siteProfilService.profilSiteAll(this.profil.id,site.id).subscribe(
                (data)=>{
                    this.profilmoduleService.profilModuleAllX(mod.id,data.body[0].id).subscribe(
                        (data)=>{
                            console.log(data.body)
                            this.profilrubriqueObject.profilModule = data.body[0];
                            this.profilrubriqueObject.rubrique = rub;
                            if (rub.encours1 == 1) {
                                this.profilrubriqueObject.encours = true;
                            } else {
                                this.profilrubriqueObject.encours = false;
                            }
                            console.log(this.profilrubriqueObject)
                            console.log("is here")
                            this.rubriqueprofilService.create(this.profilrubriqueObject).subscribe(
                                () => {


                                    for(let menu of rub.menus) {

                                        this.miseajourMenu(rub,mod,site,menu)
                                    }





                                }
                            )



                        }
                    )
                }
            )







            console.log("insert")
        }


    }
    miseajourMenu(rub,mod,site,mn) {
        if(mn.ancien1==1 && mn.selectedSite==true && mn.deselect==false)  {

            this.profilMenuService.find(mn.idMere).subscribe(
                (data) => {
                    console.log(data.body);
                    console.log("dane")
                    data.body.voir=mn.voir;
                    data.body.imprimer=mn.imprimer;
                    data.body.supprimer=mn.supprimer;

                    data.body.ajouter =mn.ajouter;
                    data.body.modifier=mn.modifier;

                    this.profilMenuService.update(data.body).subscribe(
                        ()=>{
                            console.log("menu succes")
                        }
                    )
                })
        }
        if(mn.ancien1==1 && mn.deselect==true)  {
            this.profilMenuService.delete(mn.idMere).subscribe(
                () => {
                    console.log("delete avec succes menu")
                }
            )
        }
        console.log(mn)
        if(!mn.ancien1 && mn.selectedSite==true){
            this.siteProfilService.profilSiteAll(this.profil.id,site.id).subscribe(
                (data)=>{
                    this.profilmoduleService.profilModuleAllX(mod.id,data.body[0].id).subscribe(
                        (data)=>{
                            this.rubriqueprofilService.profilRubriqueAllX(rub.id,data.body[0].id).subscribe(
                                (data)=>{

                                    for(let x of data.body){
                                        console.log(x)
                                        console.log(mn)
                                        this.profilMenuObject.menu = mn;
                                        this.profilMenuObject.rubriqueProfil = x;
                                        this.profilMenuObject.supprimer = mn.supprimer;
                                        this.profilMenuObject.modifier = mn.modifier;
                                        this.profilMenuObject.ajouter = mn.ajouter;
                                        this.profilMenuObject.imprimer = mn.imprimer;
                                        this.profilMenuObject.voir = mn.voir;
                                        this.profilMenuService.create(this.profilMenuObject).subscribe(
                                            () => {
                                                console.log("insert avec succes")
                                            }
                                        )
                                    }}
                            )
                        })})
        }
    }
}

