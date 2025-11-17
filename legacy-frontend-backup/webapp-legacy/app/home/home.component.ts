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
import { Document } from 'app/shared/model/document.model';
@Component({
    selector: 'jhi-home',
    templateUrl: './home.component.html',
    styleUrls: ['home.scss']
})
export class HomeComponent implements OnInit {
    account: Account | null = null;
    modalRef?: NgbModalRef;
    classe: IClasse[] = [];
    annee: IAnneescolaire[] = [];
    compeur = 0;
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

    ngOnInit(): void {
        console.log('Appel accountService.identity()...');

        this.accountService.identity().then(account => {
            console.log('Résultat identity():', account);
            this.account = account;

            if (this.account) {
                console.log('✅ Utilisateur authentifié:', this.account.login);
                this.loadClasses();
                this.loadAnnees();
            } else {
                console.log('❌ Aucun utilisateur - account est:', account);
            }
        }).catch(error => {
            console.error('❌ Erreur identity():', error);
        });
    }

    private loadClasses(): void {
        this.classeService.query().subscribe({
            next: res => {
                this.classe = res.body ? res.body : [];
                console.log('Classes chargées :', this.classe);
            },
            error: err => {
                console.error('Erreur chargement classes:', err);
            },
        });
    }

    private loadAnnees(): void {
        this.anneService.query().subscribe({
            next: res => {
                this.annee = res.body ?? [];
            },
            error: err => console.error('Erreur chargement annees :', err)
        });
    }


    onFileChange(ev: Event): void {

        let workBook: XLSX.WorkBook | null = null;
        const reader = new FileReader();
        const target = ev.target as HTMLInputElement;
        const file = target.files && target.files[0];
        if (!file) {
            return;
        }
        reader.onload = () => {
            const data = reader.result;
            workBook = XLSX.read(data, { type: 'binary' });
            if (!workBook) {
                return;
            }
            const jsonData = workBook.SheetNames.reduce<Record<string, unknown[]>>((initial, name) => {
                const sheet = workBook.Sheets[name];
                initial[name] = XLSX.utils.sheet_to_json(sheet);
                return initial;
            }, {});
            const dataString = JSON.stringify(jsonData);

            this.Insertion(JSON.parse(dataString).data);
        };
        reader.readAsBinaryString(file);
    }
    Insertion(etudiant: Array<Record<string, any>>): void {
        console.log(etudiant);
      for(let a of etudiant){
        this.continuee(a);

          /*etu.class=this.classe.filter((b)=>b.id==a.classe);
          etu.anne=this.classe.filter((b)=>b.id==a.classe);*/

      }

    }
    continuee(a: Record<string, any>): void {

        let etu=new Etudiant();
        etu.matricule=a.nom;
        etu.nom=a.nom;
        etu.prenom=a.prenom;
        etu.adresse=a.adresse;
        this.etudiantService.create(etu).subscribe(() => {
            this.etudiantService.maxEtudiant2(etu.matricule ?? '').subscribe(maxResponse => {
                const etudiantIds = maxResponse.body ?? [];
                if (!etudiantIds.length) {
                    return;
                }

                this.etudiantService.find(etudiantIds[0]).subscribe(etudiantResponse => {
                    const etudiantBody = etudiantResponse.body;
                    if (!etudiantBody) {
                        return;
                    }

                    const ins = new Inscription();
                    ins.classe = this.classe.find(b => b.id === a.classe);
                    ins.anneescolaire = this.annee[0];
                    ins.etudiant = etudiantBody;
                    ins.documents = [];

                    const typeDocuments = ins.classe?.niveau?.typeDocuments ?? [];
                    let createdDocuments = 0;

                    typeDocuments.forEach(typeDocument => {
                        ins.manquant = true;
                        const doc = new Document();
                        doc.ref = this.compeur++;
                        doc.typeDocument = typeDocument;

                        this.documentService.create(doc).subscribe(() => {
                            this.documentService.maxDocument(doc.ref ?? 0).subscribe(docIds => {
                                const createdIds = docIds.body ?? [];
                                const createdId = createdIds[0];
                                if (createdId === undefined) {
                                    return;
                                }

                                this.documentService.find(createdId).subscribe(docResponse => {
                                    const createdDoc = docResponse.body;
                                    if (createdDoc) {
                                        (ins.documents ??= []).push(createdDoc);
                                        createdDocuments++;

                                        if (createdDocuments === typeDocuments.length) {
                                            this.inscriptionService.create(ins).subscribe();
                                        }
                                    }
                                });
                            });
                        });
                    });
                });
            });
        });
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
