import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRouteSnapshot, NavigationEnd, NavigationError } from '@angular/router';
import { JhiLanguageHelper } from 'app/core';
import { Component, OnInit } from '@angular/core';
import { NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';
import { LoginService} from 'app/core';

import { StateStorageService} from 'app/core';
import { LoginModalService, AccountService, Account } from 'app/core';
import { Router} from '@angular/router';
import {anneeScolaire, isLogin, isnameLogin, userCurrent} from "../../app.constants";
import {UserService} from "../../core/user/user.service";
import {IEmploye} from "../../shared/model/employe.model";
import {ISite} from "../../shared/model/site.model";
import {IModule} from "../../shared/model/module.model";
import {IRubrique} from "../../shared/model/rubrique.model";
import {AnneescolaireService} from "../../entities/anneescolaire/anneescolaire.service";
import {IAnneescolaire} from "../../shared/model/anneescolaire.model";

@Component({
    selector: 'jhi-main',
    templateUrl: './main.component.html',
    styleUrls:['./main.scss']
})
export class JhiMainComponent implements OnInit {
a:number=0
    b:number=0
    ecransite:ISite[]=[]
    ecranmodule:IModule[]=[]
    securite:string=""
    account: Account;
    modalRef: NgbModalRef;
    authenticationError: boolean;
    password: string;
    rememberMe: boolean;
    username: string;
    credentials: any;
    isAuth=isLogin;
    usercurrent:IEmploye=null;
    sites:ISite[];
    annnees:IAnneescolaire[];
    modules:IModule[];
    rubriques:IRubrique[];
    nomModuleEncours=""
    couleurs=["metro-tile bg-warning light","metro-tile bg-primary light","metro-tile bg-info light","metro-tile bg-success light","metro-tile bg-system light","metro-tile bg-warning light","metro-tile bg-alert light"]
    constructor(
        private userService: UserService,
        private accountService: AccountService,
        private loginModalService: LoginModalService,
        private annneService: AnneescolaireService,
        private eventManager: JhiEventManager,
        private loginService: LoginService,
        private stateStorageService: StateStorageService,
        private router: Router,
    ) {}

    ngOnInit() {

        this.accountService.identity().then((account: Account) => {
            this.account = account;
        });
        this.registerAuthenticationSuccess();

        this.annneService.query().subscribe(
            (data)=>{
                this.annnees=data.body;
            }
        );
        this.HiddenModule()
        jQuery(document).ready(setTimeout(function() {


            // Configure Progress Loader
            NProgress.configure({
                minimum: 0.15,
                trickleRate: .07,
                trickleSpeed: 360,
                showSpinner: false,
                barColor: '', // npr-warning, npr-success, npr-primary, etc (all contextuals available)
                barPos: '' // 'null' - (default) - bar position: top of page
                // 'npr-bottom' -  bar position: bottom of page header
                // 'npr-header' -  bar position: below header
            });

            // Start Progress Loader
            // NProgress.start();

            // On click event gather options and Init NProgress Plugin
            var Selector = $('ul.controls').find('button');
            Selector.on('click', function(e) {

                var Target = e.target
                var Node = e.target.nodeName;
                var Selector = $(Target);
                var Setting;

                if (Node === "I") {
                    Setting = Selector.parent('button').attr('id');
                }

                if (Node === "BUTTON") {
                    Setting = Selector.attr('id');
                }

                switch (Setting) {

                    // Loader Example Increments
                    case 'b-0':
                        NProgress.start();
                        break;
                    case 'b-50':
                        NProgress.set(0.50);
                        break;
                    case 'b-inc':
                        NProgress.inc();
                        break;
                    case 'b-100':
                        NProgress.done(true);
                        break;

                    // Loader Positions
                    case 'p-0':
                        // ReConfigure Progress Loader
                        NProgress.done(true);
                        NProgress.configure({
                            barPos: ''
                        });
                        NProgress.start();
                        break;
                    case 'p-1':
                        // ReConfigure Progress Loader
                        NProgress.done(true);
                        NProgress.configure({
                            barPos: 'npr-header'
                        });
                        NProgress.start();
                        break;
                    case 'p-2':
                        // ReConfigure Progress Loader
                        NProgress.done(true);
                        NProgress.configure({
                            barPos: 'npr-bottom'
                        });
                        NProgress.start();
                        break;

                    // Loader Contextuals
                    case 'c-primary':
                        // ReConfigure Progress Loader
                        NProgress.done(true);
                        NProgress.configure({
                            barPos: 'npr-primary'
                        });
                        NProgress.start();
                        break;
                    case 'c-success':
                        // ReConfigure Progress Loader
                        NProgress.done(true);
                        NProgress.configure({
                            barPos: 'npr-success'
                        });
                        NProgress.start();
                        break;
                    case 'c-info':
                        // ReConfigure Progress Loader
                        NProgress.done(true);
                        NProgress.configure({
                            barPos: 'npr-info'
                        });
                        NProgress.start();
                        break;
                    case 'c-warning':
                        // ReConfigure Progress Loader
                        NProgress.done(true);
                        NProgress.configure({
                            barPos: 'npr-warning'
                        });
                        NProgress.start();
                        break;

                    case 'c-danger':
                        // ReConfigure Progress Loader
                        NProgress.done(true);
                        NProgress.configure({
                            barPos: 'npr-danger'
                        });
                        NProgress.start();
                        break;
                    case 'c-alert':
                        // ReConfigure Progress Loader
                        NProgress.done(true);
                        NProgress.configure({
                            barPos: 'npr-alert'
                        });
                        NProgress.start();
                        break;
                    case 'c-system':
                        // ReConfigure Progress Loader
                        NProgress.done(true);
                        NProgress.configure({
                            barPos: 'npr-system'
                        });
                        NProgress.start();
                        break;
                    case 'c-dark':
                        // ReConfigure Progress Loader
                        NProgress.done(true);
                        NProgress.configure({
                            barPos: 'npr-dark'
                        });
                        NProgress.start();
                        break;
                    case 'c-light':
                        // ReConfigure Progress Loader
                        NProgress.done(true);
                        NProgress.configure({
                            barPos: 'npr-light'
                        });
                        NProgress.start();
                        break;
                    case 'c-muted':
                        // ReConfigure Progress Loader
                        NProgress.done(true);
                        NProgress.configure({
                            barPos: 'npr-muted'
                        });
                        NProgress.start();
                        break;
                }

            });

        },1000));
    }
    HiddenModule(){

            if (document.getElementById('isme').style.display == 'none') {
                document.getElementById('isme').style.display = 'block';
            } else {
                document.getElementById('isme').style.display = 'none';
            }

    }
    registerAuthenticationSuccess() {
        this.eventManager.subscribe('authenticationSuccess', message => {
            this.accountService.identity().then(account => {
                this.account = account;
            });
        });
    }

    isAuthenticated() {
        return this.accountService.isAuthenticated();
    }

    cancel() {
        this.credentials = {
            username: null,
            password: null,
            rememberMe: true
        };
        this.authenticationError = false;
    }

    login() {
        this.loginService
            .login({
                username: this.username,
                password: this.password,
                rememberMe: this.rememberMe
            })
            .then(() => {
                this.authenticationError = false;
                this.cancel();
                if (this.router.url === '/register' || /^\/activate\//.test(this.router.url) || /^\/reset\//.test(this.router.url)) {
                    this.router.navigate(['']);
                }

                this.eventManager.broadcast({
                    name: 'authenticationSuccess',
                    content: 'Sending Authentication Success'
                });

                // previousState was set in the authExpiredInterceptor before being redirected to login modal.
                // since login is successful, go to stored previousState and clear previousState
                const redirect = this.stateStorageService.getUrl();
                if (redirect) {
                    this.stateStorageService.storeUrl(null);
                    this.router.navigate(['/register']);
                }
                if(this.username!="admin") {
                    this.securite="user"
                    this.userService.getEmployeByLogin(this.username).subscribe(
                        (data) => {
                            console.log(data.body);
                            userCurrent = data.body[0];
                            this.usercurrent=userCurrent;
                            this.userService.siteProfilX(this.usercurrent.profil.id).subscribe(
                                (data)=>{
                                    this.sites=[];
                                    for(let s of data.body){
                                        let a=1;
                                        if(s.encours==true){


                                            this.sites.unshift(s.site)
                                        }else {
                                            a=0;
                                            this.sites.push(s.site)
                                        }
                                     this.userService.profilModuleX(s.id).subscribe(
                                            (data)=>{
                                                s.site.modules=[]
                                                for(let m of data.body){

                                                    if(m.encours==true){
                                                        if(a==1){
                                                           this.ecranmodule.push(m.module)
                                                         this.nomModuleEncours=this.ecranmodule[0].libelleModule

                                                        }
                                                        s.site.modules.unshift(m.module)
                                                    }else {
                                                        s.site.modules.push(m.module)
                                                    }

                                                    this.userService.profilRubriqueX(m.id).subscribe(
                                                        (data)=>{
                                                            m.module.rubriques=[];
                                                            for(let r of data.body){

                                                                if(r.encours==true){


                                                                    m.module.rubriques.unshift(r.rubrique)
                                                                }else {

                                                                    m.module.rubriques.push(r.rubrique)
                                                                }

                                                            this.userService.profilMenuX(r.id).subscribe(
                                                                (data)=>{
                                                                    r.rubrique.menus=[];
                                                                    for(let mn of data.body){

                                                                        if(mn.encours==true){
                                                                            r.rubrique.menus.unshift(mn)
                                                                        }else {
                                                                            r.rubrique.menus.push(mn)
                                                                        }

                                                                    }
                                                                    this.rubriques=this.ecranmodule[0].rubriques
                                                                }

                                                            )
                                                            }
                                                        }
                                                    )
                                                }
                                            }
                                        )

                                    }
                                    console.log(this.sites)

                                    /////////////////////////////

                                }
                            )

                        }
                    );
                }else {
                    this.securite="admin"
                }
                isLogin=!isLogin
                this.isAuth=isLogin

                //  document.getElementById('dane').style.visibility='visible';
                //  this.router.navigate(['/drag']);
            })
            .catch(() => {
                this.authenticationError = true;
            });
    }
    logout() {
        this.accountService.authenticate(null);
        this.sites=[];
        this.nomModuleEncours="";
      this.ecranmodule=[];
        userCurrent = null;
        this.usercurrent= null;
        this.rubriques=[];
        this.modules=[];
        this.menus=[];
        this.loginService.logout();
        isLogin=!isLogin;
        this.isAuth=isLogin;
        this.router.navigate(['/']);
        this.account=null;

    }
    chargeModule(a) {
        this.modules = [];
        this.modules = a;

      this.HiddenModule();
    }
    changeEvent(event){
        let type=0
        if(event.srcElement.classList.length==2  && type==0){
            console.log("papa");
            event.srcElement.classList.remove("menu-open");
            type=1
        }

        if( event.srcElement.classList.length==1  && type==0 ){
            event.srcElement.classList.add("menu-open");
            console.log(event.srcElement.classList.length);
            type=1
        }

        //

    }
    chargementloading(){
        document.getElementById('b-100').click();

    }
    chargeRubrique(a){
        this.nomModuleEncours=a.libelleModule;
        this.rubriques=[];
        this.rubriques=a.rubriques;



    }
    daneTransform(input: string): string {
        return input.toString().toLowerCase()
            .replace(/\s+/g, '-')           // Replace spaces with -
            .replace(/[^\w\-]+/g, '')       // Remove all non-word chars
            .replace(/\-\-+/g, '-')         // Replace multiple - with single -
            .replace(/^-+/, '')             // Trim - from start of text
            .replace(/-+$/, '');            // Trim - from end of text
    }
    changer(a){
        anneeScolaire=a;
    }
}

