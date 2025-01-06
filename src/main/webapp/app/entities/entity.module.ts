import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

@NgModule({
    imports: [
        RouterModule.forChild([
            {
                path: 'employe',
                loadChildren: './employe/employe.module#GestionEcoleEmployeModule'
            },
            {
                path: 'profil',
                loadChildren: './profil/profil.module#GestionEcoleProfilModule'
            },
            {
                path: 'rubrique',
                loadChildren: './rubrique/rubrique.module#GestionEcoleRubriqueModule'
            },
            {
                path: 'menu',
                loadChildren: './menu/menu.module#GestionEcoleMenuModule'
            },
            {
                path: 'site',
                loadChildren: './site/site.module#GestionEcoleSiteModule'
            },
            {
                path: 'profil-menu',
                loadChildren: './profil-menu/profil-menu.module#GestionEcoleProfilMenuModule'
            },
            {
                path: 'application',
                loadChildren: './application/application.module#GestionEcoleApplicationModule'
            },
            {
                path: 'ecole',
                loadChildren: './ecole/ecole.module#GestionEcoleEcoleModule'
            },
            {
                path: 'module',
                loadChildren: './module/module.module#GestionEcoleModuleModule'
            },
            {
                path: 'rubrique-profil',
                loadChildren: './rubrique-profil/rubrique-profil.module#GestionEcoleRubriqueProfilModule'
            },
            {
                path: 'profil-module',
                loadChildren: './profil-module/profil-module.module#GestionEcoleProfilModuleModule'
            },
            {
                path: 'profil',
                loadChildren: './profil/profil.module#GestionEcoleProfilModule'
            },
            {
                path: 'site-profil',
                loadChildren: './site-profil/site-profil.module#GestionEcoleSiteProfilModule'
            },
            {
                path: 'profil-module',
                loadChildren: './profil-module/profil-module.module#GestionEcoleProfilModuleModule'
            },
            {
                path: 'rubrique-profil',
                loadChildren: './rubrique-profil/rubrique-profil.module#GestionEcoleRubriqueProfilModule'
            },
            {
                path: 'profil-menu',
                loadChildren: './profil-menu/profil-menu.module#GestionEcoleProfilMenuModule'
            },

            {
                path: 'departement',
                loadChildren: './departement/departement.module#GestionEcoleDepartementModule'
            },
            {
                path: 'departement',
                loadChildren: './departement/departement.module#GestionEcoleDepartementModule'
            },
            {
                path: 'filiere',
                loadChildren: './filiere/filiere.module#GestionEcoleFiliereModule'
            },
            {
                path: 'departement',
                loadChildren: './departement/departement.module#GestionEcoleDepartementModule'
            },
            {
                path: 'departement',
                loadChildren: './departement/departement.module#GestionEcoleDepartementModule'
            },
            {
                path: 'type-document',
                loadChildren: './type-document/type-document.module#GestionEcoleTypeDocumentModule'
            },
            {
                path: 'type-document',
                loadChildren: './type-document/type-document.module#GestionEcoleTypeDocumentModule'
            },
            {
                path: 'type-document',
                loadChildren: './type-document/type-document.module#GestionEcoleTypeDocumentModule'
            },
            {
                path: 'niveau',
                loadChildren: './niveau/niveau.module#GestionEcoleNiveauModule'
            },
            {
                path: 'niveau',
                loadChildren: './niveau/niveau.module#GestionEcoleNiveauModule'
            },
            {
                path: 'classe',
                loadChildren: './classe/classe.module#GestionEcoleClasseModule'
            },
            {
                path: 'classe',
                loadChildren: './classe/classe.module#GestionEcoleClasseModule'
            },
            {
                path: 'classe',
                loadChildren: './classe/classe.module#GestionEcoleClasseModule'
            },
            {
                path: 'classe',
                loadChildren: './classe/classe.module#GestionEcoleClasseModule'
            },
            {
                path: 'etudiant',
                loadChildren: './etudiant/etudiant.module#GestionEcoleEtudiantModule'
            },
            {
                path: 'anneescolaire',
                loadChildren: './anneescolaire/anneescolaire.module#GestionEcoleAnneescolaireModule'
            },
            {
                path: 'inscription',
                loadChildren: './inscription/inscription.module#GestionEcoleInscriptionModule'
            },
            {
                path: 'document',
                loadChildren: './document/document.module#GestionEcoleDocumentModule'
            },
            {
                path: 'document',
                loadChildren: './document/document.module#GestionEcoleDocumentModule'
            },
            {
                path: 'document',
                loadChildren: './document/document.module#GestionEcoleDocumentModule'
            },
            {
                path: 'document',
                loadChildren: './document/document.module#GestionEcoleDocumentModule'
            },
            {
                path: 'document',
                loadChildren: './document/document.module#GestionEcoleDocumentModule'
            },
            {
                path: 'document',
                loadChildren: './document/document.module#GestionEcoleDocumentModule'
            },
            {
                path: 'document',
                loadChildren: './document/document.module#GestionEcoleDocumentModule'
            },
            {
                path: 'document',
                loadChildren: './document/document.module#GestionEcoleDocumentModule'
            },
            {
                path: 'document',
                loadChildren: './document/document.module#GestionEcoleDocumentModule'
            },
            {
                path: 'document',
                loadChildren: './document/document.module#GestionEcoleDocumentModule'
            },
            {
                path: 'inscription',
                loadChildren: './inscription/inscription.module#GestionEcoleInscriptionModule'
            },
            {
                path: 'document',
                loadChildren: './document/document.module#GestionEcoleDocumentModule'
            },
            {
                path: 'document',
                loadChildren: './document/document.module#GestionEcoleDocumentModule'
            },
            {
                path: 'inscription',
                loadChildren: './inscription/inscription.module#GestionEcoleInscriptionModule'
            },
            {
                path: 'inscription',
                loadChildren: './inscription/inscription.module#GestionEcoleInscriptionModule'
            },
            {
                path: 'inscription',
                loadChildren: './inscription/inscription.module#GestionEcoleInscriptionModule'
            },
            {
                path: 'inscription',
                loadChildren: './inscription/inscription.module#GestionEcoleInscriptionModule'
            },
            {
                path: 'inscription',
                loadChildren: './inscription/inscription.module#GestionEcoleInscriptionModule'
            },
            {
                path: 'document',
                loadChildren: './document/document.module#GestionEcoleDocumentModule'
            },
            {
                path: 'etudiant',
                loadChildren: './etudiant/etudiant.module#GestionEcoleEtudiantModule'
            },
            {
                path: 'etudiant',
                loadChildren: './etudiant/etudiant.module#GestionEcoleEtudiantModule'
            },
            {
                path: 'etudiant',
                loadChildren: './etudiant/etudiant.module#GestionEcoleEtudiantModule'
            },
            {
                path: 'etudiant',
                loadChildren: './etudiant/etudiant.module#GestionEcoleEtudiantModule'
            },
            {
                path: 'documentexcel',
                loadChildren: './documentexcel/documentexcel.module#GestionEcoleDocumentexcelModule'
            },
            {
                path: 'documentclasse',
                loadChildren: './documentclasse/documentclasse.module#GestionEcoleDocumentclasseModule'
            },
            {
                path: 'documentclasse',
                loadChildren: './documentclasse/documentclasse.module#GestionEcoleDocumentclasseModule'
            },
            {
                path: 'documentclasse',
                loadChildren: './documentclasse/documentclasse.module#GestionEcoleDocumentclasseModule'
            },
            {
                path: 'semestre',
                loadChildren: './semestre/semestre.module#GestionEcoleSemestreModule'
            },
            {
                path: 'documentclasse',
                loadChildren: './documentclasse/documentclasse.module#GestionEcoleDocumentclasseModule'
            }
            /* jhipster-needle-add-entity-route - JHipster will add entity modules routes here */
        ])
    ],
    declarations: [],
    entryComponents: [],
    providers: [],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class GestionEcoleEntityModule {}
