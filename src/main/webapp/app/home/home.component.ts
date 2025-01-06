import { Component, OnInit } from '@angular/core';
import { NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';
import { LoginModalService, AccountService, Account } from 'app/core';
import {userCurrent} from "../app.constants";
import * as XLSX from 'xlsx';
import {Etudiant} from "../shared/model/etudiant.model";
import {ClasseService} from "app/entities/classe";
import {AnneescolaireService} from "app/entities/anneescolaire";
import {IClasse} from "../shared/model/classe.model";
import {IAnneescolaire} from "../shared/model/anneescolaire.model";
import {EtudiantService} from "app/entities/etudiant";
import {IInscription, Inscription} from "../shared/model/inscription.model";
import {DocumentService} from "app/entities/document";
import {InscriptionService} from "app/entities/inscription";
@Component({
    selector: 'jhi-home',
    templateUrl: './home.component.html',
    styleUrls: ['home.scss']
})
export class HomeComponent implements OnInit {
    account: Account;
    modalRef: NgbModalRef;
    classe:IClasse[];
    annee:IAnneescolaire[];
    compeur=0;
    constructor(
        private accountService: AccountService,
        private loginModalService: LoginModalService,
        private classeService: ClasseService,
        private anneService: AnneescolaireService,
        private etudiantService: EtudiantService,
        private documentService: DocumentService,
        private inscriptionService: InscriptionService,
        private eventManager: JhiEventManager

    ) {}

    ngOnInit() {

        this.accountService.identity().then((account: Account) => {
            this.account = account;
        });
        this.registerAuthenticationSuccess();

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

            this.Insertion( JSON.parse(dataString).data);
             JSON.parse(dataString)
        }
        reader.readAsBinaryString(file);
    }
    Insertion(etudiant){
        console.log(etudiant);
      for(let a of etudiant){
        this.continuee(a);

          /*etu.class=this.classe.filter((b)=>b.id==a.classe);
          etu.anne=this.classe.filter((b)=>b.id==a.classe);*/

      }

    }
    continuee(a){

        let etu=new Etudiant();
        etu.matricule=a.nom;
        etu.nom=a.nom;
        etu.prenom=a.prenom;
        etu.adresse=a.adresse;
        this.etudiantService.create(etu).subscribe(
            ()=>{
                this.etudiantService.maxEtudiant2(etu.matricule).subscribe(
                    (data)=>{
                        this.etudiantService.find(data.body[0]).subscribe(
                            (data)=>{
                                let ins= new Inscription();
                                ins.classe=this.classe.filter((b)=>b.id==a.classe)[0];
                                ins.anneescolaire=this.annee[0];
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
            }
        )
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

    login() {
        this.modalRef = this.loginModalService.open();
    }

}
