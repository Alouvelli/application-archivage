import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

@NgModule({
    imports: [
        RouterModule.forChild([
            {
                path: 'employe',
                loadChildren: () => import('./employe/employe.module').then(m => m.GestionEcoleEmployeModule)
            },
            {
                path: 'profil',
                loadChildren: () => import('./profil/profil.module').then(m => m.GestionEcoleProfilModule)
            },
            {
                path: 'rubrique',
                loadChildren: () => import('./rubrique/rubrique.module').then(m => m.GestionEcoleRubriqueModule)
            },
            {
                path: 'menu',
                loadChildren: () => import('./menu/menu.module').then(m => m.GestionEcoleMenuModule)
            },
            {
                path: 'site',
                loadChildren: () => import('./site/site.module').then(m => m.GestionEcoleSiteModule)
            },
            {
                path: 'profil-menu',
                loadChildren: () => import('./profil-menu/profil-menu.module').then(m => m.GestionEcoleProfilMenuModule)
            },
            {
                path: 'application',
                loadChildren: () => import('./application/application.module').then(m => m.GestionEcoleApplicationModule)
            },
            {
                path: 'ecole',
                loadChildren: () => import('./ecole/ecole.module').then(m => m.GestionEcoleEcoleModule)
            },
            {
                path: 'module',
                loadChildren: () => import('./module/module.module').then(m => m.GestionEcoleModuleModule)
            },
            {
                path: 'rubrique-profil',
                loadChildren: () => import('./rubrique-profil/rubrique-profil.module').then(m => m.GestionEcoleRubriqueProfilModule)
            },
            {
                path: 'profil-module',
                loadChildren: () => import('./profil-module/profil-module.module').then(m => m.GestionEcoleProfilModuleModule)
            },
            {
                path: 'profil',
                loadChildren: () => import('./profil/profil.module').then(m => m.GestionEcoleProfilModule)
            },
            {
                path: 'site-profil',
                loadChildren: () => import('./site-profil/site-profil.module').then(m => m.GestionEcoleSiteProfilModule)
            },
            {
                path: 'profil-module',
                loadChildren: () => import('./profil-module/profil-module.module').then(m => m.GestionEcoleProfilModuleModule)
            },
            {
                path: 'rubrique-profil',
                loadChildren: () => import('./rubrique-profil/rubrique-profil.module').then(m => m.GestionEcoleRubriqueProfilModule)
            },
            {
                path: 'profil-menu',
                loadChildren: () => import('./profil-menu/profil-menu.module').then(m => m.GestionEcoleProfilMenuModule)
            },

            {
                path: 'departement',
                loadChildren: () => import('./departement/departement.module').then(m => m.GestionEcoleDepartementModule)
            },
            {
                path: 'departement',
                loadChildren: () => import('./departement/departement.module').then(m => m.GestionEcoleDepartementModule)
            },
            {
                path: 'filiere',
                loadChildren: () => import('./filiere/filiere.module').then(m => m.GestionEcoleFiliereModule)
            },
            {
                path: 'departement',
                loadChildren: () => import('./departement/departement.module').then(m => m.GestionEcoleDepartementModule)
            },
            {
                path: 'departement',
                loadChildren: () => import('./departement/departement.module').then(m => m.GestionEcoleDepartementModule)
            },
            {
                path: 'type-document',
                loadChildren: () => import('./type-document/type-document.module').then(m => m.GestionEcoleTypeDocumentModule)
            },
            {
                path: 'type-document',
                loadChildren: () => import('./type-document/type-document.module').then(m => m.GestionEcoleTypeDocumentModule)
            },
            {
                path: 'type-document',
                loadChildren: () => import('./type-document/type-document.module').then(m => m.GestionEcoleTypeDocumentModule)
            },
            {
                path: 'niveau',
                loadChildren: () => import('./niveau/niveau.module').then(m => m.GestionEcoleNiveauModule)
            },
            {
                path: 'niveau',
                loadChildren: () => import('./niveau/niveau.module').then(m => m.GestionEcoleNiveauModule)
            },
            {
                path: 'classe',
                loadChildren: () => import('./classe/classe.module').then(m => m.GestionEcoleClasseModule)
            },
            {
                path: 'classe',
                loadChildren: () => import('./classe/classe.module').then(m => m.GestionEcoleClasseModule)
            },
            {
                path: 'classe',
                loadChildren: () => import('./classe/classe.module').then(m => m.GestionEcoleClasseModule)
            },
            {
                path: 'classe',
                loadChildren: () => import('./classe/classe.module').then(m => m.GestionEcoleClasseModule)
            },
            {
                path: 'etudiant',
                loadChildren: () => import('./etudiant/etudiant.module').then(m => m.GestionEcoleEtudiantModule)
            },
            {
                path: 'anneescolaire',
                loadChildren: () => import('./anneescolaire/anneescolaire.module').then(m => m.GestionEcoleAnneescolaireModule)
            },
            {
                path: 'inscription',
                loadChildren: () => import('./inscription/inscription.module').then(m => m.GestionEcoleInscriptionModule)
            },
            {
                path: 'document',
                loadChildren: () => import('./document/document.module').then(m => m.GestionEcoleDocumentModule)
            },
            {
                path: 'document',
                loadChildren: () => import('./document/document.module').then(m => m.GestionEcoleDocumentModule)
            },
            {
                path: 'document',
                loadChildren: () => import('./document/document.module').then(m => m.GestionEcoleDocumentModule)
            },
            {
                path: 'document',
                loadChildren: () => import('./document/document.module').then(m => m.GestionEcoleDocumentModule)
            },
            {
                path: 'document',
                loadChildren: () => import('./document/document.module').then(m => m.GestionEcoleDocumentModule)
            },
            {
                path: 'document',
                loadChildren: () => import('./document/document.module').then(m => m.GestionEcoleDocumentModule)
            },
            {
                path: 'document',
                loadChildren: () => import('./document/document.module').then(m => m.GestionEcoleDocumentModule)
            },
            {
                path: 'document',
                loadChildren: () => import('./document/document.module').then(m => m.GestionEcoleDocumentModule)
            },
            {
                path: 'document',
                loadChildren: () => import('./document/document.module').then(m => m.GestionEcoleDocumentModule)
            },
            {
                path: 'document',
                loadChildren: () => import('./document/document.module').then(m => m.GestionEcoleDocumentModule)
            },
            {
                path: 'inscription',
                loadChildren: () => import('./inscription/inscription.module').then(m => m.GestionEcoleInscriptionModule)
            },
            {
                path: 'document',
                loadChildren: () => import('./document/document.module').then(m => m.GestionEcoleDocumentModule)
            },
            {
                path: 'document',
                loadChildren: () => import('./document/document.module').then(m => m.GestionEcoleDocumentModule)
            },
            {
                path: 'inscription',
                loadChildren: () => import('./inscription/inscription.module').then(m => m.GestionEcoleInscriptionModule)
            },
            {
                path: 'inscription',
                loadChildren: () => import('./inscription/inscription.module').then(m => m.GestionEcoleInscriptionModule)
            },
            {
                path: 'inscription',
                loadChildren: () => import('./inscription/inscription.module').then(m => m.GestionEcoleInscriptionModule)
            },
            {
                path: 'inscription',
                loadChildren: () => import('./inscription/inscription.module').then(m => m.GestionEcoleInscriptionModule)
            },
            {
                path: 'inscription',
                loadChildren: () => import('./inscription/inscription.module').then(m => m.GestionEcoleInscriptionModule)
            },
            {
                path: 'document',
                loadChildren: () => import('./document/document.module').then(m => m.GestionEcoleDocumentModule)
            },
            {
                path: 'etudiant',
                loadChildren: () => import('./etudiant/etudiant.module').then(m => m.GestionEcoleEtudiantModule)
            },
            {
                path: 'etudiant',
                loadChildren: () => import('./etudiant/etudiant.module').then(m => m.GestionEcoleEtudiantModule)
            },
            {
                path: 'etudiant',
                loadChildren: () => import('./etudiant/etudiant.module').then(m => m.GestionEcoleEtudiantModule)
            },
            {
                path: 'etudiant',
                loadChildren: () => import('./etudiant/etudiant.module').then(m => m.GestionEcoleEtudiantModule)
            },
            {
                path: 'documentexcel',
                loadChildren: () => import('./documentexcel/documentexcel.module').then(m => m.GestionEcoleDocumentexcelModule)
            },
            {
                path: 'documentclasse',
                loadChildren: () => import('./documentclasse/documentclasse.module').then(m => m.GestionEcoleDocumentclasseModule)
            },
            {
                path: 'documentclasse',
                loadChildren: () => import('./documentclasse/documentclasse.module').then(m => m.GestionEcoleDocumentclasseModule)
            },
            {
                path: 'documentclasse',
                loadChildren: () => import('./documentclasse/documentclasse.module').then(m => m.GestionEcoleDocumentclasseModule)
            },
            {
                path: 'semestre',
                loadChildren: () => import('./semestre/semestre.module').then(m => m.GestionEcoleSemestreModule)
            },
            {
                path: 'anneescolaire',
                loadChildren: () => import('./anneescolaire/anneescolaire.module').then(m => m.GestionEcoleAnnescolaireModule)
            },
            {
                path: 'documentclasse',
                loadChildren: () => import('./documentclasse/documentclasse.module').then(m => m.GestionEcoleDocumentclasseModule)
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
